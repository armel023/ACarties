"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import Heading from "./Heading";
import { Button } from "flowbite-react/components/Button";

type EmptyFilterProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export default function EmptyFilter({
  title = "No matches found",
  subtitle = "Try changing the filters or search term",
  showReset,
}: EmptyFilterProps) {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[40vh] shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button outline onClick={reset}>
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
}
