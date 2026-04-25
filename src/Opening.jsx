import { useState, useEffect } from "react";
import envelopeImg from "./envelope.png";

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
