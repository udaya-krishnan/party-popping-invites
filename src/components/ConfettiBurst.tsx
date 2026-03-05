import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  rotation: number;
}

const COLORS = [
  "hsl(340, 82%, 62%)",
  "hsl(190, 80%, 70%)",
  "hsl(45, 95%, 65%)",
  "hsl(150, 60%, 60%)",
  "hsl(280, 70%, 72%)",
  "hsl(25, 95%, 65%)",
];

export const ConfettiBurst = ({ active }: { active: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 720,
      }));
      setParticles(newParticles);
      const timer = setTimeout(() => setParticles([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", opacity: 0, rotate: p.rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 + Math.random() * 2, delay: p.delay, ease: "easeIn" }}
            className="absolute"
            style={{
              width: p.size,
              height: p.size * (Math.random() > 0.5 ? 1 : 2.5),
              backgroundColor: p.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
