"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Lokasi", href: "#lokasi" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(13,13,13,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "#222" : "transparent"}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); scrollTo("#home"); }}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.1 }}
          >
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: "1.1rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: "#f0f0f0",
            }}>
              Ultimate Warriors
            </span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400, fontSize: "0.62rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#e63329",
            }}>
              GYM · CIREBON
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden md:flex">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#888", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f0f0f0")}
                onMouseLeave={e => (e.currentTarget.style.color = "#888")}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/6285213248160?text=Halo%20Ultimate%20Warriors%20Gym%2C%20saya%20ingin%20info%20lebih%20lanjut."
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "10px 22px", fontSize: "0.72rem" }}
            >
              Join Now
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#888", padding: 4 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#111", borderTop: "1px solid #222",
          padding: "16px 24px 24px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={e => { e.preventDefault(); scrollTo(l.href); }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem", fontWeight: 500,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#888", textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/6285213248160?text=Halo%20Ultimate%20Warriors%20Gym%2C%20saya%20ingin%20info%20lebih%20lanjut."
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: 16, justifyContent: "center" }}
          >
            Join Now
          </a>
        </div>
      )}
    </header>
  );
}
