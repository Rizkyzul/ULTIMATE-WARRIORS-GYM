"use client";

import { Star, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "#0d0d0d",
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Background layer */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(105deg, #0d0d0d 0%, #160804 50%, #0d0d0d 100%)
        `,
      }} />

      {/* Subtle right accent */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", right: "30%", top: "20%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(230,51,41,0.05) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", right: "30%", top: 0, bottom: 0,
          width: 1, background: "linear-gradient(to bottom, transparent, rgba(230,51,41,0.1), transparent)",
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto",
        padding: "0 24px", width: "100%",
      }}>

        {/* Label */}
        <div className="section-tag fade-up" style={{ color: "#e63329" }}>
          <span className="red-dot" style={{ background: "#e63329" }} />
          Tempat Fitness · Cirebon
        </div>

        {/* Headline */}
        <h1
          className="display fade-up delay-1"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
            color: "#f0f0f0",
            maxWidth: 720,
            marginBottom: "1.5rem",
          }}
        >
          Train Hard.<br />
          <span style={{ color: "#e63329" }}>No Excuses.</span>
        </h1>

        {/* Sub-copy */}
        <p
          className="fade-up delay-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", fontWeight: 300,
            color: "#777", lineHeight: 1.7,
            maxWidth: 440, marginBottom: "2.5rem",
          }}
        >
          Gym premium di Cirebon untuk kamu yang serius soal progress.
          Free weights lengkap, cardio zone, dan coaching personal.
        </p>

        {/* Rating */}
        <div
          className="fade-up delay-2"
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2.5rem" }}
        >
          <div style={{ display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#f0f0f0" }}>
            4.8
          </span>
          <span style={{ color: "#444", fontSize: "0.75rem" }}>•</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#666" }}>
            69 ulasan Google
          </span>
        </div>

        {/* CTAs */}
        <div className="fade-up delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://wa.me/6285213248160?text=Halo%20Ultimate%20Warriors%20Gym%2C%20saya%20ingin%20bergabung!"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Gabung Sekarang <ArrowRight size={15} />
          </a>
          <a
            href="#fasilitas"
            onClick={e => { e.preventDefault(); document.querySelector("#fasilitas")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-ghost"
          >
            Lihat Fasilitas
          </a>
        </div>

        {/* Stats */}
        <div
          className="fade-up delay-4"
          style={{
            display: "flex", gap: 40, marginTop: 60,
            paddingTop: 40, borderTop: "1px solid #1e1e1e",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "4.8★", label: "Rating Google" },
            { value: "69+", label: "Ulasan Positif" },
            { value: "06–21", label: "Jam Buka (WIB)" },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "1.8rem",
                color: "#f0f0f0", letterSpacing: "-0.01em",
              }}>
                {s.value}
              </div>
              <div className="label" style={{ marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
