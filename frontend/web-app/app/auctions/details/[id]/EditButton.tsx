import { Button } from "flowbite-react";
import Link from "next/link";

type EditButtonProps = {
  id: string;
};

export default function EditButton({ id }: EditButtonProps) {
  return (
    <Button outline>
      <Link href={`/auctions/update/${id}`}>Update Auction</Link>
    </Button>
  );
}
