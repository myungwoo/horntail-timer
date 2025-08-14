"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TimerCardProps = {
  label: string;
  hotkey: string; // e.g., "1", "2", "3", "5", "6"
  durationSeconds: number;
  autoRepeat?: boolean;
  accentClassName?: string; // Tailwind classes for accent color
};

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(clamped / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (clamped % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TimerCard({
  label,
  hotkey,
  durationSeconds,
  autoRepeat = false,
  accentClassName = "from-indigo-500 to-blue-600",
}: TimerCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const progress = useMemo(() => {
    const denominator = durationSeconds || 1;
    const numerator = isRunning ? timeLeft : durationSeconds;
    return 1 - Math.min(1, Math.max(0, numerator / denominator));
  }, [isRunning, timeLeft, durationSeconds]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTimeLeft(durationSeconds);
  }, [durationSeconds]);

  const start = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setTimeLeft(durationSeconds);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          if (autoRepeat) {
            return durationSeconds; // loop
          }
          // complete once
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          return 0;
        }
        return next;
      });
    }, 1000);
  }, [autoRepeat, durationSeconds, isRunning]);

  const toggle = useCallback(() => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  }, [isRunning, start, stop]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ignore when focused in an input/textarea/select
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      const keyMatch = e.key === hotkey;
      const codeMatch = e.code === `Digit${hotkey}`; // works for numbers on most layouts
      if (keyMatch || codeMatch) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hotkey, toggle]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const displayTime = isRunning ? timeLeft : durationSeconds;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 md:p-8 shadow-sm backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 dark:border-white/10 min-h-28 sm:min-h-32`}
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${accentClassName}`}
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-black/70 px-3 text-base sm:text-lg font-semibold text-white shadow-sm">
            {hotkey}
          </span>
          <div className="text-left">
            <div className="text-base sm:text-lg font-semibold text-white/85">{label}</div>
            <div className="text-sm text-white/60">
              {autoRepeat ? "자동 반복" : "단발성"}
            </div>
          </div>
        </div>
        <div className="text-5xl sm:text-6xl font-extrabold tabular-nums text-white">
          {formatTime(displayTime)}
        </div>
      </div>
      <div className="mt-4 text-sm uppercase tracking-wide text-white/60">
        {isRunning ? "진행 중 (클릭 또는 단축키로 정지)" : "대기 중 (클릭 또는 단축키로 시작)"}
      </div>
    </button>
  );
}


