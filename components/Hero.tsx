"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type Slide = {
  eyebrow: string;
  title: string;
  href: string;
  from: string;
  to: string;
  pattern: "hex" | "circuit" | "grid";
};

const SLIDES: Slide[] = [
  {
    eyebrow: "01 — Games",
    title: "Play the build",
    href: "#games",
    from: "#7c3aed",
    to: "#a855f7",
    pattern: "hex",
  },
  {
    eyebrow: "02 — Tech",
    title: "Ship the code",
    href: "#tech",
    from: "#a855f7",
    to: "#d946ef",
    pattern: "circuit",
  },
  {
    eyebrow: "03 — Shop",
    title: "Wear the core",
    href: "#shop",
    from: "#c026d3",
    to: "#7c3aed",
    pattern: "grid",
  },
];

function Pattern({ type }: { type: Slide["pattern"] }) {
  if (type === "hex") {
    return (
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexPattern" width="46" height="80" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
            <path
              d="M23 0 L46 13 L46 40 L23 53 L0 40 L0 13 Z"
              fill="none"
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>
    );
  }
  if (type === "circuit") {
    return (
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuitPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M0 30 H20 V10 H40 V30 H60 M30 0 V20 H50 V60"
              fill="none"
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <circle cx="20" cy="10" r="2" fill="white" fillOpacity="0.5" />
            <circle cx="50" cy="60" r="2" fill="white" fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuitPattern)" />
      </svg>
    );
  }
  return (
    <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridPattern)" />
    </svg>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  const left = SLIDES[index];
  const right = SLIDES[(index + 1) % SLIDES.length];

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="group relative overflow-hidden">
          <div
            key={left.title + "-l"}
            className="absolute inset-0 scale-110 animate-[fadeScale_1.2s_ease-out_forwards] bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(150deg, ${left.from}, #05030a 85%)`,
            }}
          >
            <Pattern type={left.pattern} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/70" />
        </div>

        {/* RIGHT PANEL */}
        <div className="group relative hidden overflow-hidden md:block">
          <div
            key={right.title + "-r"}
            className="absolute inset-0 scale-110 animate-[fadeScale_1.2s_ease-out_forwards] bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(210deg, ${right.to}, #05030a 85%)`,
            }}
          >
            <Pattern type={right.pattern} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-black/70" />
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* core mark */}
        <div
          className={`mb-6 h-4 w-4 rotate-45 bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-700 ${
            mounted ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />

        <p
          key={left.eyebrow}
          className="mb-3 animate-[slideUp_0.6s_ease-out_forwards] font-mono text-xs uppercase tracking-[0.3em] text-purple-300"
        >
          {left.eyebrow}
        </p>

        <h1
          key={left.title}
          className="animate-[slideUp_0.6s_ease-out_0.05s_both] text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {left.title}
        </h1>

        <a
          href={left.href}
          className="group/btn pointer-events-auto mt-8 flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative">Nézd meg</span>
          <ArrowRight
            size={16}
            className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </a>
      </div>

      {/* ARROWS */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-black/50 sm:left-8"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-black/50 sm:right-8"
      >
        <ChevronRight size={22} />
      </button>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(1.15); }
          to { opacity: 1; transform: scale(1.1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}