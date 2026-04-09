type CurrentBidProps = {
  amount?: number;
  reservePrice: number;
};

export default function CurrentBid({ amount, reservePrice }: CurrentBidProps) {
  const text = amount ? `$${amount}` : "No bids yet";
  const color = amount
    ? amount >= reservePrice
      ? "bg-green-600"
      : "bg-amber-600"
    : "bg-red-600";
  return (
    <div
      className={`
       border-2 border-white rounded-lg px-2 py-1 text-white flex justify-center ${color}
        `}
    >
      {text}
    </div>
  );
}
