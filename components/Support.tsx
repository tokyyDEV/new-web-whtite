"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Circle,
  CheckCheck,
} from "lucide-react";

type Message = {
  id: string;
  from: "user" | "support";
  text: string;
  time: string;
};

const now = () =>
  new Date().toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });

// SAFE ID (Next kompatibilis fallback)
const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2);

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    from: "support",
    text: "Szia! 👋 Miben segíthetünk?",
    time: "09:14",
  },
];

const AUTO_REPLIES = [
  "Köszönjük az üzenetet! Hamarosan válaszolunk.",
  "Rögzítettük a kérdésed.",
  "Értem — megnézzük és visszajelzünk.",
];

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // AUTO SCROLL
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  // OPEN CHAT
  useEffect(() => {
    if (!open) return;
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: Message = {
      id: uid(),
      from: "user",
      text,
      time: now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 900 + Math.random() * 700;

    setTimeout(() => {
      const reply =
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];

      const botMsg: Message = {
        id: uid(),
        from: "support",
        text: reply,
        time: now(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);

      if (!open) setUnread((u) => u + 1);
    }, delay);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">

      {/* CHAT WINDOW */}
      <div
        className={`flex w-[340px] sm:w-[380px] flex-col overflow-hidden rounded-3xl border border-purple-500/20 bg-[#0a0714]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300 ${
          open
            ? "h-[520px] opacity-100 scale-100"
            : "h-0 opacity-0 scale-95 pointer-events-none"
        }`}
      >

        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-5 py-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white font-bold">
            WC
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0a0714]" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              Whitecore Support
            </p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <Circle size={6} className="fill-emerald-400" />
              Online
            </p>
          </div>

          <button onClick={() => setOpen(false)}>
            <X className="text-gray-400 hover:text-white" size={18} />
          </button>
        </div>

        {/* MESSAGES */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  m.from === "user"
                    ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white rounded-br-md"
                    : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-md"
                }`}
              >
                <p>{m.text}</p>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                  {m.time}
                  {m.from === "user" && <CheckCheck size={12} />}
                </span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-1 items-center text-gray-400 text-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 delay-150" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 delay-300" />
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2 focus-within:border-purple-500/50">
            <Paperclip size={16} className="text-gray-400" />

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Írj üzenetet..."
              className="flex-1 bg-transparent text-sm text-white outline-none"
            />

            <button
              onClick={send}
              disabled={!input.trim()}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center disabled:opacity-30"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* TOGGLE */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-110 transition"
      >
        <MessageCircle
          className={`absolute transition ${
            open ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        <X
          className={`absolute transition ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />

        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}