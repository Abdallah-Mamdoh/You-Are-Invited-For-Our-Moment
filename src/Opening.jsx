import { useState } from "react";
import InvitationPage from "./InvitationPage";
import envelopeImg from "./envelope.png";

export default function OpeningPage() {
  const [tapped, setTapped] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    setTimeout(() => setShowInvite(true), 700);
  };

  if (showInvite) {
    return (
      <div style={{ animation: "fadeIn 0.9s ease forwards" }}>
        <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
        <InvitationPage />
      </div>
    );
  }

  return (
    <div
      onClick={handleTap}
      style={{
        width: "100vw",
        height: "100dvh",
        cursor: "pointer",
        userSelect: "none",
        overflow: "hidden",
        animation: tapped ? "fadeOut 0.7s ease forwards" : "none",
      }}
    >
      <style>{`@keyframes fadeOut{from{opacity:1}to{opacity:0}}`}</style>
      <img
        src={envelopeImg}
        alt="envelope"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
}
