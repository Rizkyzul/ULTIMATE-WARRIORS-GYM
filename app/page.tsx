"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Menu, X, Dumbbell, Cable, ShoppingBag,
  MapPin, Phone, Clock, MessageCircle, ArrowRight,
  Check, Zap, ChevronDown, Quote, Users, Flame
} from "lucide-react";

/* ── Inline Instagram SVG (not in this lucide version) ── */
function IgIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/* ── Reusable animation wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Dynamic Counter for stats ── */
function StatCounter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ── Gym Status Checker Hook ── */
function useGymStatus() {
  const [status, setStatus] = useState({ open: true, text: "Memuat..." });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const cirebonTime = new Date(utc + (3600000 * 7));

      const day = cirebonTime.getDay();
      const hour = cirebonTime.getHours();

      let isOpen = false;
      let closeInfo = "Buka pukul 06:00 WIB";

      if (day === 0) {
        if (hour >= 7 && hour < 21) {
          isOpen = true;
          closeInfo = "Tutup pukul 21:00 WIB";
        } else {
          closeInfo = "Buka Minggu pukul 07:00 WIB";
        }
      } else {
        if (hour >= 6 && hour < 21) {
          isOpen = true;
          closeInfo = "Tutup pukul 21:00 WIB";
        } else {
          const nextOpen = day === 6 ? "Buka Minggu pukul 07:00 WIB" : "Buka besok pukul 06:00 WIB";
          closeInfo = nextOpen;
        }
      }

      setStatus({
        open: isOpen,
        text: isOpen ? `Buka Sekarang · ${closeInfo}` : `Sedang Tutup · ${closeInfo}`
      });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

/* ══════════════════════════ DATA ══════════════════════════ */

const WA = "https://wa.me/6285213248160";
const WA_JOIN = `${WA}?text=Halo%20Ultimate%20Warriors%20Gym%2C%20saya%20ingin%20bergabung!`;

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Galeri", href: "#galeri" },
  { label: "Paket", href: "#paket" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Lokasi", href: "#lokasi" },
];

const FACILITIES = [
  {
    icon: Dumbbell,
    title: "Area Free Weights",
    tag: "Push · Pull · Legs",
    desc: "Barbell & dumbbell premium (5–100 kg), squat rack, power cage, dan pull-up station. Setup lengkap untuk program hypertrophy dan strength serious.",
    size: "lg:col-span-2",
  },
  {
    icon: Cable,
    title: "Mesin Isolasi & Kabel",
    tag: "Bio-mekanik presisi",
    desc: "Cable crossover, leg press, chest fly, lat pulldown — isolasi setiap grup otot dengan kontrol penuh dan range of motion optimal.",
    size: "lg:col-span-1",
  },
  {
    icon: ShoppingBag,
    title: "Nutrition & Suplemen",
    tag: "Fuel · Recovery",
    desc: "Creatine, Mass Gainer, Whey Protein, BCAA, dan pre-workout tersedia langsung di gym.",
    size: "lg:col-span-1",
  },
  {
    icon: Flame,
    title: "Personal Guidance",
    tag: "PRO-COACHING",
    desc: "Dampingan trainer berpengalaman untuk merancang program latihan, teknik angkatan yang aman, dan panduan nutrisi terukur.",
    size: "lg:col-span-2",
  },
];

const PLANS = [
  {
    id: "harian",
    name: "HARIAN",
    label: "Visit Harian",
    price: "Rp 25k",
    period: "visit",
    note: "Coba dulu, komitmen belakangan",
    perks: ["Akses semua area & alat", "1 hari penuh", "Tanpa pendaftaran"],
    wa: `${WA}?text=Halo%2C%20saya%20ingin%20info%20harga%20Visit%20Harian.`,
    highlight: false,
  },
  {
    id: "bulanan",
    name: "BULANAN",
    label: "Member Bulanan",
    price: "Rp 180k",
    period: "bulan",
    note: "Pilihan paling populer",
    perks: [
      "Akses unlimited 30 hari",
      "Kartu member resmi",
      "Free konsultasi program",
      "Priority locker access",
    ],
    wa: `${WA}?text=Halo%2C%20saya%20ingin%20info%20Member%20Bulanan.`,
    highlight: true,
  },
  {
    id: "pelajar",
    name: "PELAJAR",
    label: "Paket Pelajar",
    price: "Rp 150k",
    period: "bulan",
    note: "Tunjukkan KTM / KTS",
    perks: ["Harga spesial mahasiswa", "Akses semua fasilitas", "Berlaku 30 hari"],
    wa: `${WA}?text=Halo%2C%20saya%20mahasiswa%20ingin%20info%20Paket%20Pelajar.`,
    highlight: false,
  },
];


/* ══════════════════════════ NAVBAR ══════════════════════════ */

function Navbar({ onJoinClick }: { onJoinClick: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => go("#beranda")} className="flex items-center gap-3 font-display text-white text-xl sm:text-2xl tracking-wider">
          <img src="/logo.jpg" alt="Ultimate Warriors Logo" className="w-8 h-8 rounded-full object-cover border border-white/10" />
          ULTIMATE WARRIORS
        </button>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.href)}
              className="text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={onJoinClick}
          className="hidden md:inline-flex items-center gap-2 bg-[#d4ff00] text-black font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-[#bcff00] transition-colors cursor-pointer"
        >
          Join Now
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-1"
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0f0f0f] border-t border-white/5"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className="text-left text-gray-300 hover:text-white text-sm font-medium py-3 border-b border-white/5 tracking-wide"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setOpen(false); onJoinClick(); }}
                className="mt-4 flex w-full justify-center items-center gap-2 bg-[#d4ff00] text-black font-bold text-sm uppercase tracking-wide py-3 rounded-full cursor-pointer"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ══════════════════════════ HERO ══════════════════════════ */

