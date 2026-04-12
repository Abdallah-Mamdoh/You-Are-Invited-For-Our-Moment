import { useState } from "react";
import Opening from "./Opening";
import InvitationPage from "./InvitationPage";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ position: "fixed", inset: 0, zIndex: 50 }}
          >
            <Opening onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <InvitationPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
