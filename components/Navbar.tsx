"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Gamepad2,
  ShoppingBag,
  Code2,
  Zap,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const NAV_LINKS = [
  { href: "games", label: "Games", icon: Gamepad2 },
  { href: "tech", label: "Tech", icon: Code2 },
  { href: "shop", label: "Shop", icon: ShoppingBag },
  { href: "projects", label: "Projects", icon: Zap },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section tracking (simple hash based)
  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash);
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // outside click close (mobile menu)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const login = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch {
      setLoading(false);
    }
  };

  const logout = async () => {
    setDropdownOpen(false);
    setOpen(false);
    await signOut(auth);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-purple-500/30 shadow-[0_4px_30px_rgba(168,85,247,0.15)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* LOGO */}
        <a
          href="#top"
          className="group flex items-center gap-3"
        >
          <div className="relative h-3 w-3">
            <div className="absolute inset-0 rotate-45 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-transform duration-500 group-hover:rotate-[225deg] group-hover:scale-125" />
            <div className="absolute inset-0 rotate-45 animate-ping bg-purple-500/60" />
          </div>
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-[length:200%_auto] bg-clip-text font-bold tracking-[0.35em] text-transparent transition-[background-position] duration-700 group-hover:bg-[position:-100%_0]">
            WHITECORE
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-1 text-sm text-gray-300 md:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = activeHash === href;
            return (
              <a
                key={href}
                href={href}
                onClick={() => setActiveHash(href)}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-300 ${
                  isActive ? "text-white" : "hover:text-purple-300"
                }`}
              >
                <Icon
                  size={15}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "text-purple-400"
                      : "text-gray-500 group-hover:text-purple-400 group-hover:scale-110"
                  }`}
                />
                <span>{label}</span>

                {/* underline indicator */}
                <span
                  className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 ${
                    isActive ? "w-2/3" : "w-0 group-hover:w-2/3"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <div className="flex items-center gap-2 rounded-full border border-purple-500/20 bg-black/30 px-5 py-2.5">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
              <span className="text-sm text-gray-400">Signing in…</span>
            </div>
          ) : user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-black/30 py-1.5 pl-1.5 pr-3 transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/10"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName ?? "User"}
                    className="h-8 w-8 rounded-full border border-purple-400/50 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 text-xs font-bold text-white">
                    {user.displayName?.[0] ?? "U"}
                  </div>
                )}
                <span className="max-w-[110px] truncate text-sm text-white">
                  {user.displayName}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN */}
              <div
                className={`absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-purple-500/20 bg-black/90 p-1.5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-200 ${
                  dropdownOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <div className="border-b border-white/5 px-3 py-2">
                  <p className="truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors duration-200 hover:bg-red-500/10"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={login}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">Sign in with Google</span>
            </button>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="relative flex h-9 w-9 items-center justify-center text-white md:hidden"
        >
          <Menu
            className={`absolute transition-all duration-300 ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute transition-all duration-300 ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`overflow-hidden border-b border-purple-500/30 bg-black/95 backdrop-blur-xl transition-all duration-500 ease-out md:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-5 text-gray-300">
          {NAV_LINKS.map(({ href, label, icon: Icon }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                setActiveHash(href);
                setOpen(false);
              }}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-purple-500/10 hover:text-purple-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
            >
              <Icon size={18} />
              {label}
            </a>
          ))}

          {/* AUTH MOBILE */}
          {user ? (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-purple-500/20 bg-black/30 px-4 py-3">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-8 w-8 rounded-full border border-purple-400/50 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 text-xs font-bold text-white">
                    {user.displayName?.[0] ?? "U"}
                  </div>
                )}
                <span className="truncate text-sm text-white">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={logout}
                className="rounded-full border border-red-500/40 p-2 text-red-400 transition-colors duration-200 hover:bg-red-500/10"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              disabled={loading}
              className="mt-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-transform duration-300 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in with Google"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}