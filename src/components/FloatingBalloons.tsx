import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingBalloon {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const BALLOON_COLORS = [
  "hsl(340, 82%, 62%)",
  "hsl(190, 80%, 70%)",
  "hsl(45, 95%, 65%)",
  "hsl(150, 60%, 60%)",
  "hsl(280, 70%, 72%)",
  "hsl(25, 95%, 65%)",
];

export const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);

  useEffect(() => {
    const spawn = () => {
      const newBalloon: FloatingBalloon = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90 + 5,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        size: Math.random() * 20 + 30,
        duration: Math.random() * 6 + 8,
        delay: 0,
      };
      setBalloons((prev) => [...prev.slice(-8), newBalloon]);
    };

    const interval = setInterval(spawn, 3000);
    spawn();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: "110vh", x: `${b.x}vw`, opacity: 0.6 }}
            animate={{ y: "-10vh", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: b.duration, ease: "easeOut" }}
            onAnimationComplete={() => {
              setBalloons((prev) => prev.filter((p) => p.id !== b.id));
            }}
            className="absolute"
          >
            <svg width={b.size} height={b.size * 1.3} viewBox="0 0 40 52">
              <ellipse cx="20" cy="18" rx="18" ry="18" fill={b.color} opacity="0.5" />
              <path d="M20 36 L20 52" stroke={b.color} strokeWidth="1" opacity="0.3" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
