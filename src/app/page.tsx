import TimerCard from "@/components/TimerCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 py-6 text-white sm:px-8 sm:py-10">
      <main className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">혼테일 타이머</h1>
            <p className="text-sm text-white/70">좌/중/우 머리 타이머(43초) + 버프해제 50%/30%</p>
          </div>
          <div className="text-xs text-white/60">
            단축키: 좌(1) · 중(2) · 우(3) · 50%(5) · 30%(6)
          </div>
        </header>

        <section aria-label="heads" className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <TimerCard label="좌" hotkey="1" durationSeconds={43} autoRepeat={false} accentClassName="from-rose-500 to-orange-500" warningSeconds={3} warningBgClassName="bg-rose-500" soundProfile="left" />
          <TimerCard label="중" hotkey="2" durationSeconds={43} autoRepeat={false} accentClassName="from-amber-500 to-yellow-500" warningSeconds={3} warningBgClassName="bg-amber-500" soundProfile="middle" />
          <TimerCard label="우" hotkey="3" durationSeconds={43} autoRepeat={false} accentClassName="from-emerald-500 to-teal-500" warningSeconds={3} warningBgClassName="bg-emerald-500" soundProfile="right" />
        </section>

        <section aria-label="dispels" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TimerCard label="버프해제 50%" hotkey="q" durationSeconds={5 * 60} autoRepeat accentClassName="from-sky-500 to-indigo-500" warningSeconds={10} warningBgClassName="bg-sky-500" soundProfile="dispel50" />
          <TimerCard label="버프해제 30%" hotkey="w" durationSeconds={3 * 60} autoRepeat accentClassName="from-fuchsia-500 to-pink-600" warningSeconds={10} warningBgClassName="bg-fuchsia-500" soundProfile="dispel30" />
        </section>

        <footer className="pt-4 text-center text-xs text-white/40">mapleland · horntail</footer>
      </main>
    </div>
  );
}
