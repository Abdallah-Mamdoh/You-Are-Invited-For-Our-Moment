import { useEffect, useRef, useState } from "react";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap";

/* ── Hook: reveal on scroll ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Section wrapper with scroll reveal ── */
function Section({ children, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: "56px 32px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Gold ornament divider ── */
function Divider() {
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
      <div style={{ flex: 1, height: 0.5, background: "rgba(201,168,76,0.28)" }} />
      <div
        style={{
          width: 6,
          height: 6,
          background: "#c9a84c",
          transform: "rotate(45deg)",
          opacity: 0.55,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, height: 0.5, background: "rgba(201,168,76,0.28)" }} />
    </div>
  );
}

/* ── Live countdown ── */
function Countdown() {
  const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const target = new Date("2026-06-10T20:00:00");
    const pad = (n) => String(Math.floor(n)).padStart(2, "0");
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTime({ d: "00", h: "00", m: "00", s: "00" });
        return;
      }
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
    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
      {blocks.map((b, i) => (
        <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#2a1a06", fontWeight: 400, lineHeight: 1 }}>
              {b.val}
            </div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#8a7050", textTransform: "uppercase", marginTop: 4, fontFamily: "'Cormorant Garamond', serif" }}>
              {b.label}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#c9a84c", paddingTop: 4 }}>·</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Pink colour palette circles ── */
const PINK_PALETTE = [
  { color: "#FDE4EC", name: "Baby Pink" },
  { color: "#F8BBD0", name: "Soft Pink" },
  { color: "#F48FB1", name: "Classic Pink" },
  { color: "#EC407A", name: "Rose Pink" },
  { color: "#C2185B", name: "Deep Rose" },
  { color: "#880E4F", name: "Burgundy" },
];

function PinkPalette() {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: "40px 32px 56px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
      }}
    >
      <span style={t.ornament}>✦</span>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, letterSpacing: 6, color: "#8a7050", textTransform: "uppercase", marginBottom: 28, fontStyle: "italic" }}>
        Girls Colour Palette
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {PINK_PALETTE.map((p) => (
          <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 62, height: 62, borderRadius: "50%", background: p.color, border: "1px solid rgba(201,168,76,0.25)", boxShadow: `0 2px 12px ${p.color}55` }} />
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: "#8a7050", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Garden background ── */
function GardenBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 0 }}>
      <img src="/venue.png" alt="venue" style={{ width: "90%", height: "100%", objectFit: "cover", borderRadius: "6px" }} />
    </div>
  );
}

/* ── Playlist ── */
const SONGS = [
  { title: "A Thousand Years", artist: "Christina Perri", img: "https://picsum.photos/seed/song1/54/54", link: "https://www.anghami.com/song/1000-years-christina-perri" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", img: "https://picsum.photos/seed/song2/54/54", link: "https://www.anghami.com/song/cant-help-falling-in-love" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", img: "https://picsum.photos/seed/song3/54/54", link: "https://www.anghami.com/song/thinking-out-loud-ed-sheeran" },
  { title: "Leil Eid", artist: "Amr Diab", img: "https://picsum.photos/seed/song4/54/54", link: "https://www.anghami.com/song/leil-eid-amr-diab" },
  { title: "Perfect", artist: "Ed Sheeran", img: "https://picsum.photos/seed/song5/54/54", link: "https://www.anghami.com/song/perfect-ed-sheeran" },
];

function PlaylistSection() {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: "56px 32px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
      }}
    >
      <span style={t.ornament}>✦</span>
      <div style={t.msgTitle}>Our Playlist</div>
      <div style={t.secTitle}>The songs of our day</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {SONGS.map((song) => <SongCard key={song.title} song={song} />)}
      </div>
    </div>
  );
}

function SongCard({ song }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 16,
        border: "0.5px solid rgba(201,168,76,0.3)", borderRadius: 4,
        padding: "14px 16px", textAlign: "left", transition: "box-shadow 0.3s",
        boxShadow: hovered ? "0 6px 28px rgba(201,168,76,0.13)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: 54, height: 54, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
        <img src={song.img} alt={song.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#2a1a06", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {song.title}
        </div>
        <div style={{ fontSize: 12, color: "#8a7050", fontStyle: "italic", marginTop: 2 }}>{song.artist}</div>
      </div>
      <a
        href={song.link} target="_blank" rel="noopener noreferrer"
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "1px solid #c9a84c",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, textDecoration: "none", transition: "transform 0.2s",
          transform: btnHovered ? "scale(1.1)" : "scale(1)",
        }}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
      >
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M1 1l10 6L1 13V1z" fill="#c9a84c" />
        </svg>
      </a>
    </div>
  );
}

