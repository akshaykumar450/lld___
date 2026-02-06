import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import { imageConfig } from "@/config/valentine.config";

// Falling rose petal component
const FallingPetal = ({ delay }: { delay: number }) => {
  const left = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => 16 + Math.random() * 16, []);
  const duration = useMemo(() => 8 + Math.random() * 6, []);

  return (
    <motion.div
      className="absolute text-primary pointer-events-none"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: -50, rotate: 0, opacity: 0.8 }}
      animate={{
        y: "110vh",
        rotate: [0, 180, 360],
        x: [0, 30, -30, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      🌹
    </motion.div>
  );
};

// Cursor-following rose
const CursorRose = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 text-3xl"
      animate={{
        x: position.x - 15,
        y: position.y - 15,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      🌹
    </motion.div>
  );
};

// Image slider
const ImageSlider = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-glow bg-black/20">
      <AnimatePresence mode="wait">
        <div key={`container-${current}`} className="absolute inset-0">
          {/* Blurred background */}
          <motion.div
            key={`bg-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={images[current]}
              alt=""
              className="w-full h-full object-cover blur-2xl opacity-50 scale-110"
            />
          </motion.div>

          {/* Main image */}
          <motion.img
            key={`img-${current}`}
            src={images[current]}
            alt={`Memory ${current + 1}`}
            className="absolute inset-0 w-full h-full object-contain relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const RoseDay = () => {
  const [showFinale, setShowFinale] = useState(false);
  const petals = useMemo(() => Array.from({ length: 25 }, (_, i) => i), []);

  return (
    <DayGuard dayId="rose-day">
      <DayLayout dayName="Rose Day" emoji="🌹">
        <div className="min-h-screen relative">
          {/* Falling petals */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {petals.map((_, i) => (
              <FallingPetal key={i} delay={i * 0.8} />
            ))}
          </div>

          {/* Cursor rose (desktop only) */}
          <div className="hidden md:block">
            <CursorRose />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-12">
            {!showFinale ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                {/* Header */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Our Beautiful Moments
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    A bouquet of memories, just for you
                  </p>
                </motion.div>

                {/* Image Slider */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ImageSlider images={imageConfig.couplePhotos} />
                </motion.div>

                {/* Continue button */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() => setShowFinale(true)}
                    className="btn-romantic"
                  >
                    See Your Bouquet 🌹
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[80vh] text-center relative"
              >
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-radial from-rose-500/20 to-transparent blur-3xl rounded-full" />

                {/* Heart of Roses */}
                <div className="relative h-64 w-64 md:h-96 md:w-96 flex items-center justify-center mb-12">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    {/* Central Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/40 blur-2xl rounded-full animate-pulse" />

                    {/* Rose Particles forming a Heart */}
                    {[...Array(40)].map((_, i) => {
                      const t = (i / 40) * Math.PI * 2;
                      const scale = 15; // Scale factor for heart shape
                      // Parametric heart equation
                      const x = 16 * Math.pow(Math.sin(t), 3);
                      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

                      return (
                        <motion.div
                          key={i}
                          className="absolute text-2xl md:text-4xl top-1/2 left-1/2"
                          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                          animate={{
                            x: x * scale,
                            y: y * scale,
                            opacity: 1,
                            scale: 1,
                            rotate: Math.random() * 30 - 15
                          }}
                          transition={{
                            delay: i * 0.05,
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                          }}
                        >
                          🌹
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  className="z-10 mt-12 md:mt-24" // Added extra top margin to prevent overlap
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                >
                  <p className="font-display text-3xl md:text-5xl text-foreground font-bold italic mb-4 drop-shadow-md">
                    "Every rose reminds me of you."
                  </p>
                  <p className="text-xl text-muted-foreground">
                    A heart full of love, just for you.
                  </p>
                </motion.div>

                <motion.button
                  onClick={() => setShowFinale(false)}
                  className="btn-outline-romantic mt-12 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  Back to Memories
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </DayLayout>
    </DayGuard >
  );
};

export default RoseDay;
