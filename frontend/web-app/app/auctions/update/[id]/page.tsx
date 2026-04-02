import { getDetailedAuction } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import AuctionForm from "../../AuctionForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdatePage({ params }: PageProps) {
  const { id } = await params;
  const data = await getDetailedAuction(id);
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your action"
        subtitle="Please update the details of your car (only these auction properties can be updated)"
      />
      <AuctionForm auction={data} />
    </div>
  );
}
