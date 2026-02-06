import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import confetti from "canvas-confetti";
import { imageConfig } from "@/config/valentine.config";

// --- Types ---
type KissType = "Forehead" | "Cheek" | "Hand" | "French" | "Surprise";

const kissTypes: {
  type: KissType;
  label: string;
  emoji: string;
  desc: string;
  placeholder: string;
  animation: string;
}[] = [
    { type: "Forehead", label: "Forehead Kiss", emoji: "❓", desc: "A cozy secret...", placeholder: "/images/kiss-forehead.jpg", animation: "flash" },
    { type: "Cheek", label: "Cheek Kiss", emoji: "🎁", desc: "A sweet surprise...", placeholder: "/images/kiss-cheek.jpg", animation: "zoom-spin" },
    { type: "Hand", label: "Hand Kiss", emoji: "✨", desc: "Something magical...", placeholder: "/images/kiss-hand.jpg", animation: "flip" },
    { type: "French", label: "French Kiss", emoji: "🔥", desc: "It's getting hot...", placeholder: "/images/kiss-french.jpg", animation: "blur" },
    { type: "Surprise", label: "Special Kiss", emoji: "🙈", desc: "For your eyes only...", placeholder: "/images/kiss-special.jpg", animation: "slide-up" },
  ];

const KissDay = () => {
  // --- State: Kiss-O-Meter ---
  const [meterLevel, setMeterLevel] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- State: Flying Kisses ---
  const [capturedCount, setCapturedCount] = useState(0); // Kept for UI consistency if needed
  const [currentScore, setCurrentScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fallingItems, setFallingItems] = useState<{ id: number; x: number; type: string; speed: number; points: number }[]>([]);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // --- State: Kissing Booth ---
  const [selectedKiss, setSelectedKiss] = useState<typeof kissTypes[0] | null>(null);
  const [isBoothOpen, setIsBoothOpen] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0); // Count clicks to unlock

  // --- Auto-Trigger at Max Level ---
  useEffect(() => {
    if (meterLevel >= 100 && !showExplosion) {
      handleMaxLevelReached();
    }
  }, [meterLevel]);

  const handleMaxLevelReached = () => {
    // 1. Stop charging
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    // 2. Trigger Finale
    setShowExplosion(true);
    confetti({ particleCount: 300, spread: 180, origin: { y: 0.5 }, colors: ['#ff0000', '#ff69b4', '#ffffff'] });

    // 3. Reset after delay
    setTimeout(() => {
      setShowExplosion(false);
      setMeterLevel(0);
    }, 4000); // 4 seconds display
  };

  // --- Logic: Kiss-O-Meter ---
  const startCharging = () => {
    if (showExplosion) return; // Block input during finale
    setIsHolding(true);
    // Slower charging to see levels (approx 5s to full)
    holdIntervalRef.current = setInterval(() => {
      setMeterLevel((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 50);
  };

  const stopCharging = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    // Only drain if NOT at max (max is handled by effect)
    if (meterLevel < 100) {
      // Fast drain / Reset "after a while a small time" -> Immediate fast drain
      const drain = setInterval(() => {
        setMeterLevel(p => {
          if (p <= 0) { clearInterval(drain); return 0; }
          return p - 5; // Drains much faster now
        })
      }, 10);
    }
  };

  const getMeterStatus = () => {
    if (meterLevel < 30) return { label: "Cute Peck 😘", color: "bg-pink-300" };
    if (meterLevel < 70) return { label: "Passionate Smooch 😚", color: "bg-rose-400" };
    if (meterLevel < 99) return { label: "Soul Snatcher 🥵", color: "bg-red-600" };
    return { label: "MAXIMUM OVERLOAD! 💥❤️", color: "bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 animate-pulse" };
  };

  const status = getMeterStatus();



  // --- Logic: Love Catcher ---
  const itemTypes = [
    { emoji: "💋", points: 1, id: 'kiss' },
    { emoji: "💋", points: 1, id: 'kiss' },
    { emoji: "💌", points: 3, id: 'love_letter' },
    { emoji: "💍", points: 5, id: 'ring' },
    { emoji: "💔", points: -5, id: 'heartbreak' }, // Danger
    { emoji: "💣", points: -10, id: 'bomb' }, // Big Danger
    { emoji: "💣", points: -10, id: 'bomb' }, // EXTRA Danger
  ];

  const startGame = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentScore(0);
    setFallingItems([]);

    // Spawn items FASTER (every 350ms)
    gameLoopRef.current = setInterval(() => {
      const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const newItem = {
        id: Date.now(),
        x: Math.random() * 90 + 2, // 2% to 92%
        type: type.emoji,
        points: type.points,
        speed: 1.5 + Math.random() * 2.5 // FASTER: 1.5s to 4s duration
      };

      setFallingItems(prev => [...prev, newItem]);
    }, 350);

    // Auto-stop after 30 seconds? Or manual? Let's do manual "Stop" or specific duration
    setTimeout(stopGame, 30000); // 30s Round
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    // Clear remaining items nicely?
  };

  const catchItem = (id: number, points: number) => {
    setCurrentScore(p => Math.max(0, p + points)); // No negative score
    setFallingItems(prev => prev.filter(i => i.id !== id));

    // Visual feedback could go here (floating text)
    if (points < 0) {
      // Shake screen?
      const body = document.body;
      body.style.transform = "translateX(5px)";
      setTimeout(() => body.style.transform = "none", 100);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
  }, []);

  // --- Render (Section) ---
  // To be placed in the layout


  return (
    <DayGuard dayId="kiss-day">
      <DayLayout dayName="Kiss Day" emoji="💋">
        <div className="min-h-screen pb-20 overflow-x-hidden">

          {/* Header */}
          <header className="pt-10 pb-6 text-center px-4 select-none">
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold text-foreground drop-shadow-sm cursor-default active:scale-95 transition-transform"
              onClick={() => {
                if (isBoothOpen) return;
                const newCount = secretClicks + 1;
                setSecretClicks(newCount);
                if (newCount === 5) {
                  setIsBoothOpen(true);
                  confetti({ particleCount: 150, spread: 100, origin: { y: 0.2 } });
                }
              }}
            >
              The Kiss Carnival 🎪
            </motion.h1>
            <p className="text-muted-foreground mt-2">Step right up for a festival of affection!</p>
          </header>

          {/* SPACER */}
          <div className="h-10" />

          {/* ZONE 1: KISS-O-METER */}
          <section className="max-w-md mx-auto px-6 mb-24 relative">
            <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">🔥 Kiss-O-Meter</h2>
              <p className="text-sm text-muted-foreground mb-6">Hold the button to charge up your passion!</p>

              {/* The Meter */}
              <div className="w-16 h-64 mx-auto bg-gray-200 rounded-full relative overflow-hidden border-4 border-white shadow-inner mb-6">
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 ${status.color} transition-all duration-100`}
                  style={{ height: `${meterLevel}%` }}
                />
                {/* Tick marks */}
                <div className="absolute top-[30%] left-0 right-0 h-0.5 bg-white/30" />
                <div className="absolute top-[70%] left-0 right-0 h-0.5 bg-white/30" />
              </div>

              <div className="h-8 mb-4">
                <p className={`font-bold ${meterLevel === 100 ? "text-xl scale-110" : "text-lg"} transition-all duration-200 text-foreground`}>
                  {meterLevel > 0 ? status.label : "Ready?"}
                </p>
              </div>

              <button
                onMouseDown={startCharging}
                onMouseUp={stopCharging}
                onMouseLeave={stopCharging}
                onTouchStart={startCharging}
                onTouchEnd={stopCharging}
                className="btn-romantic w-full py-4 text-xl font-bold active:scale-95 transition-transform select-none touch-none"
              >
                {isHolding ? "CHARGING... ⚡" : "HOLD TO KISS 💋"}
              </button>
            </div>
          </section>

          {/* ZONE 2: LOVE CATCHER MINI-GAME */}
          <section className="max-w-2xl mx-auto px-6 mb-24 text-center relative min-h-[400px]">
            <h2 className="text-2xl font-bold text-primary mb-2">🧸 Cupid's Love Catcher</h2>
            <p className="text-muted-foreground mb-8">Catch the good stuff, avoid the heartbreak! (30s Timer)</p>

            <div className="flex justify-center gap-8 mb-6 text-xl font-display">
              <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm">
                Score: <span className="text-primary font-bold">{currentScore}</span>
              </div>
              <button
                onClick={startGame}
                className="btn-outline-romantic bg-white/50 text-sm px-4 disabled:opacity-50"
                disabled={isPlaying}
              >
                {isPlaying ? "Playing... 🎮" : "Start Game! 🏁"}
              </button>
            </div>

            {/* Game Area */}
            <div className="h-[400px] border-4 border-double border-rose-300 rounded-3xl relative overflow-hidden bg-gradient-to-b from-sky-100/50 to-white/50 shadow-inner">
              <AnimatePresence>
                {fallingItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className="absolute text-5xl cursor-pointer hover:scale-110 active:scale-90 transition-transform select-none touch-none"
                    style={{ left: `${item.x}%` }}
                    initial={{ top: -50, opacity: 1, rotate: Math.random() * 30 - 15 }}
                    animate={{ top: "110%", opacity: 0 }}
                    transition={{ duration: item.speed, ease: "linear" }}
                    onMouseDown={() => catchItem(item.id, item.points)}
                    onTouchStart={() => catchItem(item.id, item.points)}
                    onAnimationComplete={() => setFallingItems(prev => prev.filter(i => i.id !== item.id))}
                  >
                    {item.type}
                  </motion.button>
                ))}
              </AnimatePresence>

              {!isPlaying && currentScore === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/60 font-medium">
                  Click 'Start Game' to begin! <br />
                  💋 = +1 | 💌 = +3 | 💎 = +5 <br />
                  💔 = -5
                </div>
              )}

              {!isPlaying && currentScore > 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-primary mb-2">Game Over!</p>
                  <p className="text-xl">Score: {currentScore}</p>
                  {currentScore > 20 && <p className="text-rose-600 font-bold mt-2">You won my heart! 💖</p>}
                </div>
              )}
            </div>
          </section>


          {/* ZONE 3: KISSING BOOTH */}
          <section className="max-w-4xl mx-auto px-6 mb-12 min-h-[300px]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">📸 The Kissing Booth</h2>
              {/* HIDDEN HINT: Only shows when open */}
              {isBoothOpen && <p className="text-muted-foreground">You found it! Now pick a ticket.</p>}
              {!isBoothOpen && <p className="text-muted-foreground blur-[2px] opacity-50 select-none">???</p>}
            </div>

            {!isBoothOpen ? (
              // HIDDEN STATE: Invisible trigger area or just nothing
              <div className="py-10 text-center opacity-0 select-none" aria-hidden="true">
                (Nothing to see here...)
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <p className="text-center text-muted-foreground mb-6">Pick a mystery ticket... if you dare. 🤫</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {imageConfig.kissDayPhotos.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-3 pb-8 shadow-md rotate-2 hover:rotate-0 transition-transform duration-300 transform hover:scale-105 hover:z-10 cursor-pointer"
                      onClick={() => setSelectedKiss({ ...kissTypes[0], placeholder: img, label: "Us ❤️", type: "Surprise" })}
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-2">
                        <img src={img} alt="Us" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center font-handwriting text-gray-600 text-lg">
                        You & Me
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </section>

          {/* Photo Modal */}
          <AnimatePresence>
            {selectedKiss && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedKiss(null)}
              >
                <motion.div
                  className="bg-white p-2 rounded-2xl max-w-lg w-full relative"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedKiss(null)}
                    className="absolute -top-4 -right-4 bg-white text-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform z-10"
                  >
                    ❌
                  </button>

                  {/* Polaroid Style */}
                  <div className="bg-white p-4 pb-12 shadow-xl">
                    <motion.div
                      className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden mb-4 relative flex items-center justify-center group"
                      initial={
                        selectedKiss.animation === 'zoom-spin' ? { scale: 0, rotate: -180 } :
                          selectedKiss.animation === 'flip' ? { rotateY: 90 } :
                            selectedKiss.animation === 'slide-up' ? { y: 100, opacity: 0 } :
                              {}
                      }
                      animate={
                        selectedKiss.animation === 'zoom-spin' ? { scale: 1, rotate: 0 } :
                          selectedKiss.animation === 'flip' ? { rotateY: 0 } :
                            selectedKiss.animation === 'slide-up' ? { y: 0, opacity: 1 } :
                              {}
                      }
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      {/* This is where the user image goes using the placeholder logic from config or static */}
                      <motion.img
                        src={selectedKiss.placeholder}
                        alt={selectedKiss.label}
                        className="w-full h-full object-cover"
                        initial={selectedKiss.animation === 'blur' ? { filter: 'blur(20px)' } : {}}
                        animate={selectedKiss.animation === 'blur' ? { filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1 }}
                        onError={(e) => {
                          // Fallback if image fails
                          (e.target as HTMLImageElement).src = `https://placehold.co/600x800/pink/white?text=${selectedKiss.label.replace(' ', '+')}+Photo`;
                        }}
                      />

                      {/* FLASH ANIMATION (Only for 'flash' type) */}
                      {selectedKiss.animation === 'flash' && (
                        <motion.div
                          className="absolute inset-0 bg-white pointer-events-none z-20"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      )}

                      {/* Hint overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-center p-4">
                        <p>Add your photo to: <br /> <code className="text-xs bg-black/50 px-1 py-1 rounded">public{selectedKiss.placeholder}</code></p>
                      </div>
                    </motion.div>

                    <h3 className="font-handwriting text-3xl text-center text-foreground rotate-[-2deg]">
                      {selectedKiss.label} {selectedKiss.emoji}
                    </h3>
                    <p className="text-center text-muted-foreground text-sm mt-2">{selectedKiss.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* KISS-O-METER EXPLOSION OVERLAY */}
          <AnimatePresence>
            {showExplosion && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-red-600/90 backdrop-blur-md overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  {/* Flying Hearts in BG */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white text-4xl opacity-50"
                      initial={{
                        x: Math.random() * 100 + "vw",
                        y: "110vh"
                      }}
                      animate={{
                        y: "-10vh",
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random()
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-center relative z-10"
                >
                  <h1 className="font-display text-4xl md:text-7xl text-white font-bold drop-shadow-2xl px-4">
                    💋 MAXIMUM LOVE! 💋
                  </h1>
                  <p className="text-white text-xl md:text-2xl mt-4 max-w-lg mx-auto px-4">
                    You broke the meter! That's a lot of passion! 🔥
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </DayLayout>
    </DayGuard>
  );
};

export default KissDay;
