import { motion } from "framer-motion";
import { Shirt, Gamepad2, CakeSlice, Gift, Music } from "lucide-react";

const details = [
  { icon: Shirt, label: "Dress Code", value: "Colorful Party Wear 🌈", colorClass: "bg-birthday-pink" },
  { icon: Gamepad2, label: "Fun Games", value: "Musical Chairs, Treasure Hunt & More! 🎯", colorClass: "bg-birthday-blue" },
  { icon: CakeSlice, label: "Cake Cutting", value: "6:30 PM 🎂", colorClass: "bg-birthday-yellow" },
  { icon: Gift, label: "Surprises", value: "Return Gifts for Everyone! 🎁", colorClass: "bg-birthday-green" },
  { icon: Music, label: "Entertainment", value: "DJ, Magic Show & Dance! 🎵", colorClass: "bg-birthday-purple" },
];

export const PartyDetailsSection = () => {
  return (
    <section className="px-4 py-10 max-w-lg mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-display font-bold text-center text-foreground mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🎉 Party Details
      </motion.h2>

      <div className="space-y-3">
        {details.map(({ icon: Icon, label, value, colorClass }, i) => (
          <motion.div
            key={label}
            initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-birthday flex items-center gap-4 !p-4"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colorClass}`}
            >
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">{label}</p>
              <p className="text-sm font-display font-semibold text-foreground">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
