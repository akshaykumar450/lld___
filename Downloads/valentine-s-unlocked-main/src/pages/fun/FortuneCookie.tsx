import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Stars, Copy } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playShatter, playCrumble, playMagic, playClick } from "@/utils/audio";

const FortuneCookie = () => {
    const [state, setState] = useState<"jar" | "whole" | "cracked">("jar");
    const [fortune, setFortune] = useState("");
    const [shake, setShake] = useState(0);

    const pickCookie = () => {
        playClick();
        setState("whole");
        // Pick random fortune
        const random = funZoneData.fortunes[Math.floor(Math.random() * funZoneData.fortunes.length)];
        setFortune(random);
    };

    const crackCookie = () => {
        if (state !== "whole") return;
        setShake(prev => prev + 1);
        playShatter(); // Heavy Pot/Cookie Break

        // Simulate tap-to-crack feel 
        if (navigator.vibrate) navigator.vibrate([50, 20]);

        setTimeout(() => {
            setState("cracked");
            playCrumble(); // Debris sound
            playMagic(); // Sparkle on reveal
            if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
        }, 400); // Quick delay for animation
    };

    const reset = () => {
        setState("jar");
        setFortune("");
    };

    return (
        <div className="min-h-screen bg-[#FDF6E3] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] pointer-events-none" />

            {/* Floating Chinese Knots / Lanterns (CSS decoration) */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-10 w-16 h-64 bg-red-600/10 rounded-b-full blur-3xl"
            />

            <header className="absolute top-6 left-6 z-10 text-orange-900">
                <Link to="/fun-zone" className="flex items-center hover:opacity-70 transition-opacity">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            <div className="max-w-md w-full text-center relative z-10">

                <h1 className="text-4xl font-serif text-amber-900 mb-2 font-bold tracking-tight">Destiny Bakery</h1>
                <p className="text-amber-800/60 mb-12">Tap to discover what the stars hold.</p>

                <div className="h-[400px] flex items-center justify-center relative perspective-container">
                    <AnimatePresence mode="wait">

                        {/* STATE: JAR SELECTION */}
                        {state === "jar" && (
                            <motion.div
                                key="jar"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                                className="cursor-pointer group"
                                onClick={pickCookie}
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: [0, 2, -2, 0] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        className="text-[150px] leading-none filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                                    >
                                        🏺
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-1 rounded-full text-sm text-amber-800 font-medium whitespace-nowrap"
                                    >
                                        Tap to pick a cookie
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {/* STATE: WHOLE COOKIE */}
                        {state === "whole" && (
                            <motion.div
                                key="whole"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0, rotate: shake * 10 }}
                                exit={{ opacity: 0 }}
                                className="cursor-pointer"
                                onClick={crackCookie}
                            >
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className="text-[180px] leading-none filter drop-shadow-xl"
                                >
                                    🥠
                                </motion.div>
                                <p className="mt-8 text-amber-800 font-medium animate-pulse">Tap to crack open!</p>
                            </motion.div>
                        )}

                        {/* STATE: CRACKED RESULT */}
                        {state === "cracked" && (
                            <motion.div
                                key="cracked"
                                className="relative w-full"
                            >
                                {/* Crumbled Cookie Parts */}
                                <motion.div
                                    initial={{ rotate: 0, x: 0 }}
                                    animate={{ rotate: -25, x: -60, opacity: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-0 left-[20%] text-[100px] leading-none pointer-events-none"
                                >
                                    🌛
                                </motion.div>
                                <motion.div
                                    initial={{ rotate: 0, x: 0 }}
                                    animate={{ rotate: 25, x: 60, opacity: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-0 right-[20%] text-[100px] leading-none pointer-events-none"
                                >
                                    🌜
                                </motion.div>

                                {/* The Paper Strip */}
                                <motion.div
                                    initial={{ scale: 0, rotateX: 90 }}
                                    animate={{ scale: 1, rotateX: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                    className="bg-white p-1 shadow-lg max-w-[320px] mx-auto rotate-1 relative z-20"
                                >
                                    {/* Inner border */}
                                    <div className="border border-amber-900/10 p-6 min-h-[120px] flex items-center justify-center flex-col gap-4">
                                        <p className="font-serif text-xl text-amber-900 leading-relaxed">
                                            "{fortune}"
                                        </p>
                                        <div className="flex gap-4 border-t border-amber-900/10 pt-4 w-full justify-center">
                                            <div className="text-[10px] uppercase tracking-widest text-amber-900/40">Lucky Numbers</div>
                                            <div className="font-mono text-xs text-amber-600 font-bold">
                                                {Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 1).join(" . ")}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    onClick={reset}
                                    className="mt-12 inline-flex items-center gap-2 bg-amber-800 text-white px-6 py-3 rounded-full hover:bg-amber-900 transition-colors shadow-lg"
                                >
                                    <RefreshCw size={18} /> Open Another
                                </motion.button>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FortuneCookie;
