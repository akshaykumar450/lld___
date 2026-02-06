import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";
import DayCard from "@/components/DayCard";
import { valentineWeekConfig, siteConfig } from "@/config/valentine.config";
import HoverText from "@/components/HoverText";

const Index = () => {
  const [isLoveHovered, setIsLoveHovered] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const titleParts = siteConfig.title.split(",").map(s => s.trim());

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ease-in-out ${isLoveHovered ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900 via-rose-950 to-black" : ""
        }`}
    >
      {/* Background overlay for smooth transition */}
      <div
        className={`absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-1000 ${isLoveHovered ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Background effects */}
      <FloatingHearts count={12} />
      <Sparkles count={25} />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Decorative hearts */}
          <motion.div
            className="flex justify-center gap-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Heart className={`w-6 h-6 animate-heartbeat ${isLoveHovered ? "text-rose-500" : "text-primary/60"}`} fill="currentColor" />
            {/* Interactive "Akshu" Heart */}
            <motion.div
              className="relative flex items-center justify-center cursor-pointer z-20"
              initial="initial"
              animate={isHeartHovered ? "hover" : "initial"}
              whileTap="tap"
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.3 },
                tap: { scale: 0.9 }
              }}
            >
              <Heart
                className={`w-12 h-12 animate-heartbeat ${isLoveHovered ? "text-rose-600" : "text-primary"}`}
                fill="currentColor"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={{
                  initial: { opacity: 0, scale: 0, y: 5 },
                  hover: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }
                }}
              >
                <span className="text-[10px] font-bold text-white font-display drop-shadow-md pt-1">
                  akshu
                </span>
              </motion.div>
            </motion.div>
            <Heart className={`w-6 h-6 animate-heartbeat ${isLoveHovered ? "text-rose-500" : "text-primary/60"}`} fill="currentColor" style={{ animationDelay: "0.4s" }} />
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <HoverText
              text={titleParts[0] + ","}
              textClassName="text-gradient"
            />
            <br />
            <HoverText
              text={titleParts[1] + ", "}
              textClassName="text-foreground"
            />
            <br className="lg:hidden" />
            <motion.span
              className={`inline-block cursor-pointer transition-colors duration-500 ${isLoveHovered ? "text-rose-400 drop-shadow-[0_0_25px_rgba(251,113,133,0.8)]" : "text-foreground"}`}
              onMouseEnter={() => setIsLoveHovered(true)}
              onMouseLeave={() => setIsLoveHovered(false)}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {titleParts[2]}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={`text-lg md:text-xl max-w-md mx-auto transition-colors duration-500 ${isLoveHovered ? "text-white/90" : "text-muted-foreground"
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {siteConfig.subtitle}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center text-muted-foreground"
            >
              <span className="text-sm mb-2">Explore the week</span>
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Valentine Week Calendar Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {valentineWeekConfig.map((day, index) => (
              <DayCard key={day.id} day={day} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-muted-foreground text-sm">
            Made with <Heart className="inline w-4 h-4 text-primary animate-heartbeat" fill="currentColor" /> for {siteConfig.partnerName}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
