import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "Birthday kid celebration" },
  { src: gallery2, alt: "Fun party games" },
  { src: gallery3, alt: "Birthday cake" },
  { src: gallery4, alt: "Party gifts" },
];

export const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="px-4 py-10 max-w-lg mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-display font-bold text-center text-foreground mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        📸 Party Memories
      </motion.h2>

      <div className="grid grid-cols-2 gap-3">
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="rounded-2xl overflow-hidden aspect-square border-2 border-border shadow-md"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-[80vh] rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
