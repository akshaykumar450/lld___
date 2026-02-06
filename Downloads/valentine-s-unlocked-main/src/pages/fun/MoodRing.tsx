import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Fingerprint, Sparkles } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playHum, playMagic } from "@/utils/audio";

const MoodRing = () => {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<{ text: string, desc: string } | null>(null);

    const startScan = () => {
        if (scanning) return;
        setResult(null);
        setScanning(true);
        playHum(3); // Start scanner loop

        // Simulate scan duration
        setTimeout(() => {
            setScanning(false);
            const mood = funZoneData.moods[Math.floor(Math.random() * funZoneData.moods.length)];
            setResult(mood);
            playMagic(); // Success sound
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Aurora Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-purple-900/20 to-black pointer-events-none" />

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-violet-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            <div className="w-full max-w-md flex flex-col items-center text-center relative z-10">

                <h1 className="text-4xl font-thin text-white mb-2 tracking-[0.2em] uppercase">Soul Scanner</h1>
                <p className="text-violet-300/50 text-sm mb-12">Place your thumb to analyze your aura</p>

                {/* SCANNER AREA */}
                <div className="relative mb-12 group">

                    {/* Scanner Glow */}
                    <div className={`absolute inset-0 bg-violet-500/20 blur-3xl rounded-full transition-opacity duration-1000 ${scanning ? "opacity-100" : "opacity-0"}`} />

                    <button
                        onMouseDown={startScan}
                        onTouchStart={startScan}
                        className={`
              w-48 h-64 border-2 rounded-[3rem] flex items-center justify-center relative overflow-hidden transition-all duration-300
              ${scanning ? "border-violet-400 bg-violet-900/20 shadow-[0_0_50px_rgba(139,92,246,0.3)]" : "border-white/10 bg-white/5 hover:border-violet-500/50"}
            `}
                    >
                        {/* Scan Line */}
                        {scanning && (
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-violet-400 shadow-[0_0_20px_#8b5cf6]"
                            />
                        )}

                        <Fingerprint size={80} className={`transition-colors duration-300 ${scanning ? "text-violet-400" : "text-white/20 group-hover:text-white/40"}`} />
                    </button>

                    {!scanning && !result && (
                        <p className="mt-4 text-white/30 text-xs uppercase tracking-widest animate-pulse">Touch & Hold</p>
                    )}
                </div>

                {/* RESULT */}
                <div className="h-32 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {scanning && (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="text-violet-400 font-mono text-sm"
                            >
                                ANALYZING BIO-DATA...
                                <br />
                                CALIBRATING VIBES...
                            </motion.div>
                        )}

                        {result && !scanning && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-2"
                            >
                                <h2 className="text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                    {result.text}
                                </h2>
                                <div className="h-px w-12 bg-violet-500 mx-auto my-2" />
                                <p className="text-violet-300 font-light">"{result.desc}"</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default MoodRing;
