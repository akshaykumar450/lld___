import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Timer, Volume2, VolumeX, RotateCcw, Trophy } from "lucide-react";

// Types
type Mode = "zen" | "timed";

const BubbleWrap = () => {
    const [bubbles, setBubbles] = useState<boolean[]>(Array(56).fill(false)); // 7x8 grid
    const [score, setScore] = useState(0);
    const [mode, setMode] = useState<Mode>("zen");
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Audio Context
    const audioCtx = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on user interaction/mount
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }, []);

    const playPopSound = () => {
        if (!soundEnabled || !audioCtx.current) return;

        const ctx = audioCtx.current;
        if (ctx.state === "suspended") ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Pop characteristics
        osc.frequency.setValueAtTime(300 + Math.random() * 50, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    };

    const popBubble = (index: number) => {
        if (bubbles[index]) return;
        if (mode === "timed" && !isPlaying && timeLeft > 0) return; // Can't pop if game not started
        if (mode === "timed" && timeLeft === 0) return; // Game over

        const newBubbles = [...bubbles];
        newBubbles[index] = true;
        setBubbles(newBubbles);
        setScore(prev => prev + 1);

        // Sound & Haptic
        playPopSound();
        if (navigator.vibrate) navigator.vibrate(20);

        // Reset bubble after 2 seconds in Zen mode for infinite popping
        if (mode === "zen") {
            setTimeout(() => {
                setBubbles(prev => {
                    const b = [...prev];
                    b[index] = false;
                    return b;
                });
            }, 2000);
        }
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setBubbles(Array(56).fill(false));
        setIsPlaying(true);
        if (audioCtx.current?.state === "suspended") audioCtx.current.resume();
    };

    const resetZen = () => {
        setBubbles(Array(56).fill(false));
        setScore(0);
    };

    return (
        <div className="min-h-screen bg-sky-950 flex flex-col items-center p-4 relative overflow-hidden font-sans select-none">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-900 to-blue-950 pointer-events-none" />

            {/* Header */}
            <header className="w-full max-w-4xl flex items-center justify-between relative z-10 mb-8 pt-4">
                <Link to="/fun-zone" className="flex items-center text-sky-200 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" />
                </Link>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2 rounded-full bg-sky-800/50 text-sky-200 hover:bg-sky-700/50 transition-colors"
                    >
                        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                </div>
            </header>

            {/* Game Board */}
            <div className="w-full max-w-lg mb-8 relative z-10">
                <div className="bg-sky-500/10 backdrop-blur-md border border-sky-400/20 rounded-3xl p-6 shadow-2xl">

                    {/* Stats Bar */}
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">Popped</p>
                            <p className="text-4xl font-black text-white">{score}</p>
                        </div>

                        {mode === "timed" && (
                            <div className="text-right">
                                <p className="text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">Time</p>
                                <p className={`text-4xl font-black font-mono ${timeLeft < 5 ? "text-red-400 animate-pulse" : "text-white"}`}>
                                    {timeLeft}s
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mode Selector */}
                    <div className="flex bg-black/20 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => { setMode("zen"); setScore(0); setIsPlaying(false); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === "zen" ? "bg-sky-500 text-white shadow-lg" : "text-sky-300 hover:text-white"}`}
                        >
                            Zen Mode 🧘
                        </button>
                        <button
                            onClick={() => { setMode("timed"); setScore(0); setIsPlaying(false); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === "timed" ? "bg-sky-500 text-white shadow-lg" : "text-sky-300 hover:text-white"}`}
                        >
                            Time Attack ⏱️
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-6 perspective-500">
                        {bubbles.map((isPopped, i) => (
                            <motion.button
                                key={i}
                                whileTap={{ scale: 0.8 }}
                                onClick={() => popBubble(i)}
                                className={`aspect-square rounded-full relative shadow-inner overflow-hidden transition-all duration-200 ${isPopped
                                    ? "bg-sky-900/50 shadow-none scale-90"
                                    : "bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg hover:brightness-110"
                                    }`}
                            >
                                {/* 3D Highlight */}
                                {!isPopped && (
                                    <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 blur-[1px] rounded-full" />
                                )}
                                {/* Pop Effect */}
                                <AnimatePresence>
                                    {isPopped && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 1 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            className="absolute inset-0 bg-white rounded-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>

                    {/* Footer Controls */}
                    <div className="flex justify-center">
                        {mode === "timed" ? (
                            !isPlaying && timeLeft > 0 ? (
                                <button onClick={startGame} className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-sky-500/20 active:scale-95 transition-all">
                                    Start Game
                                </button>
                            ) : timeLeft === 0 ? (
                                <div className="text-center">
                                    <p className="text-white font-bold mb-2">Game Over! High Score: {highScore}</p>
                                    <button onClick={startGame} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 px-6 rounded-lg mx-auto transition-colors">
                                        <RotateCcw size={16} /> Play Again
                                    </button>
                                </div>
                            ) : null
                        ) : (
                            <button onClick={resetZen} className="text-sky-400 hover:text-white text-sm underline opacity-50 hover:opacity-100 transition-opacity">
                                Reset Sheet
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BubbleWrap;
