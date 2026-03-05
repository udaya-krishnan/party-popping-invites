import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfettiBurst } from "./ConfettiBurst";

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  isGolden: boolean;
  message: string;
  popped: boolean;
  size: number;
  floatDuration: number;
}

const MESSAGES = [
  "Almost there! 🎈",
  "Keep popping! 💥",
  "Try another one! ✨",
  "Not this one! 🎊",
  "So close! 🌟",
  "You're doing great! 🎶",
  "Keep going! 🎁",
  "Nope, try again! 🎪",
];

const COLORS = [
  { bg: "hsl(340, 82%, 62%)", highlight: "hsl(340, 82%, 75%)" },
  { bg: "hsl(190, 80%, 70%)", highlight: "hsl(190, 80%, 82%)" },
  { bg: "hsl(280, 70%, 72%)", highlight: "hsl(280, 70%, 84%)" },
  { bg: "hsl(150, 60%, 60%)", highlight: "hsl(150, 60%, 75%)" },
  { bg: "hsl(25, 95%, 65%)", highlight: "hsl(25, 95%, 78%)" },
];

const GOLDEN = { bg: "hsl(45, 90%, 55%)", highlight: "hsl(45, 90%, 70%)" };

interface BalloonGameProps {
  onGoldenFound: () => void;
}

export const BalloonGame = ({ onGoldenFound }: BalloonGameProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [popMessage, setPopMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [poppedCount, setPoppedCount] = useState(0);

  useEffect(() => {
    const goldenIndex = Math.floor(Math.random() * 12) + 5; // golden appears after at least 5 balloons
    const generated: Balloon[] = Array.from({ length: 18 }, (_, i) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        id: i,
        x: 8 + Math.random() * 75,
        y: 10 + Math.random() * 70,
        color: i === goldenIndex ? GOLDEN.bg : color.bg,
        isGolden: i === goldenIndex,
        message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        popped: false,
        size: 55 + Math.random() * 25,
        floatDuration: 3 + Math.random() * 3,
      };
    });
    setBalloons(generated);
  }, []);

  const popBalloon = useCallback(
    (id: number) => {
      const balloon = balloons.find((b) => b.id === id);
      if (!balloon || balloon.popped) return;

      setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)));
      setPoppedCount((c) => c + 1);

      if (balloon.isGolden) {
        setShowConfetti(true);
        setTimeout(() => onGoldenFound(), 1200);
      } else {
        setPopMessage(balloon.message);
        setShowConfetti(true);
        setTimeout(() => {
          setPopMessage(null);
          setShowConfetti(false);
        }, 1500);
      }
    },
    [balloons, onGoldenFound]
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <ConfettiBurst active={showConfetti} />

      <motion.div
        className="text-center pt-8 pb-4 px-4 relative z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-2">
          🎈 Pop the Balloons!
        </h2>
        <p className="text-sm md:text-base text-muted-foreground font-body">
          Find the golden balloon to reveal the party details!
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Popped: {poppedCount} / {balloons.length}
        </p>
      </motion.div>

      {/* Pop message */}
      <AnimatePresence>
        {popMessage && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30
                       card-birthday text-center px-8 py-4"
          >
            <p className="text-xl md:text-2xl font-display font-bold text-foreground">{popMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balloons */}
      <div className="relative w-full" style={{ height: "calc(100vh - 140px)" }}>
        <AnimatePresence>
          {balloons
            .filter((b) => !b.popped)
            .map((balloon) => (
              <motion.button
                key={balloon.id}
                className="absolute cursor-pointer touch-manipulation"
                style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -12, 0],
                  x: [0, 5, -5, 0],
                }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{
                  scale: { duration: 0.4, delay: balloon.id * 0.05 },
                  y: { duration: balloon.floatDuration, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: balloon.floatDuration * 1.3, repeat: Infinity, ease: "easeInOut" },
                }}
                onClick={() => popBalloon(balloon.id)}
                whileTap={{ scale: 0.8 }}
              >
                <svg width={balloon.size} height={balloon.size * 1.3} viewBox="0 0 60 78">
                  <defs>
                    <radialGradient id={`grad-${balloon.id}`} cx="35%" cy="30%">
                      <stop
                        offset="0%"
                        stopColor={balloon.isGolden ? GOLDEN.highlight : "white"}
                        stopOpacity="0.6"
                      />
                      <stop offset="100%" stopColor={balloon.color} />
                    </radialGradient>
                  </defs>
                  <ellipse cx="30" cy="26" rx="26" ry="26" fill={`url(#grad-${balloon.id})`} />
                  <polygon points="30,52 26,56 34,56" fill={balloon.color} />
                  <path
                    d="M30 56 Q28 65 30 76"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="1.2"
                  />
                  {balloon.isGolden && (
                    <text x="30" y="30" textAnchor="middle" fontSize="16" fill="white">
                      ⭐
                    </text>
                  )}
                </svg>
              </motion.button>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