function HeroSection({ onJoinClick }: { onJoinClick: () => void }) {
  const status = useGymStatus();
  return (
    <section
      id="beranda"
      className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "256px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-28 pb-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-[#d4ff00]" />
              <span className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em]">
                Ultimate Warriors Gym · Cirebon
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-300">
                <span className={`w-2 h-2 rounded-full ${status.open ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                {status.text}
              </span>
            </motion.div>

            {/* HEADLINE */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="font-display text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[6.5rem] xl:text-[7.5rem] text-white leading-[0.92] tracking-tight uppercase"
              >
                LIMITS ARE
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
                className="font-display text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[6.5rem] xl:text-[7.5rem] text-[#d4ff00] leading-[0.92] tracking-tight uppercase"
              >
                ILLUSIONS.
              </motion.h1>
            </div>

            {/* Sub + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
            >
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm">
                Tempa fisik terbaikmu di gym paling hardcore di Cirebon. Fasilitas premium, tanpa kompromi.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onJoinClick}
                  className="inline-flex items-center gap-2 bg-[#d4ff00] hover:bg-[#bcff00] text-black font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full transition-all hover:scale-105 cursor-pointer"
                >
                  Mulai Sekarang <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => document.querySelector("#paket")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full transition-all"
                >
                  Lihat Paket
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Gym Photo */}
          <div className="lg:col-span-5 relative w-full mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 group"
            >
              <img
                src="/gym_interior.png"
                alt="Ultimate Warriors Gym interior"
                className="w-full h-full object-cover grayscale contrast-[1.1] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#d4ff00] text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                  WARRIORS HQ
                </span>
                <h3 className="text-white font-display text-2xl uppercase tracking-wide mt-2">CIREBON HARDCORE SECTION</h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-6 lg:bottom-10 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between z-20"
        >
          <div className="flex gap-8 sm:gap-14">
            {[
              { v: "100%", l: "Full Equipment" },
              { v: "Daily", l: "Buka Tiap Hari" },
              { v: "21:00", l: "WIB Tutup" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-white font-black text-lg sm:text-2xl">
                  {s.v === "100%" ? <StatCounter target={100} suffix="%" /> : s.v}
                </p>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
          <ChevronDown className="text-gray-700 animate-bounce hidden sm:block" size={22} />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════ MARQUEE TICKER ══════════════════════════ */

function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-[#d4ff00] py-4 border-y border-white/10 z-20 flex">
      <div className="animate-marquee flex gap-12 text-black font-display text-4xl font-black uppercase tracking-tight py-1">
        {/* First copy */}
        <div className="flex items-center gap-12 pr-12">
          <span>ULTIMATE WARRIORS GYM</span>
          <span className="text-black/40">⚡</span>
          <span>NO PAIN NO GAIN</span>
          <span className="text-black/40">⚡</span>
          <span>100% HARDCORE</span>
          <span className="text-black/40">⚡</span>
          <span>PUSH YOUR LIMITS</span>
          <span className="text-black/40">⚡</span>
          <span>BEAST MODE</span>
          <span className="text-black/40">⚡</span>
        </div>
        {/* Second copy */}
        <div className="flex items-center gap-12 pr-12">
          <span>ULTIMATE WARRIORS GYM</span>
          <span className="text-black/40">⚡</span>
          <span>NO PAIN NO GAIN</span>
          <span className="text-black/40">⚡</span>
          <span>100% HARDCORE</span>
          <span className="text-black/40">⚡</span>
          <span>PUSH YOUR LIMITS</span>
          <span className="text-black/40">⚡</span>
          <span>BEAST MODE</span>
          <span className="text-black/40">⚡</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ FACILITIES ══════════════════════════ */

function FacilitiesSection() {
  return (
    <section id="fasilitas" className="bg-[#0a0a0a] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <Reveal className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              — Fasilitas
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase leading-none">
              FASILITAS<br />KAMI
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Dari barbell sampai nutrition bar — setiap sudut dirancang untuk mendukung progres serius.
          </p>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACILITIES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.12} className={f.size}>
                <div className="group h-full bg-[#141414] border border-white/5 rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-2 transition-transform duration-300 cursor-default">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#d4ff00]/10 rounded-xl flex items-center justify-center group-hover:bg-[#d4ff00]/20 transition-colors">
                    <Icon size={22} className="text-[#d4ff00]" />
                  </div>

                  {/* Tag */}
                  <p className="text-[#d4ff00]/70 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {f.tag}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-3xl text-white uppercase leading-none">
                    {f.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>

                  {/* Bottom accent */}
                  <div className="h-[1px] bg-gradient-to-r from-[#d4ff00]/30 via-[#d4ff00]/10 to-transparent" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ PRICING ══════════════════════════ */

function PricingSection({ onJoinClick }: { onJoinClick: (planName: string) => void }) {
  return (
    <section id="paket" className="bg-[#0f0f0f] py-20 md:py-32 relative overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4ff00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <Reveal className="mb-16 text-center">
          <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em] mb-3">— Paket Member</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase leading-none">
            PILIH PAKETMU
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <div
                className={`relative flex flex-col h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 ${plan.highlight
                    ? "bg-[#141414] border-2 border-[#d4ff00]"
                    : "bg-[#141414] border border-white/5 hover:border-white/15"
                  }`}
              >
                {/* Highlight badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4ff00] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {/* Name */}
                <p className={`font-display text-5xl uppercase leading-none mb-1 ${plan.highlight ? "text-[#d4ff00]" : "text-white"
                  }`}>
                  {plan.name}
                </p>
                <p className="text-gray-500 text-sm mb-2">{plan.note}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-500 text-xs uppercase font-medium">/ {plan.period}</span>
                </div>

                {/* Divider */}
                <div className={`h-[1px] mb-6 ${plan.highlight ? "bg-[#d4ff00]/30" : "bg-white/5"}`} />

                {/* Perks */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? "bg-[#d4ff00]/20" : "bg-white/5"
                        }`}>
                        <Check size={9} className={plan.highlight ? "text-[#d4ff00]" : "text-gray-400"} strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-sm">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => onJoinClick(plan.name)}
                  className={`flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest py-3.5 rounded-full transition-all hover:scale-[1.03] w-full cursor-pointer ${plan.highlight
                      ? "bg-[#d4ff00] text-black hover:bg-[#bcff00]"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                    }`}
                >
                  <MessageCircle size={14} />
                  Pilih Paket
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-center text-gray-700 text-xs mt-8">
            Hubungi kami via WhatsApp untuk info harga terbaru.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════ GALLERY ══════════════════════════ */

function GallerySection() {
  return (
    <section id="galeri" className="bg-[#0a0a0a] py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/5" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <Reveal className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              — GALLERY
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase leading-none">
              DINDING TEMPUR
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Visual asli area latihan dan perlengkapan premium Ultimate Warriors Gym. No filter, no excuse.
          </p>
        </Reveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Image */}
          <Reveal className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[500px] relative rounded-2xl overflow-hidden group border border-white/5">
            <img
              src="/gym_athlete.png"
              alt="Athlete training at Ultimate Warriors Gym"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.1] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-[#d4ff00] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                100% FOCUS
              </span>
              <h3 className="font-display text-3xl text-white uppercase mt-2">NO COMPROMISE</h3>
              <p className="text-gray-400 text-xs">Peralatan berkualitas tinggi untuk latihan angkatan terberatmu.</p>
            </div>
          </Reveal>

          {/* Right Sub-grid */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Top Sub-image */}
            <Reveal delay={0.1} className="h-[238px] relative rounded-2xl overflow-hidden group border border-white/5">
              <img
                src="/gym_interior.png"
                alt="Gym Interior"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.1] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-white/10 backdrop-blur-md text-[#d4ff00] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  ATMOSPHERE
                </span>
                <h4 className="font-display text-xl text-white uppercase mt-1">SERIOUS TRAINING</h4>
              </div>
            </Reveal>

            {/* Bottom Sub-image */}
            <Reveal delay={0.2} className="h-[238px] relative rounded-2xl overflow-hidden group border border-white/5">
              <img
                src="/gym_barbell.png"
                alt="Gym Equipment"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.1] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-white/10 backdrop-blur-md text-[#d4ff00] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  HARDWARE
                </span>
                <h4 className="font-display text-xl text-white uppercase mt-1">PREMIUM GEAR</h4>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */

const TESTIMONIALS = [
  {
    quote: "Gokil sih! Barbell & dumbbell-nya lengkap banget, jarang ada gym di Cirebon yang punya dumbbell seberat ini. Suasana latihan sangat memotivasi!",
    author: "Hendra",
    role: "Powerlifter",
    stat: "Strength Pro",
  },
  {
    quote: "Suka banget latihan di sini. Jam bukanya fleksibel, tempatnya bersih, dan nutrition bar-nya ngebantu banget buat pre/post workout.",
    author: "Rian",
    role: "Calisthenics Enthusiast",
    stat: "Bulk Pro",
  },
  {
    quote: "Paket pelajarnya ramah kantong. Mesin isolasinya presisi dan gak ngantri panjang. Recommended buat yang mau serius progres!",
    author: "Daffa",
    role: "Mahasiswa",
    stat: "Member Aktif",
  },
  {
    quote: "Tempat latihan paling hardcore di Cirebon. Plat beban besi melimpah, tidak ada musik pop menye-menye, murni metal dan suara besi! Juara!",
    author: "Budi S.",
    role: "Bodybuilder",
    stat: "Cut 12kg",
  },
  {
    quote: "Awalnya ragu ke gym hardcore, tapi di sini ternyata ramah banget buat cewek yang mau latihan beban serius. Pro-coaching-nya ngebantu banget.",
    author: "Sarah A.",
    role: "Fitness Enthusiast",
    stat: "Fit & Tone",
  },
  {
    quote: "Buka dari jam 6 pagi jadi saya bisa latihan dulu sebelum kerja. Alat cardio dan isolasi punggungnya lengkap banget, gak perlu antri lama.",
    author: "Tommy K.",
    role: "Corporate Worker",
    stat: "Daily Member",
  },
  {
    quote: "Lantai area free weights sangat kokoh dan aman buat drop barbell. Member-member lain juga saling support, sharing ilmu, dan bersahabat.",
    author: "Ivan Z.",
    role: "Weightlifter",
    stat: "PR 180kg Squat",
  },
  {
    quote: "Gak cuma alatnya yang premium, tapi suplemen dan protein bar yang disediakan langsung di gym sangat memudahkan recovery setelah leg day.",
    author: "Denny H.",
    role: "Athlete",
    stat: "Recovery Support",
  },
];

function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85; // Scroll about 85% of viewport width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimoni" className="bg-[#0f0f0f] py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/5" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <Reveal>
            <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              — TESTIMONI
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase leading-none">
              APA KATA WARRIORS
            </h2>
          </Reveal>

          {/* Slider Buttons */}
          <Reveal delay={0.1} className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#d4ff00] hover:text-black hover:border-[#d4ff00] transition-all cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#d4ff00] hover:text-black hover:border-[#d4ff00] transition-all cursor-pointer"
              aria-label="Next testimonials"
            >
              <ArrowRight size={20} />
            </button>
          </Reveal>
        </div>

        {/* Testimonials Slider Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] flex-shrink-0 snap-start snap-always"
            >
              <div className="bg-[#141414] border border-white/5 rounded-2xl p-7 flex flex-col justify-between h-[320px] sm:h-[300px] group hover:border-[#d4ff00]/20 transition-all duration-300">
                <div>
                  <Quote className="text-[#d4ff00] opacity-40 mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.author}</h4>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                  <span className="bg-[#d4ff00]/10 text-[#d4ff00] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                    {t.stat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Floating WhatsApp Button ── */
function FloatingWA() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-[#141414] border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            Tanya Info Member? Chat Owner!
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={WA_JOIN}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-400/20"
        aria-label="Chat WhatsApp Owner"
      >
        <MessageCircle size={26} strokeWidth={2.5} />
      </a>
    </div>
  );
}

/* ══════════════════════════ FAQ ══════════════════════════ */

const FAQ_ITEMS = [
  {
    q: "Apakah pemula akan diajarkan menggunakan alat?",
    a: "Tentu saja! Trainer kami akan dengan senang hati menunjukkan cara kerja alat dan mendampingi Anda di sesi awal agar teknik angkatan Anda aman dan efektif."
  },
  {
    q: "Apakah ada biaya registrasi tambahan untuk member baru?",
    a: "Tidak ada biaya admin tersembunyi. Anda cukup membayar biaya paket bulanan yang dipilih dan langsung bisa mulai latihan hari itu juga."
  },
  {
    q: "Bagaimana dengan fasilitas parkir kendaraan?",
    a: "Area parkir Ruko Citraland sangat luas, aman, dipantau CCTV, dan gratis (tanpa biaya parkir tambahan) baik untuk motor maupun mobil."
  },
  {
    q: "Apakah diperbolehkan melakukan visit harian?",
    a: "Sangat boleh! Kami menyediakan paket harian (visit pass) bagi Anda yang ingin mencoba fasilitas sebelum memutuskan bergabung menjadi member bulanan."
  },
  {
    q: "Apakah tersedia fasilitas loker penyimpanan?",
    a: "Ya, kami menyediakan loker penyimpanan barang bawaan secara gratis selama latihan demi keamanan dan kenyamanan barang berharga Anda."
  }
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Reveal delay={index * 0.08}>
      <div className="border border-white/5 bg-[#141414] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#d4ff00]/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
        >
          <span className="font-display text-xl text-white tracking-wide uppercase">{q}</span>
          <ChevronDown className={`text-[#d4ff00] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={18} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 pt-1 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                {a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-[#0a0a0a] py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/5" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <Reveal className="mb-16 text-center">
          <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            — PERTANYAAN
          </p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase leading-none">
            FAQ WARRIORS
          </h2>
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ JOIN MODAL ══════════════════════════ */

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

function JoinModal({ isOpen, onClose, selectedPlan, setSelectedPlan }: JoinModalProps) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Strength & Powerlifting");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const message = `Halo Ultimate Warriors Gym, saya ingin bergabung!
Nama: ${name}
Paket Pilihan: ${selectedPlan}
Target Fitnes: ${goal}`;

    const waUrl = `${WA}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black backdrop-blur-sm"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-[#141414] border-2 border-[#d4ff00] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-4xl text-white uppercase tracking-tight mb-2">JOIN WARRIORS</h3>
            <p className="text-gray-400 text-xs mb-6">Lengkapi data untuk membuat berkas pendaftaran WhatsApp secara instan.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name-field" className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">
                  Nama Lengkap
                </label>
                <input
                  id="name-field"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda..."
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                />
              </div>

              {/* Plan Selection */}
              <div>
                <label htmlFor="plan-field" className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">
                  Paket Pilihan
                </label>
                <select
                  id="plan-field"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                >
                  <option value="HARIAN">HARIAN (Rp 25k/visit)</option>
                  <option value="BULANAN">BULANAN (Rp 180k/bulan)</option>
                  <option value="PELAJAR">PELAJAR (Rp 150k/bulan)</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label htmlFor="goal-field" className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">
                  Target Fitnes Anda
                </label>
                <select
                  id="goal-field"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors font-sans"
                >
                  <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                  <option value="Bodybuilding / Muscle Building">Bodybuilding / Muscle Building</option>
                  <option value="Fat Loss / Diet">Fat Loss / Diet</option>
                  <option value="General Fitness & Kesehatan">General Fitness & Kesehatan</option>
                </select>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#d4ff00] hover:bg-[#bcff00] text-black font-bold text-sm uppercase tracking-widest py-3.5 rounded-full transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle size={15} />
                Kirim Data via WA
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════ LOCATION ══════════════════════════ */

function LocationSection() {
  const status = useGymStatus();
  return (
    <section id="lokasi" className="bg-[#0a0a0a] py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/5" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div>
            <Reveal>
              <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.25em] mb-4">— Lokasi</p>
              <h2 className="font-display text-6xl sm:text-7xl md:text-8xl text-white uppercase leading-none mb-10">
                TEMUKAN<br />KAMI
              </h2>
            </Reveal>

            <div className="space-y-5">
              {/* Address */}
              <Reveal delay={0.1}>
                <div className="flex gap-4 bg-[#141414] border border-white/5 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-[#d4ff00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest mb-1.5">Alamat</p>
                    <p className="text-white text-sm font-semibold leading-relaxed">
                      Ruko Citraland, Jl. Perum Citraland No.17 Blok Capri
                    </p>
                    <p className="text-gray-400 text-sm mt-0.5">Pamengkang, Mundu, Cirebon 45173</p>
                  </div>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal delay={0.15}>
                <div className="flex gap-4 bg-[#141414] border border-white/5 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-[#d4ff00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#d4ff00]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest mb-2">Jam Operasional</p>
                    <div className="space-y-1.5">
                      {[
                        { d: "Senin – Sabtu", t: "06.00 – 21.00 WIB" },
                        { d: "Minggu", t: "07.00 – 21.00 WIB" },
                      ].map((h) => (
                        <div key={h.d} className="flex justify-between text-sm">
                          <span className="text-gray-400">{h.d}</span>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            <span className="text-white font-medium tabular-nums">{h.t}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${status.open ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                      <span className="text-[#d4ff00] text-xs font-semibold">{status.text}</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Contact row */}
              <Reveal delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/6285213248160"
                    target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-[#141414] border border-white/5 hover:border-[#d4ff00]/30 rounded-2xl p-4 transition-all"
                  >
                    <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <Phone size={15} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest mb-0.5">WhatsApp</p>
                      <p className="text-white text-xs font-semibold">0852-1324-8160</p>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-[#141414] border border-white/5 hover:border-[#d4ff00]/30 rounded-2xl p-4 transition-all"
                  >
                    <div className="w-9 h-9 bg-pink-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                      <IgIcon size={15} />
                    </div>
                    <div>
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest mb-0.5">Instagram</p>
                      <p className="text-white text-xs font-semibold">@ultimatewarriors</p>
                    </div>
                  </a>
                </div>
              </Reveal>

              {/* WhatsApp CTA */}
              <Reveal delay={0.25}>
                <a
                  href={WA_JOIN}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#d4ff00] hover:bg-[#bcff00] text-black font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={16} />
                  Chat WhatsApp Sekarang
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right: Map */}
          <Reveal delay={0.2} className="w-full">
            <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black">
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-auto lg:h-[620px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34615.118263521086!2d108.52078026090217!3d-6.751939124472262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1de038cbf08f%3A0x79624579141a6efa!2sUltimate%20Warriors%20Gym!5e1!3m2!1sid!2sid!4v1782389706230!5m2!1sid!2sid"
                  className="absolute inset-0 w-full h-full"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Ultimate Warriors Gym — Google Maps"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ FOOTER ══════════════════════════ */

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Ultimate Warriors Logo" className="w-12 h-12 rounded-full object-cover border border-white/10" />
            <div>
              <p className="font-display text-white text-xl tracking-wider leading-none">ULTIMATE WARRIORS</p>
              <p className="text-[#d4ff00] text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5">Gym · Cirebon</p>
              <p className="text-gray-600 text-xs mt-2">Ruko Citraland No.17, Mundu, Cirebon 45173</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-600 hover:text-white text-xs font-medium uppercase tracking-wide transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 bg-[#1c1c1c] hover:bg-[#d4ff00]/10 border border-white/5 hover:border-[#d4ff00]/30 rounded-full flex items-center justify-center text-gray-500 hover:text-[#d4ff00] transition-all">
              <IgIcon size={15} />
            </a>
            <a href="https://wa.me/6285213248160" target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 bg-[#1c1c1c] hover:bg-[#d4ff00]/10 border border-white/5 hover:border-[#d4ff00]/30 rounded-full flex items-center justify-center text-gray-500 hover:text-[#d4ff00] transition-all">
              <MessageCircle size={15} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-gray-800 text-xs">© {new Date().getFullYear()} Ultimate Warriors Gym. All rights reserved.</p>
          <p className="text-gray-800 text-xs">Cirebon, West Java 45173</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════ PAGE ══════════════════════════ */

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("BULANAN");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (planName?: string) => {
    if (planName) {
      setSelectedPlan(planName.toUpperCase());
    } else {
      setSelectedPlan("BULANAN");
    }
    setModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#d4ff00] z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar onJoinClick={() => openModal()} />
      <main>
        <HeroSection onJoinClick={() => openModal()} />
        <MarqueeTicker />
        <FacilitiesSection />
        <GallerySection />
        <PricingSection onJoinClick={(plan) => openModal(plan)} />
        <TestimonialsSection />
        <FaqSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingWA />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-[#141414] hover:bg-[#d4ff00] text-gray-400 hover:text-black border border-white/10 hover:border-[#d4ff00] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowRight size={20} className="-rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Join Modal */}
      <JoinModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
    </div>
  );
}
