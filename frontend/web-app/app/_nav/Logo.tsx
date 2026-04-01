"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineCar } from "react-icons/ai";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function handleReset() {
    if (pathname !== "/") router.push("/");
    reset();
  }
  return (
    <div
      onClick={handleReset}
      className="cursor-pointer flex items-center space-x-4 gap-2 text-3xl font-semibold text-red-500"
    >
      <AiOutlineCar size={34} className="inline-block mr-2" />
      <h1 className="text-2xl font-bold">Carsties</h1>
    </div>
  );
}
