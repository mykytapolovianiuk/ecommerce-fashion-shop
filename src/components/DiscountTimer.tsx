import React, { useEffect, useMemo, useRef, useState } from "react";

type Duration = { days: number; hours: number; minutes: number; seconds: number };

const pad2 = (n: number) => n.toString().padStart(2, "0");
const toMs = (d: Duration) => (((d.days * 24 + d.hours) * 60 + d.minutes) * 60 + d.seconds) * 1000;
const fromMs = (ms: number): Duration => {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
};

type Props = {
  initial: Duration;
  rowClass: string;
  itemClass: string;
  counterClass: string;
  labelClass: string;
};

const DiscountTimer: React.FC<Props> = ({ initial, rowClass, itemClass, counterClass, labelClass }) => {
  const baseMs = useMemo(() => toMs(initial), [initial]);
  const [left, setLeft] = useState<Duration>(initial);
  const deadlineRef = useRef<number>(Date.now() + baseMs);

  useEffect(() => {
    const id = window.setInterval(() => {
      const ms = deadlineRef.current - Date.now();
      if (ms <= 0) {
        deadlineRef.current = Date.now() + baseMs;
        setLeft(initial);
      } else {
        setLeft(fromMs(ms));
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [baseMs, initial]);

  return (
    <div className={rowClass}>
      <div className={itemClass}>
        <div className={counterClass}>{pad2(left.days)}</div>
        <div className={labelClass}>Days</div>
      </div>
      <div className={itemClass}>
        <div className={counterClass}>{pad2(left.hours)}</div>
        <div className={labelClass}>Hr</div>
      </div>
      <div className={itemClass}>
        <div className={counterClass}>{pad2(left.minutes)}</div>
        <div className={labelClass}>Mins</div>
      </div>
      <div className={itemClass}>
        <div className={counterClass}>{pad2(left.seconds)}</div>
        <div className={labelClass}>Sec</div>
      </div>
    </div>
  );
};

export default DiscountTimer;
