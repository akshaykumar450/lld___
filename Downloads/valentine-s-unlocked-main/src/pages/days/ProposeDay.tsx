import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import { imageConfig, siteConfig } from "@/config/valentine.config";

const proposalTexts = [
  "From the first moment I saw you...",
  "I knew something was different.",
  "Your smile lights up my world.",
  "Every day with you is a gift.",
  "And now, I have something to ask...",
];

const themes = [
  {
    name: "Rose Rain",
    bg: "after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-rose-100/40 after:via-transparent after:to-transparent",
    accent: "text-rose-600",
    particles: ["🌹", "❤️", "💌"]
  },
  {
    name: "Midnight Starry",
    bg: "after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-blue-900/40 after:via-transparent after:to-transparent bg-[#0a0a1a]",
    accent: "text-blue-400",
    particles: ["⭐", "✨", "💫"]
  },
  {
    name: "Sunset Glow",
    bg: "after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-orange-500/20 after:via-transparent after:to-transparent bg-[#2a1a1a]",
    accent: "text-orange-400",
    particles: ["☀️", "🧡", "✨"]
  },
  {
    name: "Lavender Dreams",
    bg: "after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-purple-500/20 after:via-transparent after:to-transparent bg-[#1a0a1a]",
    accent: "text-purple-400",
    particles: ["💜", "✨", "🌙"]
  }
];

const ProposeDay = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"closed" | "intro" | "question" | "yes">("closed");
  const [currentText, setCurrentText] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [themeIndex, setThemeIndex] = useState(0);

  const currentTheme = themes[themeIndex];

  // Typing animation progress
  useEffect(() => {
    if (stage !== "intro") return;

    const timer = setInterval(() => {
      setCurrentText((prev) => {
        if (prev < proposalTexts.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setStage("question");
            setShowQuestion(true);
          }, 1500);
          return prev;
        }
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [stage]);

  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6b9d", "#ffd93d", "#ff6b6b", "#4ecdc4"],
    });
    setStage("yes");
  };

  const handleNoClick = () => {
    // Reset sequence and change theme
    setThemeIndex((prev) => (prev + 1) % themes.length);
    setStage("intro");
    setCurrentText(0);
    setShowQuestion(false);
    setNoButtonPos({ x: 0, y: 0 });
  };

  const handleNoHover = () => {
    // Make the button "run away"
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <DayGuard dayId="propose-day">
      <DayLayout dayName="Propose Day" emoji="💌">
        <div className={`min-h-[90vh] flex items-center justify-center relative overflow-hidden py-20 transition-colors duration-1000 ${currentTheme.bg}`}>
          {/* Subtle background particles */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`${themeIndex}-${i}`}
                className="absolute"
                initial={{
                  x: Math.random() * 100 + "vw",
                  y: "-10vh",
                  opacity: 0
                }}
                animate={{
                  y: "110vh",
                  opacity: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                {currentTheme.particles[i % currentTheme.particles.length]}
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <AnimatePresence mode="wait">
              {/* Stage 0: The Sealed Letter */}
              {stage === "closed" && (
                <motion.div
                  key="closed"
                  className="flex flex-col items-center justify-center cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -50 }}
                  onClick={() => setStage("intro")}
                >
                  <motion.div
                    className="text-[120px] md:text-[160px] filter drop-shadow-2xl"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    💌
                  </motion.div>
                  <motion.div
                    className="mt-8 bg-white/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/30 text-foreground font-display font-medium shadow-lg group-hover:bg-white/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Click to Open Your Letter
                  </motion.div>
                </motion.div>
              )}

              {/* Stage 1: Reading the Letter */}
              {stage === "intro" && (
                <motion.div
                  key={`intro-${themeIndex}`}
                  className="max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="bg-[#fff9f0] p-8 md:p-12 rounded-lg shadow-2xl border-l-[12px] border-rose-200 relative min-h-[400px] flex flex-col justify-center overflow-hidden">
                    {/* Paper texture feel */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentText}
                        className="font-display text-2xl md:text-3xl text-[#5d4037] italic leading-relaxed text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        {proposalTexts[currentText]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* Stage 2: The Question */}
              {stage === "question" && (
                <motion.div
                  key={`question-${themeIndex}`}
                  className="text-center space-y-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="text-8xl md:text-[120px]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💝
                  </motion.div>

                  <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient drop-shadow-sm">
                    Will you be mine?
                  </h1>

                  <div className="flex flex-col gap-8 justify-center items-center pt-8">
                    <div className="flex flex-wrap gap-8 justify-center items-center">
                      <motion.button
                        onClick={handleYes}
                        className="btn-romantic text-2xl px-12 py-5 shadow-glow-rose"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        YES ❤️
                      </motion.button>

                      <motion.button
                        className="btn-outline-romantic text-xl px-10 py-4 opacity-70"
                        animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                        onMouseEnter={handleNoHover}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        Maybe Later 🙈
                      </motion.button>
                    </div>

                    {/* Styled No button at bottom-right */}
                    <motion.button
                      onClick={handleNoClick}
                      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 btn-outline-romantic !border-white/40 !text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-all z-50 shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      No
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* YES Stage */}
              {stage === "yes" && (
                <motion.div
                  key="yes"
                  className="text-center space-y-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="relative inline-block">
                    <motion.div
                      className="text-9xl mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      💖
                    </motion.div>
                    <div className="absolute inset-0 bg-rose-400 blur-3xl opacity-30 -z-10 animate-pulse" />
                  </div>

                  <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground">
                    Yayyy {siteConfig.partnerName} said YES! 🎉
                  </h1>

                  <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    You've made this journey absolutely perfect. I can't wait for the rest of our week together!
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                    {imageConfig.proposeDayPhotos.slice(0, 4).map((img, i) => (
                      <motion.div
                        key={i}
                        className="overflow-hidden rounded-2xl shadow-lg aspect-square"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <img src={img} alt="Celebration" className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => navigate("/")}
                    className="btn-romantic mt-12 px-10 py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Continue the Journey ✨
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DayLayout>
    </DayGuard>
  );
};

export default ProposeDay;
