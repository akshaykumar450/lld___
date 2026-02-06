import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import confetti from "canvas-confetti";

const promises = [
  "I promise to listen to you, even when words are unspoken. 🤫❤️",
  "I promise to support your wildest dreams and be your biggest fan. 🌟👏",
  "I promise to be patient, kind, and forgiving (even when you're hangry). 🍟🧘‍♂️",
  "I promise to share my food... okay, mostly the fries. 🍔🍟",
  "I promise to adventure with you through life's highs and lows. 🎢🌍",
  "I promise to respect you, honor you, and cherish you. 🤝🌹",
  "I promise to choose you, love you, and keep you, forever. 💍✨",
];

const PromiseDay = () => {
  const [litPromises, setLitPromises] = useState<number[]>([]);
  const [showFinale, setShowFinale] = useState(false);

  const allLit = litPromises.length === promises.length;

  const handleLightLantern = (index: number) => {
    if (litPromises.includes(index)) return;

    const newLit = [...litPromises, index];
    setLitPromises(newLit);

    // Trigger slight confetti for each light
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.7, x: (index + 1) / 8 },
      colors: ['#FFD700', '#FFA500'] // Gold/Orange sparks
    });

    if (newLit.length === promises.length) {
      setTimeout(() => setShowFinale(true), 1500);
      setTimeout(() => {
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
      }, 1500);
    }
  };

  // Randomized positions for lanterns to look natural
  // Using fixed tailored positions to ensure they fit well on screen for 7 items
  const lanternPositions = [
    { top: "15%", left: "15%", delay: 0 },
    { top: "25%", left: "80%", delay: 1 },
    { top: "40%", left: "25%", delay: 2 },
    { top: "50%", left: "70%", delay: 0.5 },
    { top: "65%", left: "10%", delay: 1.5 },
    { top: "75%", left: "80%", delay: 2.5 },
    { top: "80%", left: "40%", delay: 1 }, // Center-ish bottom
  ];

  return (
    <DayGuard dayId="promise-day">
      <DayLayout dayName="Promise Day" emoji="🤝">
        <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-[3000ms] ${allLit ? "bg-gradient-to-b from-indigo-900 to-purple-900" : "bg-slate-950"}`}>

          {/* Background Stars - dimmed when dark */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 3 + 1 + "px",
                  height: Math.random() * 3 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 3 + Math.random() * 3, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Header */}
          <motion.div
            className="relative z-10 text-center mb-12 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {allLit ? "My Vows to You 🌟" : "Light the Promises 🕯️"}
            </h1>
            <p className="text-white/60 text-lg">
              {allLit ? "Forever and Always." : "Click each lantern to reveal a promise..."}
            </p>
          </motion.div>

          {/* Lanterns Container */}
          <div className="absolute inset-0 pointer-events-none">
            {lanternPositions.map((pos, index) => {
              const isLit = litPromises.includes(index);
              return (
                <motion.div
                  key={index}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay
                  }}
                  onClick={() => handleLightLantern(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Lantern SVG/Component replacement with Emoji for now but styled */}
                  <div className={`text-6xl transition-all duration-1000 ${isLit ? "drop-shadow-[0_0_30px_rgba(255,165,0,0.8)] opacity-100 scale-110" : "opacity-40 grayscale blur-[1px]"}`}>
                    🏮
                  </div>

                  {/* Flame Effect when lit */}
                  {isLit && (
                    <motion.div
                      className="absolute top-[40%] left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-200 rounded-full blur-[2px]"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Revealed Promises Display */}
          <div className="relative z-10 w-full max-w-lg px-6 flex flex-col gap-4 items-center min-h-[400px] justify-end pb-20 pointer-events-none">
            <AnimatePresence mode="popLayout">
              {litPromises.map((litIndex) => (
                <motion.div
                  key={litIndex}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center shadow-lg w-full"
                >
                  <p className="font-display text-white text-lg md:text-xl text-shadow-sm">
                    {promises[litIndex]}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Finale Message */}
          <AnimatePresence>
            {showFinale && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-white/10 border border-white/20 p-8 md:p-12 rounded-3xl text-center max-w-2xl mx-4 shadow-[0_0_50px_rgba(139,92,246,0.3)]"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                    I Promise You. ❤️
                  </h2>
                  <div className="text-2xl animate-bounce">
                    👇
                  </div>
                  <button
                    onClick={() => setShowFinale(false)}
                    className="mt-8 px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-colors"
                  >
                    Seal the Promise 💋
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </DayLayout>
    </DayGuard>
  );
};

export default PromiseDay;
