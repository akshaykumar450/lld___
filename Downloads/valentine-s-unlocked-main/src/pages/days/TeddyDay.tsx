const cuteMessages = [
  "You're my cuddle buddy! 🤗",
  "Soft hugs incoming! 💕",
  "I wuv you so much! 🥰",
  "You make me feel so warm! ☀️",
  "Bear hugs forever! 🧸",
  "You're unbearably cute! 😊",
  "Teddy loves you! ❤️",
  "Squeeze me tight! 🫂",
];

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import confetti from "canvas-confetti";

const TeddyDay = () => {
  const [interactions, setInteractions] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const [isBlushing, setIsBlushing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isSinging, setIsSinging] = useState(false);

  // Wardrobe State
  const [headIndex, setHeadIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [extraIndex, setExtraIndex] = useState(0);

  const headwear = ["", "🎩", "👑", "🧢", "🎀", "🥳"];
  const eyewear = ["", "🕶️", "👓", "🧐", "😎"];
  const extras = ["", "👔", "🧣", "💝", "🌹", "🥇"];

  // Special "69" Mode State
  const isSoofiftyMode = interactions === 69;

  const handleTeddyInteraction = () => {
    const newCount = interactions + 1;
    setInteractions(newCount);

    // Special Trigger for 69
    if (newCount === 69) {
      setCurrentMessage("69 hugs? Now that's my favorite number... let's take this to the bedroom. 😈🔥");
      setShowMessage(true);
      return; // Skip normal cute logic
    }

    // Normal Cute Logic
    const reaction = newCount % 3;
    if (reaction === 0) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    } else if (reaction === 1) {
      setIsBlushing(true);
      setTimeout(() => setIsBlushing(false), 1500);
    } else {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }

    // Show random message
    const randomMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleTummyRub = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent main hug click
    setIsSinging(true);
    setCurrentMessage("🎵 I Love You Babydoll! 🎵");
    setShowMessage(true);
    setTimeout(() => {
      setIsSinging(false);
      setShowMessage(false);
    }, 3000);
  };

  const triggerTeddyStorm = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      // Use standard confetti but with "Bear" colors.
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B4513', '#D2691E', '#CD853F'], // Brown shades
        shapes: ['square']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B4513', '#D2691E', '#CD853F'],
        shapes: ['circle']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <DayGuard dayId="teddy-day">
      <DayLayout dayName="Teddy Day" emoji="🧸">
        <div className={`min-h-screen flex flex-col items-center justify-center relative px-4 transition-colors duration-500 pb-20 ${isSoofiftyMode ? "bg-red-950/90 animate-pulse" : ""}`}>

          {/* Background elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute text-2xl ${isSoofiftyMode ? "opacity-40 text-red-500" : "opacity-20"}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {isSoofiftyMode ? "🔥" : "🧸"}
              </motion.div>
            ))}
          </div>

          {/* Special Vignette for 69 Mode */}
          {isSoofiftyMode && (
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
          )}

          {/* Header */}
          <motion.div
            className="text-center mb-8 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className={`font-display text-4xl md:text-5xl font-bold mb-4 ${isSoofiftyMode ? "text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]" : "text-foreground"}`}>
              {isSoofiftyMode ? "Naughty Teddy... 😈" : "Meet Your Teddy! 🧸"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isSoofiftyMode ? "You pressed the right buttons..." : "Style him, Hug him, or make it Rain!"}
            </p>
          </motion.div>

          {/* Main Teddy */}
          <motion.div
            className="relative cursor-pointer select-none z-10 mb-8"
            initial={{ scale: 0, rotate: -20 }}
            animate={isSoofiftyMode ?
              { scale: [1, 1.1, 1], rotate: [-5, 5, -5, 5, 0], x: [-5, 5, -5, 5, 0] } :
              { scale: 1, rotate: 0 }
            }
            transition={isSoofiftyMode ? { duration: 0.5, repeat: Infinity } : { type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTeddyInteraction}
          >
            {/* Teddy & Accessories */}
            <motion.div
              className="text-[150px] md:text-[200px] leading-none relative flex items-center justify-center w-[200px] h-[200px]"
              animate={
                isWaving
                  ? { rotate: [0, -10, 10, -10, 0] }
                  : isSinging
                    ? { scale: [1, 1.05, 1], y: [0, -5, 0] }
                    : {}
              }
              transition={{ duration: 0.5, repeat: isSinging ? Infinity : 0 }}
            >
              <span className="z-10">🧸</span>

              {/* Accessories Overlay */}

              {/* Headwear */}
              <div className="absolute top-[-20%] z-20 text-[80px] pointer-events-none">
                {headwear[headIndex]}
              </div>

              {/* Eyewear */}
              <div className="absolute top-[-5%] z-20 text-[50px] pointer-events-none drop-shadow-sm">
                {eyewear[eyeIndex]}
              </div>

              {/* Extras / Neck / Hand */}
              <div className={`absolute z-20 text-[60px] pointer-events-none transition-all duration-300 drop-shadow-md
                  ${["👔", "🧣", "🥇"].includes(extras[extraIndex])
                  ? "top-[40%] left-1/2 -translate-x-1/2"
                  : "bottom-[-5%] right-[10%] rotate-12"
                }`}
              >
                {extras[extraIndex]}
              </div>

              {/* Singing Notes */}
              <AnimatePresence>
                {isSinging && (
                  <>
                    <motion.div className="absolute top-0 right-0 text-4xl" initial={{ y: 0, opacity: 0 }} animate={{ y: -50, x: 20, opacity: 1 }} exit={{ opacity: 0 }}>🎵</motion.div>
                    <motion.div className="absolute top-10 -left-4 text-4xl" initial={{ y: 0, opacity: 0 }} animate={{ y: -40, x: -20, opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>🎶</motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Tummy Interactive Area */}
              <div
                className="absolute top-[55%] left-[35%] w-[30%] h-[25%] cursor-help z-30 hover:bg-white/10 rounded-full transition-colors"
                onClick={handleTummyRub}
                title="Rub Tummy"
              />
            </motion.div>

            {/* Blush effect */}
            <AnimatePresence>
              {isBlushing && (
                <>
                  <motion.div
                    className="absolute top-1/3 left-1/4 w-8 h-4 rounded-full bg-rose-medium/40 z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    className="absolute top-1/3 right-1/4 w-8 h-4 rounded-full bg-rose-medium/40 z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Heart pop */}
            <AnimatePresence>
              {showHeart && (
                <motion.div
                  className="absolute -top-4 right-0 text-4xl z-20"
                  initial={{ scale: 0, y: 0, opacity: 0 }}
                  animate={{ scale: 1, y: -30, opacity: 1 }}
                  exit={{ scale: 0, y: -60, opacity: 0 }}
                >
                  ❤️
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Controls Section */}
          {!isSoofiftyMode && (
            <motion.div
              className="relative z-20 flex flex-col gap-4 items-center bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-xl max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-display text-xl text-primary font-bold">Style Your Teddy</h3>

              <div className="flex gap-4 w-full justify-between">
                <button onClick={(e) => { e.stopPropagation(); setHeadIndex((i) => (i + 1) % headwear.length); }} className="flex-1 btn-romantic py-2 text-2xl scale-100 hover:scale-110 transition-transform" title="Change Hat">🎩</button>
                <button onClick={(e) => { e.stopPropagation(); setEyeIndex((i) => (i + 1) % eyewear.length); }} className="flex-1 btn-romantic py-2 text-2xl scale-100 hover:scale-110 transition-transform" title="Change Glasses">🕶️</button>
                <button onClick={(e) => { e.stopPropagation(); setExtraIndex((i) => (i + 1) % extras.length); }} className="flex-1 btn-romantic py-2 text-2xl scale-100 hover:scale-110 transition-transform" title="Change Outfit">👔</button>
              </div>

              <div className="w-full h-px bg-rose-200 my-2" />

              <button
                onClick={(e) => { e.stopPropagation(); triggerTeddyStorm(); }}
                className="btn-romantic w-full py-3 font-semibold shadow-glow-rose"
              >
                Teddy Bear Storm! 🧸🌧️
              </button>
            </motion.div>
          )}

          {/* Message bubble */}
          <AnimatePresence>
            {(showMessage || isSoofiftyMode) && (
              <motion.div
                className={`absolute top-1/4 px-6 py-4 rounded-2xl shadow-xl z-30 max-w-xs text-center ${isSoofiftyMode ? "bg-red-900 border-2 border-red-500" : "bg-card shadow-romantic"}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
              >
                <p className={`font-display text-lg ${isSoofiftyMode ? "text-white font-bold" : "text-foreground"}`}>
                  {isSoofiftyMode ? "69 hugs? Now that's my favorite number... let's take this to the bedroom. 😈🔥" : currentMessage}
                </p>
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 ${isSoofiftyMode ? "bg-red-900 border-b-2 border-r-2 border-red-500" : "bg-card"}`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interaction counter */}
          <motion.div
            className="mt-8 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground text-sm">
              Teddy hugs received: <span className="text-foreground font-semibold">{interactions}</span>
            </p>

            {/* Debug Button to skip close to 69 */}
            <button
              onClick={() => setInteractions(68)}
              className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 text-xs text-muted-foreground p-2"
            >
              (Debug: Skip to 68)
            </button>

            {interactions >= 10 && !isSoofiftyMode && (
              <motion.p
                className="mt-4 font-display text-xl text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Teddy loves you so much! 🥹💕
              </motion.p>
            )}
          </motion.div>
        </div>
      </DayLayout>
    </DayGuard>
  );
};

export default TeddyDay;
