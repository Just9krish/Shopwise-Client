import { useState, useEffect } from 'react';

type Props = {
  endDate: Date;
  startDate: Date;
};

type FuncPara = {
  timeLeft: Record<string, number>;
  isTimeUp: boolean;
};

const calculateTimeLeft = (endDate: Date): FuncPara => {
  const endTime: Date = new Date(endDate);
  const difference: number = Date.parse(endTime.toString()) - Date.now();

  let seconds: string = Math.floor((difference / 1000) % 60).toString();
  let minutes: string = Math.floor((difference / 1000 / 60) % 60).toString();
  let hours: string = Math.floor((difference / (1000 * 60 * 60)) % 24).toString();
  const days: string = Math.floor(difference / (1000 * 60 * 60 * 24)).toString();

  hours = hours.padStart(2, '0');
  minutes = minutes.padStart(2, '0');
  seconds = seconds.padStart(2, '0');

  let timeLeft = {};

  let isTimeUp = false;

  if (difference > 0) {
    timeLeft = { days, hours, minutes, seconds };
  } else {
    isTimeUp = true;
    timeLeft = { hours: '00', minutes: '00', seconds: '00' };
  }

  return { timeLeft, isTimeUp };
};

export default function Countdown({ endDate, startDate }: Props) {
  const [timeUp, setTimeUp] = useState(false);
  const [showStartCountdown, setShowStartCountdown] = useState(false);
  const [startTimer, setStartTimer] = useState<any>(null);
  const { timeLeft: b } = calculateTimeLeft(endDate);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(() => b);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const startDateTimeInEffect = new Date(startDate).setHours(0, 0, 0, 0);

    if (startDateTimeInEffect === today) {
      setShowStartCountdown(true);
    } else {
      setShowStartCountdown(false);

      const timer = setInterval(() => {
        const { timeLeft: timeUntilStart, isTimeUp } = calculateTimeLeft(endDate);
        setTimeLeft(timeUntilStart);
        setTimeUp(isTimeUp);

        const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
        const currentTime = new Date().setHours(0, 0, 0, 0);

        if (currentTime >= startDateTime) {
          setShowStartCountdown(true);
          clearInterval(timer);
        }
      }, 1000);

      setStartTimer(timer);
    }

    return () => {
      if (startTimer) {
        clearInterval(startTimer);
      }
    };
  }, [startDate, startTimer, endDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const { timeLeft: a } = calculateTimeLeft(endDate);

      setTimeLeft(a);
    }, 1000);
    return () => clearTimeout(timer);
  }, [endDate]);

  let content;

  if (showStartCountdown) {
    if (timeUp) {
      content = "Time's Up";
    } else {
      content = (
        <>
          Ending in {timeLeft.days === 0 ? '' : `${timeLeft.days} Days `}
          {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds
        </>
      );
    }
  } else {
    content = (
      <>
        Time until start: {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds}{' '}
        seconds
      </>
    );
  }

  return <span className="text-xl text-[#ff7d1a] font-semibold">{content}</span>;
}
