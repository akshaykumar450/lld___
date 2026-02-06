import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";

interface ChocolateType {
  id: number;
  name: string;
  type: "dark" | "milk" | "white" | "ruby";
  filling: string;
  message: string;
  color: string;
  accent: string;
}

const chocolates: ChocolateType[] = [
  {
    id: 1,
    name: "Midnight Truffle",
    type: "dark",
    filling: "Rich Ganache",
    message: "Deep, dark, and dangerous... just like the things I want to do to you, Babydoll. 💋",
    color: "bg-[#3e2723]",
    accent: "border-[#5d4037]"
  },
  {
    id: 2,
    name: "Golden Hazelnut",
    type: "milk",
    filling: "Crunchy Praline",
    message: "Smooth, creamy, and nutty... playing with you is my favorite flavor.",
    color: "bg-[#795548]",
    accent: "border-[#a1887f]"
  },
  {
    id: 3,
    name: "Ruby Raspberry",
    type: "ruby",
    filling: "Berry Cream",
    message: "Wet, sweet, and bursting with flavor... I need a taste right now, Babydoll.",
    color: "bg-[#ec407a]",
    accent: "border-[#f48fb1]"
  },
  {
    id: 4,
    name: "White Velvet",
    type: "white",
    filling: "Vanilla Bean",
    message: "You look innocent, Babydoll, but we both know what you're really craving...",
    color: "bg-[#f5deb3]",
    accent: "border-[#fff8e1]"
  },
  {
    id: 5,
    name: "Salted Caramel",
    type: "milk",
    filling: "Gooey Caramel",
    message: "A little salty, a whole lot of sweet. I'm addicted to every inch of you.",
    color: "bg-[#a0522d]",
    accent: "border-[#d7ccc8]"
  },
  {
    id: 6,
    name: "Coconut Cloud",
    type: "white",
    filling: "Coconut Creme",
    message: "Soft and dreamy... I want to keep you up in the clouds all night long.",
    color: "bg-[#ececec]",
    accent: "border-[#ffffff]"
  }
];

const ChocolateDay = () => {
  const [selectedChocolate, setSelectedChocolate] = useState<ChocolateType | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  return (
    <DayGuard dayId="chocolate-day">
      <DayLayout dayName="Chocolate Day" emoji="🍫">
        <div className="min-h-[90vh] flex items-center justify-center relative py-20 bg-[#1a1212]">
          {/* Luxurious Background Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] pointer-events-none" />

          {/* Gold Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#ffd700] opacity-30 text-xs"
                initial={{
                  x: Math.random() * 100 + "vw",
                  y: "-10vh",
                  opacity: 0,
                  rotate: 0
                }}
                animate={{
                  y: "110vh",
                  opacity: [0, 0.5, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          {/* Hidden Key Surprise (Bottom Left Corner) */}
          <motion.button
            onClick={() => setShowSecret(true)}
            className="fixed bottom-4 left-4 text-2xl opacity-10 hover:opacity-100 transition-opacity duration-1000 z-40 cursor-pointer"
            whileHover={{ scale: 1.2, rotate: 180 }}
            title="What's this?"
          >
            🗝️
          </motion.button>

          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">

            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl md:text-6xl font-bold text-[#eec77e] drop-shadow-sm mb-4">
                Bittersweet Symphony
              </h1>
              <p className="text-[#d7ccc8] text-lg max-w-lg mx-auto italic">
                "Life is like a box of chocolates... you never know what pleasure you'll find."
              </p>
            </motion.div>

            {/* The Box Grid */}
            <div className="bg-[#3e2723]/80 p-8 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-[#5d4037] relative">
              {/* Box Lid Effect (Visual Border) */}
              <div className="absolute inset-2 border border-[#8d6e63] rounded-[2.5rem] pointer-events-none opacity-50" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                {chocolates.map((choco) => (
                  <motion.button
                    key={choco.id}
                    layoutId={`choco-${choco.id}`}
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl ${choco.color} ${choco.accent} border-b-8 active:border-b-0 active:translate-y-2 transition-all shadow-xl flex items-center justify-center relative group overflow-hidden`}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedChocolate(choco)}
                  >
                    {/* Decorative Drizzle/Design */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px]" />
                    <div className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                      {choco.type === "dark" ? "🍫" : choco.type === "milk" ? "🍯" : choco.type === "ruby" ? "🍓" : "🥥"}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Unwrap Modal */}
            <AnimatePresence>
              {selectedChocolate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedChocolate(null)}>
                  <motion.div
                    layoutId={`choco-${selectedChocolate.id}`}
                    className={`relative w-full max-w-sm ${selectedChocolate.color} p-1 rounded-3xl shadow-2xl`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-[1.4rem] p-8 text-center border-4 border-white/50 h-full flex flex-col items-center gap-6">
                      <motion.div
                        className="text-6xl mb-2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        {selectedChocolate.type === "dark" ? "🍫" : selectedChocolate.type === "milk" ? "🍯" : selectedChocolate.type === "ruby" ? "🍓" : "🥥"}
                      </motion.div>

                      <div>
                        <h3 className="font-display text-2xl font-bold text-[#3e2723] mb-1">{selectedChocolate.name}</h3>
                        <p className="text-xs text-[#795548] uppercase tracking-widest font-semibold">{selectedChocolate.filling}</p>
                      </div>

                      <div className="w-full h-px bg-[#d7ccc8]" />

                      <p className="font-display text-xl text-[#5d4037] italic leading-relaxed">
                        "{selectedChocolate.message}"
                      </p>

                      <button
                        onClick={() => setSelectedChocolate(null)}
                        className="mt-4 px-6 py-2 bg-[#3e2723] text-[#eec77e] rounded-full text-sm font-semibold hover:bg-[#5d4037] transition-colors"
                      >
                        Taste Another 💋
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Secret Modal */}
            <AnimatePresence>
              {showSecret && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setShowSecret(false)}>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="relative w-full max-w-md bg-gradient-to-br from-[#1a0505] to-[#4a0e0e] border border-rose-900/50 p-8 rounded-3xl shadow-[0_0_100px_rgba(220,20,60,0.3)] text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-6xl mb-6 animate-pulse">🔥</div>
                    <h2 className="font-display text-3xl font-bold text-rose-500 mb-4">You Found the Secret...</h2>
                    <p className="text-rose-100/80 text-lg leading-relaxed mb-8">
                      Tonight, you are the dessert I want to unwrap. <br />
                      <span className="font-bold text-white block mt-4 text-xl">Wear something sexy, Babydoll... or nothing at all.</span>
                    </p>

                    <button
                      onClick={() => setShowSecret(false)}
                      className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold shadow-glow-rose transition-all"
                    >
                      I'm Ready... 🤫
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </DayLayout>
    </DayGuard>
  );
};

export default ChocolateDay;
