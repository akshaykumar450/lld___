import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import LoveScanner from "@/components/valentine/LoveScanner";
import HeartCursor from "@/components/valentine/HeartCursor";
import StarMap from "@/components/valentine/StarMap";
import JourneyGallery from "@/components/valentine/JourneyGallery";
import LoveQuiz from "@/components/valentine/LoveQuiz";
import LoveGarden from "@/components/valentine/LoveGarden";
import LoveReceipt from "@/components/valentine/LoveReceipt";
import ReasonGenerator from "@/components/valentine/ReasonGenerator";
import FuturePredictions from "@/components/valentine/FuturePredictions";
import DigitalLetter from "@/components/valentine/DigitalLetter";
import SecretVault from "@/components/valentine/SecretVault";
import FinalCinematic from "@/components/valentine/FinalCinematic";

// --- Main Page Component ---
const ValentineDay = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Scroll to top on unlock
  useEffect(() => {
    if (isUnlocked) {
      window.scrollTo(0, 0);
    }
  }, [isUnlocked]);

  return (
    <DayGuard dayId="valentines-day">
      {/* 1. LOCK SCREEN (SCANNTER) */}
      <AnimatePresence>
        {!isUnlocked && (
          <LoveScanner onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT (Only visible after unlock) */}
      {isUnlocked && (
        <DayLayout dayName="Valentine's Day" emoji="❤️">
          {/* Global Effects */}
          <HeartCursor />

          <div className="min-h-[200vh] bg-neutral-950 text-rose-50 relative overflow-hidden selection:bg-rose-500/30">

            {/* GLOBAL NOISE OVERLAY */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[60] mix-blend-overlay"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* SECTION 1: INTRO */}
            <section className="min-h-[70vh] flex flex-col items-center justify-center relative pt-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b9?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
              <div className="relative z-10 text-center space-y-6 p-4">
                <motion.h1
                  className="font-display text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-500 to-rose-400"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  THE FINAL CHAPTER
                </motion.h1>
                <motion.p
                  className="text-2xl md:text-3xl text-rose-200 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  My World Changed on 12 Nov 2024
                </motion.p>
                <motion.div
                  className="pt-8 text-4xl animate-bounce"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  👇
                </motion.div>
              </div>
            </section>

            {/* SECTION 2: THE STAR MAP */}
            <section className="py-12 px-4 flex flex-col items-center justify-center relative z-10 -mt-20">
              <div className="max-w-4xl w-full space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <StarMap />
                </motion.div>
              </div>
            </section>

            {/* SECTION 3: JOURNEY GALLERY (Slideshow) */}
            <JourneyGallery />

            {/* SECTION 4: INTERACTIVE FUN */}
            <div className="bg-gradient-to-b from-neutral-950 to-rose-950/30">
              <LoveQuiz />
              <LoveGarden />
              <LoveReceipt />
              <ReasonGenerator />
            </div>

            {/* SECTION 5: FUTURE & LETTER */}

            {/* SECTION 5: FUTURE & LETTER */}
            <div className="bg-neutral-900/50">
              <FuturePredictions />
              <DigitalLetter />
            </div>

            {/* SECTION 6: SECRET & FINAL */}
            <div className="bg-black relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-black to-black pointer-events-none" />
              <SecretVault />
              <FinalCinematic />
            </div>

            <div className="py-12 text-center text-white/20 text-sm">
              Made with ❤️ for You.
            </div>

          </div>
        </DayLayout>
      )}
    </DayGuard>
  );
};

export default ValentineDay;
