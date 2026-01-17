import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/614861261_1188486870141866_8515750531569483211_n_1768639878245.png";
import { useEffect, useState } from "react";

interface EntrancePageProps {
  onComplete: () => void;
}

export function EntrancePage({ onComplete }: EntrancePageProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background Accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "premium" feel
              }}
              className="relative z-10"
            >
              <img
                src={logo}
                alt="Fast Signs & Wraps"
                className="h-40 md:h-56 w-auto drop-shadow-[0_0_30px_rgba(0,196,255,0.3)]"
              />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="mt-12 w-48 h-1 bg-primary/20 rounded-full overflow-hidden origin-left relative"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
              />
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-4 text-xs tracking-[0.3em] uppercase font-display text-white"
            >
              Loading Excellence
            </motion.p>
          </div>

          {/* Diagonal Lines */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: "repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 100px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
