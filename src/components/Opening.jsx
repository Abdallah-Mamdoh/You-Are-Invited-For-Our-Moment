import { useState } from "react";
import InvitationPage from "./InvitationPage";
import envelopeImg from "./envelope.png";

export default function Opening() {
  const [tapped, setTapped] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    setTimeout(() => setShowInvite(true), 700);
  };

  if (showInvite) {
    return <InvitationPage />;
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
        opacity: tapped ? 0 : 1,
        transition: "opacity 0.7s ease",
      }}
    >
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