/* ── Main component ── */
export default function InvitationPage() {
  const [footerRef, footerVisible] = useReveal();

  return (
    <>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        .rsvp-btn:hover { background: rgba(201,168,76,0.08) !important; }
      `}</style>

      <div style={{ width: "100%", background: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>
        <div style={{ width: "100%", maxWidth: 520, margin: "0 auto", background: "#fff", paddingBottom: 60 }}>

          {/* ── HERO ── */}
          <div style={s.hero}>
            {[
              { top: 18, left: 18, borderWidth: "1px 0 0 1px" },
              { top: 18, right: 18, borderWidth: "1px 1px 0 0" },
              { bottom: 18, left: 18, borderWidth: "0 0 1px 1px" },
              { bottom: 18, right: 18, borderWidth: "0 1px 1px 0" },
            ].map((style, i) => (
              <div key={i} style={{ position: "absolute", width: 36, height: 36, borderColor: "#c9a84c", borderStyle: "solid", zIndex: 3, ...style }} />
            ))}
            <GardenBackground />
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,252,245,0.62)", zIndex: 1 }} />
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <div style={s.monogram}>A &amp; S</div>
              <div style={s.monoLine} />
              <div style={s.heroNames}>
                Abdallah
                <span style={s.heroAmp}>&amp;</span>
                Sohaila
              </div>
              <div style={s.heroDiv} />
              <div style={s.heroTagline}>request the pleasure of your company</div>
            </div>
          </div>

          {/* ── DATE + COUNTDOWN ── */}
          <Section>
            <span style={t.ornament}>✦ &nbsp; ✦ &nbsp; ✦</span>
            <div style={t.dateDay}>Wednesday</div>
            <div style={t.dateNum}>10</div>
            <div style={t.dateMonth}>June</div>
            <div style={t.dateYear}>2026</div>
            <div style={t.dateNote}>We kindly invite you to join us early<br />to enjoy every beautiful moment together.</div>
            <Countdown />
          </Section>

          <Divider />

          {/* ── PINK PALETTE ── */}
          <PinkPalette />

          <Divider />

          {/* ── VENUE + MAP ── */}
          <Section>
            <span style={t.ornament}>✦</span>
            <div style={t.secTitle}>The celebration will be held at</div>
            <div style={t.venueName}>Rustic Garden Venue</div>
            <div style={t.venueAddr}>Cairo, Egypt</div>
            <div style={t.mapFrame}>
              <iframe
                title="Rustic Garden Venue"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.32708323104!2d31.532122574432236!3d30.227747809864614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145805005be4bc6f%3A0xe260fc319e872e15!2srustic%20Garden!5e0!3m2!1sen!2seg!4v1776070616519!5m2!1sen!2seg"
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href="https://maps.app.goo.gl/GnY9ujeKYXnW3rcN9" target="_blank" rel="noopener noreferrer" style={t.dirLink}>
              Open in Google Maps
            </a>
          </Section>

          <Divider />

          {/* ── RSVP ── */}
          <Section>
            <span style={t.ornament}>✦</span>
            <div style={t.rsvpTitle}>Will you join us?</div>
            <div style={t.rsvpSub}>Kindly confirm your attendance by reaching out to us</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <a
                href="https://chat.whatsapp.com/GEbFhm3vZRLCcK1LOnkB0X?mode=gi_t"
                style={{ padding: "12px 24px", borderRadius: "30px", background: "#111", color: "#fff", textDecoration: "none", fontSize: "16px", fontWeight: "500", letterSpacing: "1px", display: "inline-block", transition: "0.3s ease" }}
                onMouseOver={(e) => (e.target.style.opacity = 0.8)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                Join Our WhatsApp Group
              </a>
            </div>
          </Section>

          <Divider />

          {/* ── PLAYLIST ── */}
          <PlaylistSection />

          <Divider />

          {/* ── MESSAGE ── */}
          <Section>
            <span style={t.ornament}>✦</span>
            <div style={t.msgTitle}>A note from our hearts</div>
            <div style={t.msgBody}>
              To our dearest family and friends,<br /><br />
              We are overflowing with joy as we prepare to share this milestone with the people we love most. This engagement is not simply a promise between two hearts — it is a moment we have dreamed of celebrating surrounded by all of you.<br /><br />
              Your presence would mean everything to us. We hope you feel the warmth of our love the moment you arrive, and we hope this evening becomes a memory you carry with you just as tenderly as we will.<br /><br />
              We are so grateful for the love and support that has always surrounded us, and we truly cannot imagine this moment without you by our side.<br /><br />
              Please come, celebrate, and let us create something beautiful together.
            </div>
            <div style={t.msgSig}>With all our love,<br />Abdallah &amp; Sohaila</div>
            <div style={t.msgSigSub}>We cannot wait to see you</div>
          </Section>

          <Divider />

          {/* ── FOOTER ── */}
          <div
            ref={footerRef}
            style={{
              textAlign: "center", padding: "22px 24px 48px", background: "#fff",
              opacity: footerVisible ? 1 : 0,
              transform: footerVisible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.85s ease, transform 0.85s ease",
            }}
          >
            <div style={s.monogram}>A &amp; S</div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#c9a84c", opacity: 0.55, textTransform: "uppercase", marginTop: 4 }}>
              10 · 06 · 2026
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ── Styles ── */
const s = {
  hero: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 28px",
    position: "relative",
    overflow: "hidden",
    background: "#fdf8ef",
  },
  monogram: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 78,
    color: "#b8860b",
    lineHeight: 1,
    textShadow: "1px 2px 0 rgba(180,120,0,0.15)",
    marginBottom: 4,
  },
  monoLine: {
    width: 70,
    height: 0.5,
    background: "#c9a84c",
    opacity: 0.6,
    margin: "6px auto 28px",
  },
  heroNames: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 50,
    color: "#2a1a06",
    lineHeight: 1.2,
    textAlign: "center",
  },
  heroAmp: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 34,
    color: "#b8860b",
    display: "block",
    margin: "2px 0",
  },
  heroDiv: {
    width: 55,
    height: 0.5,
    background: "#c9a84c",
    opacity: 0.5,
    margin: "18px auto",
  },
  heroTagline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: 15,
    color: "#6a5030",
    letterSpacing: 1,
    textAlign: "center",
  },
};

const t = {
  ornament: { color: "#c9a84c", fontSize: 13, letterSpacing: 6, marginBottom: 18, display: "block" },
  secTitle: { fontFamily: "'Playfair Display', serif", fontSize: 12, letterSpacing: 6, color: "#8a7050", textTransform: "uppercase", marginBottom: 22, fontWeight: 400, fontStyle: "italic" },
  dateDay: { fontFamily: "'Great Vibes', cursive", fontSize: 30, color: "#8a7050", marginBottom: 2 },
  dateNum: { fontFamily: "'Playfair Display', serif", fontSize: 84, color: "#c9a84c", lineHeight: 1, fontWeight: 400 },
  dateMonth: { fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#2a1a06", letterSpacing: 8, textTransform: "uppercase", marginBottom: 4 },
  dateYear: { fontSize: 14, letterSpacing: 4, color: "#8a7050", fontStyle: "italic" },
  dateNote: { marginTop: 18, fontSize: 15, color: "#8a7050", fontStyle: "italic", lineHeight: 1.9 },
  venueName: { fontFamily: "'Great Vibes', cursive", fontSize: 38, color: "#2a1a06", marginBottom: 6 },
  venueAddr: { fontSize: 13, letterSpacing: 2, color: "#8a7050", textTransform: "uppercase", marginBottom: 18, fontStyle: "italic" },
  mapFrame: { width: "100%", height: 230, border: "0.5px solid rgba(201,168,76,0.4)", borderRadius: 2, overflow: "hidden", marginTop: 10 },
  dirLink: { display: "inline-block", marginTop: 13, fontSize: 12, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", textDecoration: "none", borderBottom: "0.5px solid rgba(201,168,76,0.4)", paddingBottom: 2 },
  rsvpTitle: { fontFamily: "'Great Vibes', cursive", fontSize: 38, color: "#2a1a06", marginBottom: 8 },
  rsvpSub: { fontSize: 14, color: "#8a7050", fontStyle: "italic", marginBottom: 22 },
  rsvpBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", border: "1px solid #c9a84c", color: "#2a1a06", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: 2, cursor: "pointer", background: "transparent", borderRadius: 1, transition: "background 0.3s", textDecoration: "none", fontStyle: "italic" },
  msgTitle: { fontFamily: "'Great Vibes', cursive", fontSize: 42, color: "#2a1a06", marginBottom: 22 },
  msgBody: { fontSize: 16, lineHeight: 2, color: "#5a4030", fontStyle: "italic", textAlign: "center" },
  msgSig: { marginTop: 30, fontFamily: "'Great Vibes', cursive", fontSize: 40, color: "#c9a84c", lineHeight: 1.3 },
  msgSigSub: { fontSize: 11, letterSpacing: 3, color: "#8a7050", textTransform: "uppercase", marginTop: 6, fontStyle: "italic" },
};
