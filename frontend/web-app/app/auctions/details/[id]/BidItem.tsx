import { numberWithCommas } from "@/lib/numberWithComma";
import { Bid } from "@/types";
import { format } from "date-fns";

type BidItemProps = {
  bid: Bid;
};
export default function BidItem({ bid }: BidItemProps) {
  function getBidInfo() {
    let bgColor = "";
    let text = "";
    console.log("Bid status:",bid); // Debugging log
    switch (bid.status) {
      case "Accepted":
        bgColor = "bg-green-200";
        text = "Accepted";
        break;
      case "AcceptedBelowReserve":
        bgColor = "bg-amber-200";
        text = "Reserve not met";
        break;
      case "TooLow":
        bgColor = "bg-red-200";
        text = "Too low";
        break;
      default:
        bgColor = "bg-red-200";
        text = "Bid placed after auction finished";
        break;
    }
    return { bgColor, text };
  }
  return (
    <div
      className={`
    border-2 
    border-gray-300 
    rounded-lg 
    px-3 
    py-2 
    mb-2 
    flex justify-between items-center
    ${getBidInfo().bgColor}`}
    >
      <div className="flex flex-col">
        <span>Bidder: {bid.bidder}</span>
        <span className="text-gray-700 text-sm">
          Time: {format(bid.bidTime, "dd MMM yyyy h:mm:ss a")}
        </span>
      </div>
      <div className="flex flex-col text-right">
        <div className="text-xl font-semibold">
          ${numberWithCommas(bid.amount)}
        </div>
        <div className="flex flex-row items-center">
          <span>{getBidInfo().text}</span>
        </div>
      </div>
    </div>
  );
}
