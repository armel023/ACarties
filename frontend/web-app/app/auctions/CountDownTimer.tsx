"use client";
import { useBidStore } from "@/hooks/useBidStore";
import { usePathname } from "next/navigation";
import Countdown from "react-countdown";

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownProps) => {
  return (
    <div
      className={`
        border-2 border-white text-white py-1 px-2 rounded-lg justify-center
        ${completed ? "bg-red-600" : days === 0 && hours === 0 ? "bg-amber-600" : "bg-green-600"}
        `}
    >
      {completed ? (
        <span>Auction Ended</span>
      ) : (
        <span
          suppressHydrationWarning={true}
        >{`${days}d   ${hours}h ${minutes}m ${seconds}s`}</span>
      )}
    </div>
  );
};

type CountDownTimerProps = {
  endTime: string; // ISO string of the auction end time
};

export default function CountDownTimer({ endTime }: CountDownTimerProps) {
  const setOpen = useBidStore((state) => state.setOpen);
  const pathname = usePathname();
  function auchtionFinished() {
    if (pathname.startsWith("/auctions/details")) {
      setOpen(false);
    }
  }
  return (
    <div>
      <Countdown
        date={new Date(endTime)}
        renderer={renderer}
        onComplete={auchtionFinished}
      />
    </div>
  );
}
