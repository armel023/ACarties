namespace BiddingService.DTOs;

public sealed record class BidDto
{
    public string Id { get; init; }
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public int Amount { get; set; }
    public string Status { get; set; }
}
