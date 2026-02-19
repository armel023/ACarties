using System;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer: IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        Console.WriteLine("--> Consuming auction created fault: " + context.Message.Message.Id);
        Console.WriteLine("--> Exception message: " + context.Message.Exceptions[0].Message);
        var exception = context.Message.Exceptions.First();

        if(exception.ExceptionType == "System.Exception" && exception.Message == "Simulated exception for testing Fault Tolerance")
        {
            Console.WriteLine("--> Detected simulated exception. This means the retry policy is working as expected.");
            context.Message.Message.Model = "FooBar"; // Reset the model to avoid triggering the exception again
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("--> Unexpected exception. This may indicate an issue with the retry policy or consumer logic.");
        }
    }

}
