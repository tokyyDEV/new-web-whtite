"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Rocket, Cpu, Layers } from "lucide-react";

type Category = "vision" | "development" | "ecosystem";

type Item = {
  id: string;
  title: string;
  desc: string;
  category: Category;
  image: string;
  tag: string;
};

const ITEMS: Item[] = [
  {
    id: "ai-core",
    title: "AI Core System",
    desc: "Next-generation adaptive AI architecture powering future Whitecore products.",
    category: "vision",
    image: "/images/ai-core.jpg",
    tag: "Vision 2026",
  },
  {
    id: "game-engine",
    title: "Whitecore Engine",
    desc: "High-performance modular game engine built for indie and studio scale projects.",
    category: "development",
    image: "/images/engine.jpg",
    tag: "In Development",
  },
  {
    id: "ecosystem",
    title: "Unified Ecosystem",
    desc: "One connected platform for games, tools, and digital commerce.",
    category: "ecosystem",
    image: "/images/ecosystem.jpg",
    tag: "Roadmap",
  },
];

export default function Main() {
  const [filter, setFilter] = useState<"all" | Category>("all");

  const filtered = useMemo(
    () => (filter === "all" ? ITEMS : ITEMS.filter((i) => i.category === filter)),
    [filter]
  );

  return (
    <section className="relative bg-[#05030a] px-6 py-28 text-white">
      {/* glow background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-400">
            Future Vision
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            We are building the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              next digital ecosystem
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400">
            A unified platform for games, development tools, and digital commerce —
            designed for the next generation of creators.
          </p>
        </div>

        {/* FILTER */}
        <div className="mb-10 flex justify-center gap-2">
          {(["all", "vision", "development", "ecosystem"] as const).map((key) => {
            const active = filter === key;

            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  active
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40"
            >
              {/* IMAGE */}
              <div className="relative h-60 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                />
              </div>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* content */}
              <div className="relative p-6">
                <span className="text-xs text-purple-300">{item.tag}</span>

                <h3 className="mt-2 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Rocket size={14} /> Whitecore Labs
                  </span>

                  <ArrowUpRight className="text-white opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}