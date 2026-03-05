import { motion } from "framer-motion";
import { Cake, Calendar, Clock, MapPin } from "lucide-react";

export const InvitationCard = () => {
  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Arjun%27s+6th+Birthday+Party&dates=20260810T113000Z/20260810T153000Z&details=Join+us+for+a+magical+birthday+celebration!&location=Royal+Garden+Hall";

  return (
    <motion.section
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="w-full max-w-md mx-auto px-4 py-10"
    >
      <div className="card-birthday text-center relative overflow-hidden">
        {/* Decorative top */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-birthday-pink via-birthday-yellow to-birthday-blue" />

        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🎂
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-party mb-6">
          Arjun's 6th Birthday Party!
        </h2>

        <div className="space-y-4 text-left">
          {[
            { icon: Calendar, label: "Date", value: "August 10, 2026" },
            { icon: Clock, label: "Time", value: "5:00 PM" },
            { icon: MapPin, label: "Location", value: "Royal Garden Hall" },
          ].map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center gap-4 p-3 rounded-2xl bg-muted"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body">{label}</p>
                <p className="text-base font-display font-semibold text-foreground">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-party mt-8 w-full text-center block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📅 Add to Calendar
        </motion.a>
      </div>
    </motion.section>
  );
};
