"use client";
import { getBidsForAuction } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction } from "@/types";
import { User } from "next-auth";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "./BidForm";

type BidListProps = {
  user: User | null;
  auction: Auction;
};

export default function BidList({ user, auction }: BidListProps) {
  const [loading, setLoading] = useState(true);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);
  const open = useBidStore((state) => state.open);
  const setOpen = useBidStore((state) => state.setOpen);
  const opeForBids = new Date(auction.auctionEnd) > new Date();

  const highBid = bids.reduce(
    (max, bid) =>
      bid.amount > max
        ? bid.status?.includes("Accepted")
          ? bid.amount
          : max
        : max,
    0,
  );

  console.log("Highest Bid:", highBid); // Debugging log

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBidsForAuction(auction.id);
        if (data.error) {
          throw data.error;
        }
        console.log("Fetched bids:", data); // Debugging log
        setBids(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(
          error.message || "Failed to fetch bids. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [auction.id, setBids]);

  useEffect(() => {
    setOpen(opeForBids);
  }, [opeForBids, setOpen]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading title={`Highest Bid: $${highBid}`} />
        </div>
      </div>
      <div className="overflow-auto h-[350px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyFilter
            title="No bids for this item"
            subtitle="Please fell free to make a bid"
          />
        ) : (
          <>
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>
      <div className="px-2 pb-2 text-gray-500">
        {!open ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Auction has ended. No more bids can be placed.
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Please Login to make a bid
          </div>
        ) : user && user.username === auction.seller ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            You cannot bid on your own auction
          </div>
        ) : (
          <BidForm auctionId={auction.id} highestBid={highBid} />
        )}
      </div>
    </div>
  );
}
