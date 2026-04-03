using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceProvider _service;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider service)
    {
        _logger = logger;
        _service = service;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("CheckAuctionFinished is starting.");

        stoppingToken.Register(() => _logger.LogInformation("CheckAuctionFinished is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("CheckAuctionFinished is doing background work.");

            await CheckAuctionAsync(stoppingToken);

            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
    }

    private async Task CheckAuctionAsync( CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<Auction>()
            .Match(a => a.AuctionEnd <= DateTime.UtcNow)
            .Match(a => !a.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedAuctions.Count == 0)
        {
            _logger.LogInformation("No auctions to finish.");
            return;
        }

        _logger.LogInformation($"Found {finishedAuctions.Count} auctions to finish.");

        using var scope = _service.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();
        foreach (var auction in finishedAuctions)
        {
            _logger.LogInformation($"Finishing auction {auction.ID}.");
            auction.Finished = true;
            await auction.SaveAsync(null,stoppingToken);
            var winnerBid = await DB.Find<Bid>()
                .Match(b => b.AuctionId == auction.ID)
                .Match(b => b.Status == BidStatus.Accepted)
                .ExecuteFirstAsync(stoppingToken);
            
            await endpoint.Publish(new AuctionFinished
            {
                ItemSold = winnerBid != null,
                AuctionId = auction.ID,
                Winner = winnerBid?.Bidder,
                Amount = winnerBid?.Amount,
                Seller = auction.Seller
            }, stoppingToken);


        }
    }
}
