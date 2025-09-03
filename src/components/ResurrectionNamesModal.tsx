"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  initialNames: string[]; // length 5
  onClose: () => void;
  onSubmit: (names: string[]) => void;
};

export default function ResurrectionNamesModal({ open, initialNames, onClose, onSubmit }: Props) {
  const [names, setNames] = useState<string[]>(["", "", "", "", ""]);

  useEffect(() => {
    if (open) {
      setNames((initialNames && initialNames.length === 5) ? initialNames : ["", "", "", "", ""]);
    }
  }, [open, initialNames]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-5 text-white shadow-xl">
        <div className="mb-4 text-lg font-semibold">리저렉션 이름 설정</div>
        <div className="space-y-3">
          {names.map((val, idx) => (
            <div className="flex items-center gap-3" key={idx}>
              <label className="w-16 text-sm text-white/70">{idx + 1}번</label>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const next = [...names];
                  next[idx] = e.target.value;
                  setNames(next);
                }}
                placeholder={`${idx + 1}번 리저`}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onSubmit(names)}
            className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-black hover:bg-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}


