"use client";

import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const hours = [
  { day: "Senin – Sabtu", time: "06.00 – 21.00", open: true },
  { day: "Minggu", time: "07.00 – 18.00", open: true },
];

const infoItems = [
  {
    icon: MapPin,
    label: "Alamat",
    content: "Ruko Citraland No.17 Blok Capri,\nPamengkang, Mundu, Cirebon 45173",
  },
  {
    icon: Clock,
    label: "Jam Buka",
    content: "Setiap hari · Buka pukul 06.00 WIB",
  },
  {
    icon: Phone,
    label: "Telepon",
    content: "0852-1324-8160",
    href: "tel:+6285213248160",
  },
];

export default function LocationSection() {
  return (
    <section
      id="lokasi"
      style={{
        padding: "100px 0",
        background: "#0d0d0d",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div className="section-tag">
            <span className="red-dot" />
            Lokasi & Kontak
          </div>
          <h2
            className="display"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#f0f0f0" }}
          >
            Temukan Kami di{" "}
            <span style={{ color: "#e63329" }}>Cirebon</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32, alignItems: "start",
        }}>

          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Info cards */}
            {infoItems.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="card" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    background: "rgba(230,51,41,0.08)", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={16} color="#e63329" />
                  </div>
                  <div>
                    <div className="label" style={{ marginBottom: 4 }}>{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.9rem", color: "#ccc",
                          textDecoration: "none", lineHeight: 1.5,
                        }}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem", color: "#ccc",
                        lineHeight: 1.6, whiteSpace: "pre-line",
                      }}>
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Hours breakdown */}
            <div className="card" style={{ padding: "20px 24px" }}>
              <div className="label" style={{ marginBottom: 12 }}>Jam Operasional</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {hours.map(h => (
                  <div
                    key={h.day}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#888" }}>
                      {h.day}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        display: "inline-block", width: 6, height: 6,
                        borderRadius: "50%", background: "#22c55e",
                      }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#ccc", fontVariantNumeric: "tabular-nums" }}>
                        {h.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6285213248160?text=Halo%20Ultimate%20Warriors%20Gym%2C%20saya%20ingin%20bergabung!"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "#16a34a", color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "14px 24px", borderRadius: 8,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#15803d")}
              onMouseLeave={e => (e.currentTarget.style.background = "#16a34a")}
            >
              <MessageCircle size={16} />
              Chat di WhatsApp
            </a>
          </div>

          {/* Right: Map */}
          <div>
            <div
              style={{
                borderRadius: 12, overflow: "hidden",
                border: "1px solid #222",
                boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
              }}
            >
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34615.118263521086!2d108.52078026090217!3d-6.751939124472262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1de038cbf08f%3A0x79624579141a6efa!2sUltimate%20Warriors%20Gym!5e1!3m2!1sid!2sid!4v1782389706230!5m2!1sid!2sid"
                width="100%"
                height="440"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ultimate Warriors Gym — Google Maps"
              /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58028.31973697175!2d108.51602627586699!3d-6.757129999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1de038cbf08f%3A0x79624579141a6efa!2sUltimate%20Warriors%20Gym!5e1!3m2!1sid!2sid!4v1782392281853!5m2!1sid!2sid"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ultimate Warriors Gym — Google Maps"
              />
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem", color: "#444",
              marginTop: 10, textAlign: "center",
              letterSpacing: "0.04em",
            }}>
              Plus Code: 6HV6+4H Pamengkang, Kabupaten Cirebon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
