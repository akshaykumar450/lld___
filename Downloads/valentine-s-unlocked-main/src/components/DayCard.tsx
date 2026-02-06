import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { DayConfig, isDayUnlocked, formatDate } from "@/config/valentine.config";

interface DayCardProps {
  day: DayConfig;
  index: number;
}

const DayCard = ({ day, index }: DayCardProps) => {
  const unlocked = isDayUnlocked(day.date);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      <Link
        to={unlocked ? day.route : "#"}
        className={`block ${!unlocked ? "cursor-not-allowed" : ""}`}
        onClick={(e) => !unlocked && e.preventDefault()}
      >
        <motion.div
          whileHover={unlocked ? { scale: 1.03, y: -5 } : {}}
          whileTap={unlocked ? { scale: 0.98 } : {}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative overflow-hidden rounded-2xl p-6 h-full min-h-[180px]
            transition-all duration-300
            ${unlocked
              ? "card-glass hover:shadow-glow cursor-pointer"
              : "bg-card/50 backdrop-blur-sm"
            }
          `}
        >
          {/* Locked overlay */}
          {!unlocked && (
            <div className="locked-overlay rounded-2xl">
              <Lock className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center px-4">
                Unlocks on {formatDate(day.date)} ❤️
              </p>
            </div>
          )}

          {/* Card content */}
          <div className={`relative z-0 ${!unlocked ? "blur-sm" : ""}`}>
            {/* Date badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {formatDate(day.date)}
              </span>
              <span className="text-2xl">{day.emoji}</span>
            </div>

            {/* Day name */}
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {day.name}
            </h3>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground italic">
              "{day.tagline}"
            </p>

            {/* Decorative element */}
            {unlocked && (
              <motion.div
                className="absolute bottom-4 right-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-primary/40" fill="currentColor" />
              </motion.div>
            )}
          </div>

          {/* Particle Effects */}
          {unlocked && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-[-20px] text-2xl"
                  variants={{
                    idle: {
                      opacity: 0,
                      y: 0,
                      transition: { duration: 0.2 }
                    },
                    hover: {
                      opacity: [0, 1, 0],
                      y: -200,
                      x: Math.random() * 60 - 30,
                      rotate: Math.random() * 360,
                      transition: {
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 0.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                  initial="idle"
                  animate={isHovered ? "hover" : "idle"}
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    fontSize: `${1 + Math.random()}rem`
                  }}
                >
                  {day.emoji}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DayCard;
