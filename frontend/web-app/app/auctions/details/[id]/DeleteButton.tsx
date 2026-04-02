"use client";
import { deleteAuction } from "@/app/actions/auctionActions";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteAuction(id);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.status + " " + error.message || "Failed to delete auction",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleDelete} disabled={loading} outline color="red">
      {loading && <Spinner size="sm" className="me-3" light />}
      Delete Auction
    </Button>
  );
}
