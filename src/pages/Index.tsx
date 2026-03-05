import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BalloonGame } from "@/components/BalloonGame";
import { InvitationCard } from "@/components/InvitationCard";
import { GallerySection } from "@/components/GallerySection";
import { PartyDetailsSection } from "@/components/PartyDetailsSection";
import { MusicToggle } from "@/components/MusicToggle";
import { FloatingBalloons } from "@/components/FloatingBalloons";
import { ConfettiBurst } from "@/components/ConfettiBurst";

type Phase = "welcome" | "game" | "revealed";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [isPlaying, setIsPlaying] = useState(false);
  const [celebrationConfetti, setCelebrationConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/10/30/audio_f5d205caee.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleEnterParty = useCallback(() => {
    setPhase("game");
    // Auto-play music
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/10/30/audio_f5d205caee.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const handleGoldenFound = useCallback(() => {
    setCelebrationConfetti(true);
    setTimeout(() => {
      setPhase("revealed");
      setTimeout(() => setCelebrationConfetti(false), 3000);
    }, 800);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <FloatingBalloons />

      {phase !== "welcome" && (
        <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
      )}

      <ConfettiBurst active={celebrationConfetti} />

      <AnimatePresence mode="wait">
        {phase === "welcome" && (
          <WelcomeScreen key="welcome" onEnter={handleEnterParty} />
        )}

        {phase === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BalloonGame onGoldenFound={handleGoldenFound} />
          </motion.div>
        )}

        {phase === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-16"
          >
            <InvitationCard />
            <GallerySection />
            <PartyDetailsSection />

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-10 px-4"
            >
              <p className="text-2xl md:text-3xl font-display font-bold text-gradient-party mb-2">
                See you at the party! 🥳
              </p>
              <p className="text-sm text-muted-foreground font-body">
                Made with ❤️ for Arjun's special day
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
