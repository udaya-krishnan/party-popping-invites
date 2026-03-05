import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicToggle = ({ isPlaying, onToggle }: MusicToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-card 
                 flex items-center justify-center shadow-lg border-2 border-border
                 hover:scale-110 transition-transform"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
};
