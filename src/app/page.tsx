"use client";

import { useState } from "react";
import TimerCard from "@/components/TimerCard";

type TabKey = "core" | "res" | "guest";

export default function Home() {
  const [tab, setTab] = useState<TabKey>("core");
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 py-6 text-white sm:px-8 sm:py-10">
      <main className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">혼테일 타이머</h1>
              <p className="text-sm text-white/70">탭으로 구분된 타이머 모음</p>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setTab("core")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${tab === "core" ? "bg-white/90 text-black" : "text-white/80 hover:bg-white/10"}`}
            >
              기본(머리/버프)
            </button>
            <button
              type="button"
              onClick={() => setTab("res")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${tab === "res" ? "bg-white/90 text-black" : "text-white/80 hover:bg-white/10"}`}
            >
              리저렉션
            </button>
            <button
              type="button"
              onClick={() => setTab("guest")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${tab === "guest" ? "bg-white/90 text-black" : "text-white/80 hover:bg-white/10"}`}
            >
              손님 마을
            </button>
          </div>
          <div className="text-xs text-white/60">
            {tab === "core" && "단축키: 좌(1) · 중(2) · 우(3) · 50%(Q) · 30%(W)"}
            {tab === "res" && "단축키: 1~5 리저 → Z · X · C · V · B"}
            {tab === "guest" && "단축키: 손님 마을 → Space"}
          </div>
        </header>

        <section aria-label="heads" className={`${tab === "core" ? "grid" : "hidden"} grid-cols-1 gap-5 sm:grid-cols-3`}>
          <TimerCard label="좌" hotkey="1" durationSeconds={43} autoRepeat={false} accentClassName="from-rose-500 to-orange-500" warningSeconds={3} warningBgClassName="bg-rose-500" soundProfile="left" />
          <TimerCard label="중" hotkey="2" durationSeconds={43} autoRepeat={false} accentClassName="from-amber-500 to-yellow-500" warningSeconds={3} warningBgClassName="bg-amber-500" soundProfile="middle" />
          <TimerCard label="우" hotkey="3" durationSeconds={43} autoRepeat={false} accentClassName="from-emerald-500 to-teal-500" warningSeconds={3} warningBgClassName="bg-emerald-500" soundProfile="right" />
        </section>

        <section aria-label="dispels" className={`${tab === "core" ? "grid" : "hidden"} grid-cols-1 gap-5 sm:grid-cols-2`}>
          <TimerCard label="버프해제 50%" hotkey="q" durationSeconds={5 * 60} autoRepeat accentClassName="from-sky-500 to-indigo-500" warningSeconds={10} warningBgClassName="bg-sky-500" soundProfile="dispel50" />
          <TimerCard label="버프해제 30%" hotkey="w" durationSeconds={3 * 60} autoRepeat accentClassName="from-fuchsia-500 to-pink-600" warningSeconds={10} warningBgClassName="bg-fuchsia-500" soundProfile="dispel30" />
        </section>

        <section aria-label="resurrection-row-1" className={`${tab === "res" ? "grid" : "hidden"} grid-cols-1 gap-5 sm:grid-cols-3`}>
          <TimerCard label="1번 리저" hotkey="z" durationSeconds={29 * 60 + 58} autoRepeat={false} accentClassName="from-purple-500 to-violet-600" warningSeconds={10} warningBgClassName="bg-purple-600" />
          <TimerCard label="2번 리저" hotkey="x" durationSeconds={29 * 60 + 58} autoRepeat={false} accentClassName="from-purple-500 to-violet-600" warningSeconds={10} warningBgClassName="bg-purple-600" />
          <TimerCard label="3번 리저" hotkey="c" durationSeconds={29 * 60 + 58} autoRepeat={false} accentClassName="from-purple-500 to-violet-600" warningSeconds={10} warningBgClassName="bg-purple-600" />
        </section>

        <section aria-label="resurrection-row-2" className={`${tab === "res" ? "grid" : "hidden"} grid-cols-1 gap-5 sm:grid-cols-2`}>
          <TimerCard label="4번 리저" hotkey="v" durationSeconds={29 * 60 + 58} autoRepeat={false} accentClassName="from-purple-500 to-violet-600" warningSeconds={10} warningBgClassName="bg-purple-600" />
          <TimerCard label="5번 리저" hotkey="b" durationSeconds={29 * 60 + 58} autoRepeat={false} accentClassName="from-purple-500 to-violet-600" warningSeconds={10} warningBgClassName="bg-purple-600" />
        </section>

        <section aria-label="guest-town" className={`${tab === "guest" ? "grid" : "hidden"} grid-cols-1 gap-5`}>
          <TimerCard label="손님 마을" hotkey="space" durationSeconds={14 * 60} autoRepeat={false} accentClassName="from-slate-500 to-slate-700" warningSeconds={5} warningBgClassName="bg-slate-600" soundProfile="guest" />
        </section>

        <footer className="pt-4 text-center text-xs text-white/40">mapleland · horntail</footer>
      </main>
    </div>
  );
}
