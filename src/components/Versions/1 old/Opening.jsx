import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InvitationPage from "./InvitationPage";

export default function Opening() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* CLICKABLE ENVELOPE */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={() => setOpen(true)}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/envelope.png"
              alt="Envelope"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* OPENING ANIMATION */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-10">
        {/* TOP HALF */}
        <motion.div
          className="h-1/2 w-full overflow-hidden"
          animate={open ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src="/envelope.png"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* BOTTOM HALF */}
        <motion.div
          className="h-1/2 w-full overflow-hidden"
          animate={open ? { y: "100%" } : { y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src="/envelope.png"
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </motion.div>
      </div>

      {/* INVITATION CONTENT */}
      {open && (
        <motion.div
          className="absolute inset-0 z-30 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <InvitationPage />
        </motion.div>
      )}
    </div>
  );
}
