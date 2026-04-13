import { useState, useEffect } from "react";

export default function Opening({ onOpen }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
    setStars(generated);
  }, []);

  return (
    <div onClick={onOpen} style={styles.screen}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.85; }
        }
        .env-hint { animation: breathe 2.2s ease-in-out infinite; }
      `}</style>

      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute",
          width: s.size, height: s.size,
          left: `${s.left}%`, top: `${s.top}%`,
          background: "#e8d080", borderRadius: "50%",
          animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          opacity: 0,
        }} />
      ))}

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="envBody" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#f7ecc8" />
            <stop offset="50%" stopColor="#e8d498" />
            <stop offset="100%" stopColor="#c9a44a" />
          </linearGradient>
          <linearGradient id="envFlap" x1="0" y1="0" x2="0.1" y2="1">
            <stop offset="0%" stopColor="#ecdfa0" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
          <linearGradient id="sideL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8903a" />
            <stop offset="100%" stopColor="#e2c878" />
          </linearGradient>
          <linearGradient id="sideR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#b8903a" />
            <stop offset="100%" stopColor="#e2c878" />
          </linearGradient>
        </defs>

        <rect x="10" y="100" width="380" height="500" rx="4" fill="url(#envBody)" stroke="#b8943c" strokeWidth="1" />
        <polygon points="10,600 390,600 200,390" fill="#d4bc6e" stroke="#b8943c" strokeWidth="0.8" />
        <polygon points="10,100 10,600 200,390" fill="url(#sideL)" opacity="0.5" />
        <polygon points="390,100 390,600 200,390" fill="url(#sideR)" opacity="0.5" />
        <polygon points="10,100 390,100 200,310" fill="url(#envFlap)" stroke="#b8943c" strokeWidth="0.8" />

        {/* Wax seal */}
        <circle cx="200" cy="355" r="44" fill="#7a1510" />
        <circle cx="200" cy="355" r="41" fill="none" stroke="rgba(255,160,140,0.25)" strokeWidth="2" />
        <circle cx="200" cy="355" r="36" fill="none" stroke="rgba(255,160,140,0.12)" strokeWidth="1" />
        <text x="183" y="368" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="30" fill="rgba(255,230,205,0.95)">A</text>
        <text x="197" y="358" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill="rgba(255,200,170,0.6)" fontStyle="italic">&amp;</text>
        <text x="217" y="368" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="30" fill="rgba(255,230,205,0.95)">S</text>

        <line x1="10" y1="100" x2="390" y2="100" stroke="#c9a84c" strokeWidth="0.4" opacity="0.4" />

        <text x="200" y="660" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="20" fill="rgba(212,168,67,0.7)" className="env-hint">
          Tap to open
        </text>
      </svg>
    </div>
  );
}

const styles = {
  screen: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    background: "radial-gradient(ellipse at 50% 55%, #2a1c08 0%, #0e0904 100%)",
  },
};
