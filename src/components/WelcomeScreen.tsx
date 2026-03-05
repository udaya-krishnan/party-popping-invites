import { motion } from "framer-motion";
import { ConfettiBurst } from "./ConfettiBurst";
import { useState } from "react";
import birthdayHero from "@/assets/birthday-hero.jpg";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background overflow-hidden"
      animate={isExiting ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ConfettiBurst active={isExiting} />

      {/* Decorative balloons */}
      {["birthday-pink", "birthday-blue", "birthday-yellow", "birthday-purple", "birthday-green"].map(
        (color, i) => (
          <motion.div
            key={color}
            className="absolute"
            style={{
              left: `${15 + i * 18}%`,
              bottom: isExiting ? undefined : "10%",
            }}
            initial={{ y: 0 }}
            animate={
              isExiting
                ? { y: -1000, transition: { duration: 2, delay: i * 0.1 } }
                : { y: [0, -15, 0], transition: { duration: 3 + i * 0.5, repeat: Infinity } }
            }
          >
            <svg width="50" height="70" viewBox="0 0 50 70">
              <ellipse
                cx="25"
                cy="22"
                rx="22"
                ry="22"
                className={`fill-${color.replace("birthday-", "birthday-")}`}
                style={{
                  fill: `hsl(var(--${color}))`,
                }}
              />
              <path d="M25 44 L25 68" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            </svg>
          </motion.div>
        )
      )}

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={birthdayHero}
          alt="Birthday celebration"
          className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full object-cover mb-6 border-4 border-birthday-yellow"
          style={{ boxShadow: "var(--shadow-playful)" }}
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.h1
          className="text-4xl md:text-6xl font-display font-bold text-gradient-party mb-3"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          You're Invited! 🎉
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-body mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A magical celebration awaits you!
        </motion.p>

        <motion.button
          className="btn-party text-base md:text-xl"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Tap to Enter the Birthday Party 🎈
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
