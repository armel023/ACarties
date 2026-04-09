"use client";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "next-auth";
import { useParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import AuctionCreatedToast from "../components/AuctionCreatedToast";
import toast from "react-hot-toast";
import { getDetailedAuction } from "../actions/auctionActions";
import AuctionFinishedToast from "../components/AuctionFinishedToast";

type Props = {
  children: ReactNode;
  user: User | null;
};

export default function SignalRProvider({ children, user }: Props) {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleBidPlaced = useCallback(
    (bid: Bid) => {
      console.log("Received BidPlaced event:", bid); // Debugging log
      const isAccepted = bid.status?.includes("Accepted");
      if (isAccepted) {
        setCurrentPrice(bid.auctionId, bid.amount);
      }

      if (bid.auctionId === params.id) {
        addBid(bid);
      }
    },
    [setCurrentPrice, addBid, params.id],
  );

  const handleAuctionCreated = useCallback((auction: Auction) => {
    if(user?.name !== auction.seller) {
      return toast(<AuctionCreatedToast auction={auction} />, {
        duration: 10000,
      });
    }
  }, [user]);

  const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
    const auction = getDetailedAuction(finishedAuction.auctionId);
    return toast.promise(auction, {
      loading: "Loading auction details...",
      success: (auction) => {
        return <AuctionFinishedToast auction={auction} finishedAuction={finishedAuction} />;
      },
      error: () => "Error loading auction details",
    }, {success: {duration: 10000, icon:null}})
  }, []);

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl("http://localhost:6001/notifications")
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => {
          console.log("SignalR connection established.");
        })
        .catch((error) => {
          console.error("Error establishing SignalR connection:", error);
        });
    }

    connection.current.on("BidPlaced", handleBidPlaced);
    connection.current.on("AuctionCreated", handleAuctionCreated);
    connection.current.on("AuctionFinished", handleAuctionFinished);


    return () => {
      if (connection.current) {
        connection.current.off("BidPlaced", handleBidPlaced);
        connection.current.off("AuctionCreated", handleAuctionCreated);
        connection.current.off("AuctionFinished", handleAuctionFinished);
      }
    };
  }, [handleBidPlaced, handleAuctionCreated, handleAuctionFinished]);

  return children;
}
