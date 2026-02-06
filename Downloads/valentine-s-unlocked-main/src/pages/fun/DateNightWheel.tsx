import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, RefreshCw, Calendar, Sparkles } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playTick, playSuccess, playClick } from "@/utils/audio";

const DateNightWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<{ text: string, category: string } | null>(null);

    // Wheel configuration
    const numSlices = 12; // Visual slices (we pick random result logically, wheel is visual)
    const colors = ["#F43F5E", "#8B5CF6", "#F59E0B", "#10B981", "#3B82F6", "#EC4899"];

    const spin = () => {
        if (spinning) return;
        playClick();
        setSpinning(true);
        setResult(null);

        // Calculate physics
        const spins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full rotations
        const extraDeg = Math.floor(Math.random() * 360);
        const totalRotation = rotation + (spins * 360) + extraDeg;

        setRotation(totalRotation);

        // Simulate ticking sound
        let ticks = 0;
        const maxTicks = 20;
        const interval = setInterval(() => {
            if (ticks < maxTicks) {
                playTick();
                ticks++;
            } else {
                clearInterval(interval);
            }
        }, 150); // Simple interval for now, syncing perfectly with easing is complex without rAF

        // Pick result
        setTimeout(() => {
            setSpinning(false);
            const randomIdea = funZoneData.dateIdeas[Math.floor(Math.random() * funZoneData.dateIdeas.length)];
            setResult(randomIdea);
            playSuccess(); // TADA!

            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        }, 4000); // 4s spin duration matching CSS
    };

    return (
        <div className="min-h-screen bg-[#1F2937] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950" />

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">ROMANCE ROULETTE</h1>
                    <p className="text-gray-400">Can't decide? Let fate choose your date.</p>
                </div>

                {/* Wheel Container */}
                <div className="relative mb-12">
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20">
                        <div className="w-8 h-10 bg-white shadow-lg [clip-path:polygon(0%_0%,100%_0%,50%_100%)] drop-shadow-xl" />
                    </div>

                    {/* The Wheel */}
                    <motion.div
                        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-8 border-white shadow-2xl relative overflow-hidden bg-white"
                        animate={{ rotate: rotation }}
                        transition={{ duration: 4, ease: [0.15, 0.25, 0.25, 1] }} // Bezier for realistic spin
                    >
                        {/* Slices */}
                        {Array.from({ length: numSlices }).map((_, i) => {
                            const rotate = (360 / numSlices) * i;
                            const skew = 90 - (360 / numSlices);
                            // Simple CSS conic gradient simulation using borders would be complex, 
                            // so we use rotated divs as segments
                            return (
                                <div
                                    key={i}
                                    className="absolute top-0 right-0 w-[50%] h-[50%] origin-bottom-left"
                                    style={{
                                        backgroundColor: colors[i % colors.length],
                                        transform: `rotate(${rotate}deg) skewY(-${skew}deg)`,
                                    }}
                                >
                                    {/* Text (approximate placement) */}
                                    <div
                                        className="absolute bottom-4 left-4 text-white/20 font-bold text-xl select-none"
                                        style={{ transform: `skewY(${skew}deg) rotate(15deg)` }}
                                    >
                                        ?
                                    </div>
                                </div>
                            );
                        })}

                        {/* Center Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
                            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                                <RefreshCw className={`text - white w - 6 h - 6 ${spinning ? "animate-spin" : ""} `} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Shadow */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/40 blur-xl rounded-full" />
                </div>

                {/* Controls & Result */}
                <div className="h-40 flex items-center justify-center w-full">
                    <AnimatePresence mode="wait">
                        {!result && !spinning && (
                            <motion.button
                                key="spin-btn"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={spin}
                                className="bg-yellow-500 hover:bg-yellow-400 text-yellow-950 text-xl font-bold py-4 px-12 rounded-full shadow-lg shadow-yellow-500/20 active:scale-95 transition-all"
                            >
                                SPIN THE WHEEL
                            </motion.button>
                        )}

                        {spinning && (
                            <motion.p
                                key="spinning-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-2xl font-bold text-white animate-pulse"
                            >
                                Spinning...
                            </motion.p>
                        )}

                        {result && (
                            <motion.div
                                key="result-card"
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm text-center relative"
                            >
                                {/* Confetti Burst */}
                                <motion.div
                                    className="absolute -top-4 -right-4 text-4xl"
                                    initial={{ scale: 0 }} animate={{ scale: 1.5, rotate: 30 }}
                                >
                                    🎉
                                </motion.div>

                                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                                    {result.category}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{result.text}</h3>

                                <button
                                    onClick={spin}
                                    className="mt-4 text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center justify-center gap-2 w-full transition-colors"
                                >
                                    <RefreshCw size={14} /> Spin Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default DateNightWheel;
