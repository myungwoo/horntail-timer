"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TimerCardProps = {
  label: string;
  hotkey: string; // e.g., "1", "2", "3", "5", "6"
  durationSeconds: number;
  autoRepeat?: boolean;
  accentClassName?: string; // Tailwind classes for accent color
  warningSeconds?: number; // when remaining time <= this, show visual warning
  warningBgClassName?: string; // tailwind bg color for warning blink overlay
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
  warningSeconds,
  warningBgClassName = "bg-red-500",
}: TimerCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const baseStartMsRef = useRef<number | null>(null);
  const endAtMsRef = useRef<number | null>(null);

  const nowMs = () => (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now());
  const durationMs = durationSeconds * 1000;

  const updateFromClock = useCallback(() => {
    const startedAt = baseStartMsRef.current;
    if (!startedAt) return;
    const now = nowMs();
    if (autoRepeat) {
      const elapsedMs = Math.max(0, now - startedAt);
      const cycleProgress = (elapsedMs % durationMs) / durationMs;
      const remainingMsInCycle = durationMs - (elapsedMs % durationMs);
      const nextTimeLeft = Math.ceil(remainingMsInCycle / 1000);
      setTimeLeft(nextTimeLeft);
      setProgress(cycleProgress);
    } else {
      const endAt = endAtMsRef.current ?? startedAt + durationMs;
      const remainingMs = Math.max(0, endAt - now);
      const nextTimeLeft = Math.ceil(remainingMs / 1000);
      setTimeLeft(nextTimeLeft);
      const elapsedMs = Math.min(durationMs, Math.max(0, durationMs - remainingMs));
      setProgress(elapsedMs / durationMs);
      if (remainingMs <= 0) {
        // stop precisely without drift
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsRunning(false);
        setTimeLeft(0);
      }
    }
  }, [autoRepeat, durationMs]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    baseStartMsRef.current = null;
    endAtMsRef.current = null;
    setIsRunning(false);
    setTimeLeft(durationSeconds);
    setProgress(0);
  }, [durationSeconds]);

  const start = useCallback(() => {
    if (isRunning) return;
    const started = nowMs();
    baseStartMsRef.current = started;
    endAtMsRef.current = autoRepeat ? null : started + durationMs;
    setIsRunning(true);
    // initial sync
    setTimeLeft(durationSeconds);
    setProgress(0);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // tick ~5 times/sec to keep UI smooth but compute from clock to avoid drift
    timerRef.current = window.setInterval(updateFromClock, 100);
    // also do an immediate update for responsiveness
    updateFromClock();
  }, [durationMs, durationSeconds, isRunning, updateFromClock, autoRepeat]);

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
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const displayTime = isRunning ? timeLeft : durationSeconds;
  const isWarning = isRunning && warningSeconds !== undefined && timeLeft <= warningSeconds;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative w-full overflow-hidden rounded-2xl border ${isWarning ? "border-red-400/70" : "border-white/10"} ${isWarning ? "bg-red-500/10" : "bg-white/5"} p-6 sm:p-7 md:p-8 shadow-sm backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 ${isWarning ? "focus:ring-red-400/60" : "focus:ring-white/30"} dark:border-white/10 min-h-28 sm:min-h-32`}
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${accentClassName}`}
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        />
      </div>
      {isWarning && (
        <div className={`pointer-events-none absolute inset-0 ${warningBgClassName} warning-blink-bg`} />
      )}
      <div className={`flex items-center justify-between ${isWarning ? "warning-blink" : ""}`}>
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


