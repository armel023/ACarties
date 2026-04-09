
import { Auction, AuctionFinished } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  finishedAuction: AuctionFinished;
  auction: Auction
};

export default function AuctionFinishedToast({ auction, finishedAuction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-2">
            <Image src={auction.imageUrl} alt="Image of car" width={50} height={50} className="rounded-lg w-auto h-auto" />
            <div className="flex flex-col">
                <span>Auction Finished! {auction.make} {auction.model} has been sold.</span>
                {finishedAuction.itemSold && finishedAuction.amount 
                ? (<p>Congratulations to {finishedAuction.winner} for winning the auction with a bid of ${finishedAuction.amount}!</p>) 
                : (<p>The item was not sold.</p>)}
            </div>
        </div>
    </Link>
  )
}
