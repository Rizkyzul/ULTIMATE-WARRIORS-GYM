"use client";

import { Dumbbell, Zap, ShoppingBag, User } from "lucide-react";

const facilities = [
  {
    icon: Dumbbell,
    number: "01",
    title: "Free Weights",
    subtitle: "Push · Pull · Legs",
    description:
      "Area free weights lengkap — barbell, dumbbell 5–100 kg, squat rack, power cage, EZ bar, pull-up station. Setup ideal untuk program PPL dan powerlifting.",
    tags: ["Squat Rack", "Power Cage", "Dumbbell set", "Pull-up Bar"],
  },
  {
    icon: Zap,
    number: "02",
    title: "Cardio Zone",
    subtitle: "Endurance · HIIT",
    description:
      "Mesin cardio modern: treadmill, stationary bike, elliptical, dan rowing machine. Cocok untuk warm-up ringan sampai sesi HIIT intensitas tinggi.",
    tags: ["Treadmill", "Stationary Bike", "Elliptical", "Rowing"],
  },
  {
    icon: ShoppingBag,
    number: "03",
    title: "Supplement Bar",
    subtitle: "Fuel · Recovery",
    description:
      "Tersedia suplemen berkualitas langsung di gym — whey protein, mass gainer, BCAA, kreatin, dan pre-workout untuk mendukung setiap fase latihan.",
    tags: ["Whey Protein", "Mass Gainer", "BCAA", "Pre-Workout"],
  },
  {
    icon: User,
    number: "04",
    title: "Personal Training",
    subtitle: "Expert · Custom",
    description:
      "Trainer berpengalaman merancang program sesuai goals kamu, mulai dari bulking, cutting, rekomposisi, hingga peningkatan kekuatan fungsional.",
    tags: ["Program Custom", "Assessment", "Konsultasi Diet", "Tracking"],
  },
];

export default function FacilitiesSection() {
  return (
    <section
      id="fasilitas"
      style={{
        padding: "100px 0",
        background: "#111",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="section-tag">
              <span className="red-dot" />
              Fasilitas
            </div>
            <h2
              className="display"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#f0f0f0" }}
            >
              Equipment&nbsp;
              <span style={{ color: "#e63329" }}>Lengkap</span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem", color: "#666",
            maxWidth: 340, lineHeight: 1.7,
          }}>
            Semua yang dibutuhkan untuk sesi latihan produktif, dalam satu tempat.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.number}
                className="card"
                style={{ padding: "32px 28px" }}
              >
                {/* Number + Icon row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: "3rem",
                    color: "#222", letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}>
                    {f.number}
                  </span>
                  <div style={{
                    width: 40, height: 40,
                    background: "rgba(230,51,41,0.08)",
                    borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} color="#e63329" />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="display"
                  style={{ fontSize: "1.5rem", color: "#f0f0f0", marginBottom: 4 }}
                >
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#e63329", marginBottom: 16,
                }}>
                  {f.subtitle}
                </p>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem", color: "#666",
                  lineHeight: 1.65, marginBottom: 24,
                }}>
                  {f.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {f.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem", fontWeight: 500,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      color: "#555", background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: 4, padding: "4px 10px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
