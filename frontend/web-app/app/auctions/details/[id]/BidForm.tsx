"use client";

import { placeBidForAuction } from "@/app/actions/auctionActions";
import { useBidStore } from "@/hooks/useBidStore";
import { Field, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type BidFormProps = {
  auctionId: string;
  highestBid: number;
};

export default function BidForm({ auctionId, highestBid }: BidFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const addBid = useBidStore((state) => state.addBid);

  function onSubmit(data: FieldValues) {
    if (data.amount <= highestBid) {
      toast.error(`Your bid must be higher than the current highest bid of ${highestBid}`);
      reset();
      return;
    }
    placeBidForAuction(auctionId, data.amount)
      .then((response) => {
        console.log("Place Bid Response:", response); // Debugging log
        if (response.error) {
          reset();
          throw response.error;
        }
        addBid(response);
        reset();
      })
      .catch((error) => {
        toast.error(
          error.message || "Failed to place bid. Please try again later.",
        );
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        {...register("amount", { required: true })}
        placeholder={`Enter a bid higher than ${highestBid}`}
        className="input-custom"
      />
    </form>
  );
}
