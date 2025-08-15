let audioCtx: AudioContext | null = null;

export function ensureAudioContext(): void {
  if (typeof window === "undefined") return;
  if (!audioCtx) {
    const w = window as unknown as {
      AudioContext?: {
        new (): AudioContext;
      };
      webkitAudioContext?: {
        new (): AudioContext;
      };
    };
    const Ctx = w.AudioContext || w.webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  // iOS requires resume after user gesture
  if (audioCtx && (audioCtx.state === "suspended")) {
    void audioCtx.resume();
  }
}

type ToneStep = {
  frequency: number;
  durationMs: number;
  gapMs?: number;
  type?: OscillatorType;
  volume?: number;
};

export function playPattern(steps: ToneStep[], options?: { volume?: number }): void {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  let cursor = now;

  for (const step of steps) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = step.type ?? "sine";
    osc.frequency.value = step.frequency;
    const vol = Math.max(0, Math.min(1, options?.volume ?? step.volume ?? 0.06));
    const durationSec = Math.max(0, step.durationMs) / 1000;

    // Envelope
    gain.gain.setValueAtTime(0, cursor);
    gain.gain.linearRampToValueAtTime(vol, cursor + 0.01);
    gain.gain.linearRampToValueAtTime(0.0001, cursor + durationSec);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(cursor);
    osc.stop(cursor + durationSec + 0.02);

    cursor += durationSec + (step.gapMs ? step.gapMs / 1000 : 0.04);
  }
}

export type SoundProfile = "left" | "middle" | "right" | "dispel50" | "dispel30";

export function getPatternForProfile(profile: SoundProfile): ToneStep[] {
  switch (profile) {
    case "left":
      return [{ frequency: 700, durationMs: 130 }];
    case "middle":
      return [{ frequency: 850, durationMs: 130 }];
    case "right":
      return [{ frequency: 1000, durationMs: 130 }];
    case "dispel50":
      return [
        { frequency: 600, durationMs: 110 },
        { frequency: 900, durationMs: 110, gapMs: 70 },
      ];
    case "dispel30":
      return [
        { frequency: 900, durationMs: 110 },
        { frequency: 600, durationMs: 110, gapMs: 70 },
      ];
    default:
      return [{ frequency: 800, durationMs: 120 }];
  }
}


