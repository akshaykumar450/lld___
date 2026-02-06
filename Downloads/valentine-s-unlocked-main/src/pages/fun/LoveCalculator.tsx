import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Zap, Activity, Microscope, Share2 } from "lucide-react";
import { playHum, playSuccess, playClick } from "@/utils/audio"; // Import audio

const LoveCalculator = () => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [status, setStatus] = useState<"idle" | "scanning" | "analyzing" | "result">("idle");
    const [result, setResult] = useState<number>(0);
    const [insight, setInsight] = useState("");

    const insights = [
        { min: 90, text: "Soulmates! The stars aligned for this one. ✨" },
        { min: 80, text: "Incredible chemistry! You two are electric. ⚡" },
        { min: 70, text: "A beautiful match! Keep the spark alive. 💖" },
        { min: 60, text: "Solid potential! Build that foundation. 🧱" },
        { min: 50, text: "Opposites attract? Work on communication! 🗣️" },
        { min: 0, text: "A challenge... but love conquers all! 🛡️" },
    ];

    const calculate = () => {
        if (!name1 || !name2) return;
        playClick(); // Click sound
        setStatus("scanning");
        playHum(2); // Start scanning hum

        // Phase 1: Scanning
        setTimeout(() => {
            setStatus("analyzing");
            playClick(); // Stage change click
        }, 2000);

        // Phase 2: Result
        setTimeout(() => {
            // Deterministic calculation
            const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, "");
            let score = 0;
            for (let i = 0; i < combined.length; i++) {
                score += combined.charCodeAt(i);
            }
            const finalScore = (score % 61) + 40; // 40-100% range (be nice)

            setResult(finalScore);
            setInsight(insights.find(i => finalScore >= i.min)?.text || "Unique Match!");
            setStatus("result");
            playSuccess(); // Fanfare!
        }, 4500);
    };

    return (
        <div className="min-h-screen bg-rose-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500 rounded-full blur-[150px]"
                />
            </div>

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-rose-200 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Back to Arcade
                </Link>
            </header>

            <div className="max-w-md w-full relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-black/40 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 mb-4 shadow-lg shadow-rose-500/20">
                            <Microscope className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white font-display tracking-tight">LOVE LAB <span className="text-rose-500">9000</span></h1>
                        <p className="text-rose-200/60 text-sm mt-2">Quantum Compatibility Scanner</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {status === "idle" && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-rose-300 uppercase tracking-wider">Subject A</label>
                                    <input
                                        value={name1} onChange={e => setName1(e.target.value)}
                                        className="w-full bg-black/50 border border-rose-500/30 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500 transition-colors"
                                        placeholder="Enter Name..."
                                    />
                                </div>
                                <div className="flex justify-center -my-2 relative z-10">
                                    <div className="bg-rose-950 border border-rose-500/30 rounded-full p-2">
                                        <Zap className="w-4 h-4 text-rose-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-rose-300 uppercase tracking-wider">Subject B</label>
                                    <input
                                        value={name2} onChange={e => setName2(e.target.value)}
                                        className="w-full bg-black/50 border border-rose-500/30 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500 transition-colors"
                                        placeholder="Enter Name..."
                                    />
                                </div>
                                <button
                                    onClick={calculate}
                                    disabled={!name1 || !name2}
                                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    START ANALYSIS
                                </button>
                            </motion.div>
                        )}

                        {status === "scanning" && (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex flex-col items-center py-12"
                            >
                                <div className="relative w-32 h-32 mb-8">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-full h-full rounded-full border-4 border-t-rose-500 border-r-transparent border-b-rose-500 border-l-transparent opacity-50 absolute inset-0"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="w-24 h-24 rounded-full border-4 border-t-pink-500 border-r-transparent border-b-pink-500 border-l-transparent opacity-50 absolute inset-4"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Microscope className="w-10 h-10 text-rose-400 animate-pulse" />
                                    </div>
                                </div>
                                <p className="text-rose-200 font-mono text-sm animate-pulse">Scanning Bio-Rhythms...</p>
                            </motion.div>
                        )}

                        {status === "analyzing" && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="space-y-4 py-8"
                            >
                                <div className="space-y-4">
                                    {["Humor Patterns", "Love Language", "Emotional Range", "Pizza Preference"].map((item, i) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.5 }}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="text-rose-200">{item}</span>
                                            <span className="text-green-400 font-mono">MATCHED</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="h-2 bg-black/50 rounded-full overflow-hidden mt-6">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.5 }}
                                        className="h-full bg-rose-500"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {status === "result" && (
                            <motion.div
                                key="result"
                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="inline-block mb-6"
                                >
                                    <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-rose-200 drop-shadow-lg">
                                        {result}%
                                    </span>
                                </motion.div>

                                <h3 className="text-2xl font-bold text-white mb-2">{name1} + {name2}</h3>
                                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-8">
                                    <p className="text-rose-200 italic">"{insight}"</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => { setStatus("idle"); setName1(""); setName2(""); }}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors"
                                    >
                                        Test Another Pair
                                    </button>
                                    <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 rounded-xl transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default LoveCalculator;
