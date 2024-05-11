import { useCallback, useEffect, useState, useMemo } from "react";
import { BGCOLOR, TEXT} from "../../theme/theme";
import Marquee from "./Marquee"

const Topbar = ({ electionTimeRemaining, totalVotesCasted }) => {
  const electionDate = useMemo(() => new Date(electionTimeRemaining), [electionTimeRemaining]);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = electionDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }, [electionDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);


  return (
    <div className={`sticky w-full top-24 lg:top-24 z-150 ${BGCOLOR.gray}`}>
      <Marquee text={"The Election held online in Pakistan on 10 March 2030. The voting timing start from 8:00am to 6:00pm."} />
      <div className="flex flex-wrap justify-around lg:justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 justify-center items-center pt-2">
          <span className="font-medium select-none uppercase">Remaining {timeLeft.days <= 1 ? "Time" : "Days"}</span>

          {timeLeft.days > 1 ? (
            <span className={`${TEXT.small} lg:${TEXT.medium}`}>
              {timeLeft.days} days
            </span>
          ) : (
            <span className="text-sm lg:text-base">
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          )}

        </div>
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 justify-center items-center">
          <span className="font-medium select-none uppercase">Total Voters</span>
          <span className={`${TEXT.small} lg:${TEXT.medium}`}>{totalVotesCasted}</span>
        </div>
      </div>
      <hr className="mt-2 border-gray-200 shadow" />
    </div>
  )
}

export default Topbar