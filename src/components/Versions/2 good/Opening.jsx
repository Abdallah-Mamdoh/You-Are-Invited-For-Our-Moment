import { useState, useEffect } from "react";

export default function Opening({ onOpen }) {
  const [opened, setOpened] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.7,
      delay: Math.random() * 4,
    }));
    setStars(generated);
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      if (onOpen) onOpen();
    }, 2400);
  };

  return (
    <div style={styles.screen}>
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: "#d4a843",
            borderRadius: "50%",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .env-hint {
          animation: breathe 2s ease-in-out infinite;
        }
        .env-flap {
          transform-origin: top center;
          transform-box: fill-box;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .opened .env-flap {
          transform: rotateX(180deg);
        }
        .env-seal {
          transition: opacity 0.3s 0.2s, transform 0.3s 0.2s;
        }
        .opened .env-seal {
          opacity: 0;
          transform: scale(0.5);
        }
        .letter-rise {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%) translateY(0px);
          width: 75%;
          background: #fdf8f0;
          border: 0.5px solid #d4a843;
          padding: 18px 14px;
          text-align: center;
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.34, 1.4, 0.64, 1) 0.5s, opacity 0.5s 0.4s;
          pointer-events: none;
          border-radius: 1px;
        }
        .opened .letter-rise {
          transform: translateX(-50%) translateY(-220%);
          opacity: 1;
        }
        .env-wrap:hover .env-body-inner {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Envelope wrapper */}
      <div
        className={opened ? "opened" : ""}
        style={styles.envWrap}
        onClick={handleOpen}
      >
        <div
          className="env-body-inner"
          style={{ transition: "transform 0.3s ease" }}
        >
          <svg
            style={{ width: "100%", display: "block" }}
            viewBox="0 0 340 230"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5e8c0" />
                <stop offset="100%" stopColor="#d9bc78" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="340"
              height="230"
              rx="3"
              fill="url(#eg)"
              stroke="#c9a84c"
              strokeWidth="0.8"
            />
            <polygon
              points="0,230 340,230 170,115"
              fill="#d4bc78"
              stroke="#c9a84c"
              strokeWidth="0.5"
            />
            <polygon points="0,0 0,230 160,115" fill="#cca84c" opacity="0.45" />
            <polygon
              points="340,0 340,230 180,115"
              fill="#cca84c"
              opacity="0.45"
            />
            <g className="env-flap">
              <polygon
                points="0,0 340,0 170,115"
                fill="#e8d498"
                stroke="#c9a84c"
                strokeWidth="0.5"
              />
            </g>
            <g className="env-seal">
              <circle cx="170" cy="115" r="32" fill="#8e1a13" />
              <circle
                cx="170"
                cy="115"
                r="30"
                fill="none"
                stroke="rgba(255,180,160,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="170"
                y="105"
                textAnchor="middle"
                fontFamily="'Great Vibes', cursive"
                fontSize="20"
                fill="rgba(255,230,210,0.95)"
              >
                A
              </text>
              <line
                x1="155"
                y1="113"
                x2="185"
                y2="113"
                stroke="rgba(255,200,180,0.45)"
                strokeWidth="0.5"
              />
              <text
                x="170"
                y="133"
                textAnchor="middle"
                fontFamily="'Great Vibes', cursive"
                fontSize="20"
                fill="rgba(255,230,210,0.95)"
              >
                S
              </text>
            </g>
          </svg>

          {/* Letter rising from envelope */}
          <div className="letter-rise">
            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: "#8a6a2a",
                textTransform: "uppercase",
                marginBottom: 6,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              You are invited
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 28,
                color: "#3a2008",
                lineHeight: 1.2,
              }}
            >
              Abdallah
            </div>
            <div
              style={{
                color: "#d4a843",
                fontSize: 13,
                margin: "3px 0",
                letterSpacing: 4,
              }}
            >
              &amp;
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 28,
                color: "#3a2008",
                lineHeight: 1.2,
              }}
            >
              Sohaila
            </div>
            <div
              style={{
                width: 50,
                height: 0.5,
                background: "#d4a843",
                margin: "8px auto",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                color: "#8a6a2a",
                textTransform: "uppercase",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Engagement · 12 June 2026
            </div>
          </div>
        </div>

        {/* Hint text */}
        <div
          className="env-hint"
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "rgba(212,168,67,0.85)",
            fontFamily: "'Great Vibes', cursive",
            fontSize: 22,
            opacity: opened ? 0 : 1,
            transition: "opacity 0.3s",
          }}
        >
          Tap to open
        </div>
      </div>
    </div>
  );
}

const styles = {
  screen: {
    width: "100%",
    height: "100vh",
    minHeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(ellipse at 50% 60%, #1a1108 0%, #0c0906 70%)",
    position: "relative",
    overflow: "hidden",
  },
  envWrap: {
    position: "relative",
    width: "min(340px, 86vw)",
    cursor: "pointer",
    zIndex: 10,
  },
};
