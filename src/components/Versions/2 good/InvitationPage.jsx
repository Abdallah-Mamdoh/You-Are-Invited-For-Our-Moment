import { useEffect, useRef, useState } from "react";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap";

function useReveal(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const visible = useReveal(ref);
  return (
    <div
      id={id}
      ref={ref}
      style={{
        padding: "60px 32px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function OrnDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 32px",
        background: "#fff",
      }}
    >
      <div
        style={{ flex: 1, height: 0.5, background: "rgba(201,168,76,0.3)" }}
      />
      <div
        style={{
          width: 6,
          height: 6,
          background: "#c9a84c",
          transform: "rotate(45deg)",
          opacity: 0.6,
          flexShrink: 0,
        }}
      />
      <div
        style={{ flex: 1, height: 0.5, background: "rgba(201,168,76,0.3)" }}
      />
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--" });

  useEffect(() => {
    const target = new Date("2026-06-12T18:00:00");
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTime({ d: "00", h: "00", m: "00", s: "00" });
        return;
      }
      const pad = (n) => String(Math.floor(n)).padStart(2, "0");
      setTime({
        d: pad(diff / 86400000),
        h: pad((diff % 86400000) / 3600000),
        m: pad((diff % 3600000) / 60000),
        s: pad((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { val: time.d, label: "Days" },
    { val: time.h, label: "Hours" },
    { val: time.m, label: "Minutes" },
    { val: time.s, label: "Seconds" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 28,
      }}
    >
      {blocks.map((b, i) => (
        <div
          key={b.label}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 64,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 42,
                color: "#2a1a08",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {b.val}
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                color: "#8a7050",
                textTransform: "uppercase",
                marginTop: 4,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {b.label}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                color: "#c9a84c",
                paddingTop: 4,
              }}
            >
              ·
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GardenIllustration() {
  return (
    <svg
      style={{ width: "100%", display: "block" }}
      viewBox="0 0 360 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="360" height="200" fill="#f9f5ee" />
      <rect x="0" y="140" width="360" height="60" fill="#e8f0e0" />
      <ellipse cx="180" cy="148" rx="180" ry="20" fill="#d4e8c0" />
      <circle cx="40" cy="22" r="1.2" fill="#c9a84c" opacity="0.5" />
      <circle cx="95" cy="14" r="1" fill="#c9a84c" opacity="0.4" />
      <circle cx="160" cy="28" r="1.4" fill="#c9a84c" opacity="0.5" />
      <circle cx="220" cy="10" r="1" fill="#c9a84c" opacity="0.4" />
      <circle cx="310" cy="22" r="1.2" fill="#c9a84c" opacity="0.5" />
      <circle cx="330" cy="50" r="1" fill="#c9a84c" opacity="0.4" />
      <circle cx="290" cy="30" r="16" fill="#f5e8c0" />
      <circle cx="298" cy="26" r="12" fill="#f9f5ee" />
      <rect
        x="105"
        y="90"
        width="150"
        height="75"
        rx="1"
        fill="#f0e8d8"
        stroke="#c9a84c"
        strokeWidth="0.8"
      />
      <rect
        x="113"
        y="90"
        width="9"
        height="75"
        fill="#e0d0b0"
        stroke="#b8943c"
        strokeWidth="0.4"
      />
      <rect
        x="238"
        y="90"
        width="9"
        height="75"
        fill="#e0d0b0"
        stroke="#b8943c"
        strokeWidth="0.4"
      />
      <rect x="150" y="90" width="7" height="75" fill="#e8dcc0" opacity="0.6" />
      <rect x="203" y="90" width="7" height="75" fill="#e8dcc0" opacity="0.6" />
      <polygon
        points="93,90 267,90 180,58"
        fill="#e8dcc0"
        stroke="#c9a84c"
        strokeWidth="0.8"
      />
      <rect
        x="158"
        y="133"
        width="44"
        height="32"
        rx="22"
        fill="#fff"
        stroke="#c9a84c"
        strokeWidth="0.5"
      />
      <rect
        x="120"
        y="102"
        width="24"
        height="18"
        rx="2"
        fill="#fffbe6"
        stroke="#c9a84c"
        strokeWidth="0.4"
        opacity="0.9"
      />
      <rect
        x="216"
        y="102"
        width="24"
        height="18"
        rx="2"
        fill="#fffbe6"
        stroke="#c9a84c"
        strokeWidth="0.4"
        opacity="0.9"
      />
      <path
        d="M60,82 Q110,66 150,76 Q180,68 210,76 Q250,66 300,82"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="0.6"
        opacity="0.7"
      />
      {[74, 110, 150, 180, 210, 250, 286].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={[79, 70, 75, 69, 75, 69, 79][i]}
          r="2.8"
          fill="#c9a84c"
          opacity="0.8"
        />
      ))}
      <rect x="28" y="110" width="7" height="55" fill="#8a6a30" />
      <ellipse cx="31" cy="98" rx="20" ry="32" fill="#5a8c30" />
      <ellipse cx="31" cy="88" rx="13" ry="22" fill="#6aaa38" />
      <rect x="55" y="118" width="6" height="47" fill="#8a6a30" />
      <ellipse cx="58" cy="108" rx="16" ry="26" fill="#5a8c30" />
      <ellipse cx="58" cy="100" rx="10" ry="18" fill="#6aaa38" />
      <rect x="325" y="110" width="7" height="55" fill="#8a6a30" />
      <ellipse cx="329" cy="98" rx="20" ry="32" fill="#5a8c30" />
      <ellipse cx="329" cy="88" rx="13" ry="22" fill="#6aaa38" />
      <rect x="299" y="118" width="6" height="47" fill="#8a6a30" />
      <ellipse cx="302" cy="108" rx="16" ry="26" fill="#5a8c30" />
      <ellipse cx="302" cy="100" rx="10" ry="18" fill="#6aaa38" />
      <circle cx="18" cy="148" r="5" fill="#d4537e" opacity="0.9" />
      <circle cx="32" cy="155" r="4" fill="#c0392b" opacity="0.8" />
      <circle cx="10" cy="155" r="3.5" fill="#e8a0b8" opacity="0.8" />
      <circle cx="44" cy="150" r="4" fill="#d4537e" opacity="0.7" />
      <circle cx="342" cy="148" r="5" fill="#d4537e" opacity="0.9" />
      <circle cx="328" cy="155" r="4" fill="#c0392b" opacity="0.8" />
      <circle cx="350" cy="155" r="3.5" fill="#e8a0b8" opacity="0.8" />
      <circle cx="316" cy="150" r="4" fill="#d4537e" opacity="0.7" />
      <ellipse cx="96" cy="162" rx="22" ry="11" fill="#4a7828" />
      <ellipse cx="130" cy="162" rx="18" ry="10" fill="#5a8c30" />
      <ellipse cx="230" cy="162" rx="18" ry="10" fill="#5a8c30" />
      <ellipse cx="264" cy="162" rx="22" ry="11" fill="#4a7828" />
      <path
        d="M160,175 Q180,165 200,175 L204,195 Q180,186 156,195 Z"
        fill="#e0d4b0"
      />
      <text
        x="180"
        y="85"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="9"
        fill="#c9a84c"
      >
        Raustic Garden
      </text>
    </svg>
  );
}

export default function InvitationPage() {
  const footerRef = useRef(null);
  const footerVisible = useReveal(footerRef);

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        fontFamily: "'Cormorant Garamond', serif",
        overflowX: "hidden",
      }}
    >
      <link rel="stylesheet" href={FONTS_URL} />

      <style>{`
        @keyframes breathe { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        .rsvp-btn:hover { background: rgba(201,168,76,0.08) !important; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 520,
          margin: "0 auto",
          background: "#fff",
          paddingBottom: 60,
        }}
      >
        {/* ── HERO ── */}
        <div style={s.hero}>
          {["tl", "tr", "bl", "br"].map((pos) => (
            <div
              key={pos}
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                top: pos.includes("t") ? 20 : undefined,
                bottom: pos.includes("b") ? 20 : undefined,
                left: pos.includes("l") ? 20 : undefined,
                right: pos.includes("r") ? 20 : undefined,
                borderColor: "#c9a84c",
                borderStyle: "solid",
                borderWidth:
                  pos === "tl"
                    ? "1px 0 0 1px"
                    : pos === "tr"
                      ? "1px 1px 0 0"
                      : pos === "bl"
                        ? "0 0 1px 1px"
                        : "0 1px 1px 0",
              }}
            />
          ))}
          <div style={s.monogram}>A &amp; S</div>
          <div style={s.monoLine} />
          <div style={s.gardenWrap}>
            <GardenIllustration />
          </div>
          <div style={s.heroNames}>
            Abdallah
            <span style={s.heroAmp}>&amp;</span>
            Sohaila
          </div>
          <div style={s.heroDiv} />
          <div style={s.heroTagline}>request the pleasure of your company</div>
        </div>

        {/* ── DATE + COUNTDOWN ── */}
        <Section id="date-section">
          <span style={s.ornament}>✦ &nbsp; ✦ &nbsp; ✦</span>
          <div style={s.dateDay}>Friday</div>
          <div style={s.dateNum}>12</div>
          <div style={s.dateMonth}>June</div>
          <div style={s.dateYear}>2026</div>
          <div style={s.dateNote}>
            We kindly invite you to join us early
            <br />
            to enjoy every beautiful moment together.
          </div>
          <Countdown />
        </Section>

        <OrnDivider />

        {/* ── VENUE + MAP ── */}
        <Section id="venue-section">
          <span style={s.ornament}>✦</span>
          <div style={s.sectionTitle}>The celebration will be held at</div>
          <div style={s.venueName}>Rustic Garden Venue</div>
          <div style={s.venueAddr}>Cairo, Egypt</div>
          <div style={s.mapFrame}>
            <iframe
              title="Rustic Garden Venue"
              src="https://maps.google.com/maps?q=Raustic+Garden+Venue+Cairo&output=embed&z=15"
              style={{ width: "100%", height: "100%", border: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/GnY9ujeKYXnW3rcN9"
            target="_blank"
            rel="noopener noreferrer"
            style={s.directionsLink}
          >
            Open in Google Maps
          </a>
        </Section>

        <OrnDivider />

        {/* ── RSVP ── */}
        <Section id="rsvp-section">
          <span style={s.ornament}>✦</span>
          <div style={s.rsvpTitle}>Will you join us?</div>
          <div style={s.rsvpSub}>
            Kindly confirm your attendance by reaching out to us
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <a
              className="rsvp-btn"
              href="mailto:sohilazedan42@gmail.com?subject=RSVP%20-%20Abdallah%20%26%20Sohaila%20Engagement&body=I%20am%20happy%20to%20confirm%20my%20attendance.%20Congratulations!"
              style={s.rsvpBtn}
            >
              ✉ &nbsp; RSVP via Sohaila
            </a>
            <a
              className="rsvp-btn"
              href="mailto:abdallahmamdouh.eng@gmail.com?subject=RSVP%20-%20Abdallah%20%26%20Sohaila%20Engagement&body=I%20am%20happy%20to%20confirm%20my%20attendance.%20Congratulations!"
              style={s.rsvpBtn}
            >
              ✉ &nbsp; RSVP via Abdallah
            </a>
          </div>
        </Section>

        <OrnDivider />

        {/* ── MESSAGE ── */}
        <Section id="message-section">
          <span style={s.ornament}>✦</span>
          <div style={s.messageTitle}>A note from our hearts</div>
          <div style={s.messageBody}>
            To our dearest family and friends,
            <br />
            <br />
            We are overflowing with joy as we prepare to share this milestone
            with the people we love most. This engagement is not simply a
            promise between two hearts — it is a moment we have dreamed of
            celebrating surrounded by all of you.
            <br />
            <br />
            Your presence would mean everything to us. We hope you feel the
            warmth of our love the moment you arrive, and we hope this evening
            becomes a memory you carry with you just as tenderly as we will.
            <br />
            <br />
            We are so grateful for the love and support that has always
            surrounded us, and we truly cannot imagine this moment without you
            by our side.
            <br />
            <br />
            Please come, celebrate, and let us create something beautiful
            together.
          </div>
          <div style={s.messageSig}>
            With all our love,
            <br />
            Abdallah &amp; Sohaila
          </div>
          <div style={s.messageSigSub}>We cannot wait to see you</div>
        </Section>

        <OrnDivider />

        {/* ── FOOTER ── */}
        <div
          ref={footerRef}
          style={{
            textAlign: "center",
            padding: "24px 24px 48px",
            background: "#fff",
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={s.monogram}>A &amp; S</div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              color: "#c9a84c",
              opacity: 0.6,
              textTransform: "uppercase",
              marginTop: 4,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            12 · 06 · 2026
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  hero: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 28px",
    background: "#fff",
    position: "relative",
  },
  monogram: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 80,
    color: "#c9a84c",
    lineHeight: 1,
    marginBottom: 4,
  },
  monoLine: {
    width: 80,
    height: 0.5,
    background: "#c9a84c",
    opacity: 0.5,
    margin: "0 auto 32px",
  },
  gardenWrap: {
    width: "100%",
    maxWidth: 360,
    margin: "0 auto 32px",
    border: "0.5px solid rgba(201,168,76,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  heroNames: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 52,
    color: "#2a1a08",
    lineHeight: 1.15,
    textAlign: "center",
  },
  heroAmp: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 36,
    color: "#c9a84c",
    display: "block",
    margin: "2px 0",
  },
  heroDiv: {
    width: 60,
    height: 0.5,
    background: "#c9a84c",
    opacity: 0.5,
    margin: "20px auto",
  },
  heroTagline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: 15,
    color: "#8a7050",
    letterSpacing: 1,
    textAlign: "center",
  },
  ornament: {
    color: "#c9a84c",
    fontSize: 14,
    letterSpacing: 6,
    marginBottom: 20,
    display: "block",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 13,
    letterSpacing: 6,
    color: "#8a7050",
    textTransform: "uppercase",
    marginBottom: 24,
    fontWeight: 400,
    fontStyle: "italic",
  },
  dateDay: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 32,
    color: "#8a7050",
    marginBottom: 4,
  },
  dateNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 88,
    color: "#c9a84c",
    lineHeight: 1,
    fontWeight: 400,
  },
  dateMonth: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    color: "#2a1a08",
    letterSpacing: 8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  dateYear: {
    fontSize: 14,
    letterSpacing: 4,
    color: "#8a7050",
    fontStyle: "italic",
  },
  dateNote: {
    marginTop: 20,
    fontSize: 15,
    color: "#8a7050",
    fontStyle: "italic",
    lineHeight: 1.8,
    fontFamily: "'Cormorant Garamond', serif",
  },
  venueName: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 38,
    color: "#2a1a08",
    marginBottom: 6,
  },
  venueAddr: {
    fontSize: 13,
    letterSpacing: 2,
    color: "#8a7050",
    textTransform: "uppercase",
    marginBottom: 20,
    fontStyle: "italic",
  },
  mapFrame: {
    width: "100%",
    height: 240,
    border: "0.5px solid rgba(201,168,76,0.4)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 12,
  },
  directionsLink: {
    display: "inline-block",
    marginTop: 14,
    fontSize: 12,
    letterSpacing: 3,
    color: "#c9a84c",
    textTransform: "uppercase",
    textDecoration: "none",
    borderBottom: "0.5px solid rgba(201,168,76,0.4)",
    paddingBottom: 2,
    fontFamily: "'Cormorant Garamond', serif",
  },
  rsvpTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 38,
    color: "#2a1a08",
    marginBottom: 8,
  },
  rsvpSub: {
    fontSize: 14,
    color: "#8a7050",
    fontStyle: "italic",
    marginBottom: 24,
    fontFamily: "'Cormorant Garamond', serif",
  },
  rsvpBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "13px 32px",
    border: "1px solid #c9a84c",
    color: "#2a1a08",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    letterSpacing: 2,
    cursor: "pointer",
    background: "transparent",
    borderRadius: 1,
    transition: "all 0.3s",
    textDecoration: "none",
    fontStyle: "italic",
  },
  messageTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 44,
    color: "#2a1a08",
    marginBottom: 24,
  },
  messageBody: {
    fontSize: 17,
    lineHeight: 2,
    color: "#5a4030",
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "'Cormorant Garamond', serif",
  },
  messageSig: {
    marginTop: 32,
    fontFamily: "'Great Vibes', cursive",
    fontSize: 42,
    color: "#c9a84c",
    lineHeight: 1.3,
  },
  messageSigSub: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#8a7050",
    textTransform: "uppercase",
    marginTop: 6,
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
  },
};
