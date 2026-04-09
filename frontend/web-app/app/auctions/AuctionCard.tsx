// import { AuctionItem } from "./AuctionItem";
import CountDownTimer from "./CountDownTimer";
import CardImage from "./CardImage";
import { Auction } from "@/types";
import Link from "next/link";
import CurrentBid from "./CurrentBid";

type AuctionCardProps = {
  auction: Auction;
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <Link href={`/auctions/details/${auction.id}`}>
      <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden ">
        <CardImage imageUrl={auction.imageUrl} />
        <div className="absolute bottom-2 left-2">
          <CountDownTimer endTime={auction.auctionEnd} />
        </div>
        <div className="absolute top-2 right-2">
          <CurrentBid
            amount={auction.currentHighestBid}
            reservePrice={auction.reservePrice}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="text-sm font-semibold">{auction.year}</p>
      </div>
    </Link>
  );
}
