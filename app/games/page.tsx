"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Gamepad2, Play, Rocket, Wrench } from "lucide-react";

type Game = {
  id: string;
  title: string;
  desc: string;
  image: string;
  status: "prototype" | "development" | "planned";
  tag: string;
};

const GAMES: Game[] = [
  {
    id: "voidrunner",
    title: "Voidrunner",
    desc: "Fast-paced roguelike platformer set in a collapsing digital universe.",
    image: "/images/voidrunner.jpg",
    status: "development",
    tag: "In Development",
  },
  {
    id: "nightfall",
    title: "Nightfall Arena",
    desc: "Competitive multiplayer arena fighter with ranked seasonal system.",
    image: "/images/nightfall.jpg",
    status: "prototype",
    tag: "Prototype",
  },
  {
    id: "pixelforge",
    title: "PixelForge",
    desc: "Real-time browser-based pixel editor for creators and designers.",
    image: "/images/pixelforge.jpg",
    status: "planned",
    tag: "Planned",
  },
];

export default function GamesPage() {
  const [filter, setFilter] = useState<"all" | Game["status"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return GAMES;
    return GAMES.filter((g) => g.status === filter);
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#05030a] text-white px-6 py-28">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] text-purple-400 uppercase">
            Game Division
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Future{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
            Experimental game concepts and systems currently in development at Whitecore Labs.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {[
            { key: "all", label: "All" },
            { key: "prototype", label: "Prototype" },
            { key: "development", label: "In Development" },
            { key: "planned", label: "Planned" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                filter === f.key
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600"
                  : "text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((game) => (
            <div
              key={game.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40"
            >
              {/* IMAGE */}
              <div className="relative h-56 w-full">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover opacity-70 group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* content */}
              <div className="relative p-5">

                {/* STATUS */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-300 flex items-center gap-1">
                    <Rocket size={12} />
                    {game.tag}
                  </span>

                  <span className="text-[10px] uppercase tracking-wider text-gray-500">
                    Whitecore Labs
                  </span>
                </div>

                <h3 className="text-xl font-bold mt-2">{game.title}</h3>

                <p className="text-sm text-gray-400 mt-2">
                  {game.desc}
                </p>

                {/* STATUS BADGE */}
                <div className="mt-4 flex items-center gap-2">
                  {game.status === "development" && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                      In Development
                    </span>
                  )}

                  {game.status === "prototype" && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      Prototype
                    </span>
                  )}

                  {game.status === "planned" && (
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Planned
                    </span>
                  )}
                </div>

                {/* ACTION */}
                <div className="flex items-center justify-between mt-5">
                  <span className="flex items-center gap-2 text-xs text-gray-500">
                    <Wrench size={14} />
                    Internal build
                  </span>

                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-sm hover:bg-purple-600/40 transition">
                    <Play size={14} />
                    Preview
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}