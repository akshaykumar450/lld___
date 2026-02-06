import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FinalCinematic = () => {
    const [phase, setPhase] = useState<'IDLE' | 'PROLOGUE' | 'CONSTELLATION' | 'CREDITS'>('IDLE');
    const [stars, setStars] = useState<{ x: number, y: number, id: number, connected: boolean }[]>([]);
    const [connectedCount, setConnectedCount] = useState(0);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    // --- PHASE 1: PROLOGUE ---
    const startCinematic = () => {
        setPhase('PROLOGUE');
    };

    // --- PHASE 2: CONSTELLATION SETUP ---
    useEffect(() => {
        if (phase === 'CONSTELLATION') {
            // Create a heart shape of stars
            const newStars = [];
            for (let i = 0; i < 15; i++) {
                // Heart formula roughly
                const t = (Math.PI * i) / 8; // Distribute points
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                // Scaled down drastically (multiplier 3.5)
                newStars.push({ x: x * 3.5 + 50, y: y * 3.5 + 50, id: i, connected: false });
            }
            setStars(newStars);
        }
    }, [phase]);

    const connectStar = (id: number) => {
        setStars(prev => prev.map(s => s.id === id ? { ...s, connected: true } : s));
        setConnectedCount(prev => {
            const newCount = prev + 1;
            if (newCount >= 15) { // Require ALL stars
                setTimeout(() => setPhase('CREDITS'), 500); // Faster transition
            }
            return newCount;
        });
    };

    // --- PHASE 4: RUNAWAY BUTTON ---
    const moveNoButton = () => {
        setNoBtnPos({
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100
        });
    };

    if (phase === 'IDLE') {
        return (
            <section className="py-24 flex items-center justify-center bg-black">
                <button
                    onClick={startCinematic}
                    className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-500 via-purple-500 to-rose-500 opacity-20 group-hover:opacity-40 animate-gradient-xy"></span>
                    <span className="relative z-10 text-rose-200 font-display text-2xl tracking-widest uppercase">
                        Start The Finale 🎬
                    </span>
                </button>
            </section>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black text-rose-50 overflow-hidden flex flex-col items-center justify-center">

            {/* --- PHASE 1: PROLOGUE --- */}
            <AnimatePresence>
                {phase === 'PROLOGUE' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-2xl text-center space-y-12 p-8"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="text-2xl md:text-4xl font-light text-rose-200/80"
                        >
                            "Look how far we have come..."
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
                            className="text-xl md:text-3xl font-light text-rose-200/60"
                        >
                            From strangers on Instagram...
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5 }}
                            className="text-xl md:text-3xl font-light text-rose-200/60"
                        >
                            To soulmates in Tokyo.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7 }}
                            onClick={() => setPhase('CONSTELLATION')}
                            className="mt-12 text-sm text-rose-500 uppercase tracking-[0.3em] hover:text-rose-300 transition-colors"
                        >
                            Continue ➜
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- PHASE 2: CONSTELLATION --- */}
            {phase === 'CONSTELLATION' && (
                <motion.div className="relative w-full max-w-lg aspect-square">
                    <h3 className="absolute -top-20 w-full text-center text-rose-500/50 text-xl tracking-widest animate-pulse">CONNECT THE STARS</h3>

                    {/* SVG LINES for connectivity */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {stars.map((star, i) => {
                            if (i === 0) return null;
                            const prev = stars[i - 1];
                            return (
                                <motion.line
                                    key={i}
                                    x1={prev.x + "%"} y1={prev.y + "%"}
                                    x2={star.x + "%"} y2={star.y + "%"}
                                    stroke="rgba(244, 63, 94, 0.5)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: star.connected && prev.connected ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            );
                        })}
                        {/* Close the loop */}
                        {stars.length > 0 && (
                            <motion.line
                                x1={stars[stars.length - 1].x + "%"} y1={stars[stars.length - 1].y + "%"}
                                x2={stars[0].x + "%"} y2={stars[0].y + "%"}
                                stroke="rgba(244, 63, 94, 0.5)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: stars[stars.length - 1].connected && stars[0].connected ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </svg>

                    {stars.map((star, i) => (
                        <motion.div
                            key={star.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, x: star.x + "%", y: star.y + "%" }}
                            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${star.connected ? 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,1)] scale-110' : 'bg-white/20 hover:bg-white/40'}`}
                            onClick={() => connectStar(star.id)}
                            style={{ left: star.x + '%', top: star.y + '%' }}
                        >
                            <div className={`w-1.5 h-1.5 bg-white rounded-full ${star.connected ? 'animate-none' : 'animate-pulse'}`} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* --- PHASE 3: CREDITS (THE GRAND REVEAL) --- */}
            {phase === 'CREDITS' && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center relative overscroll-none"
                >
                    {/* Fireworks Effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-rose-500 rounded-full"
                                initial={{ x: "50vw", y: "100vh" }}
                                animate={{
                                    x: Math.random() * 100 + "vw",
                                    y: Math.random() * 50 + "vh",
                                    scale: [0, 3, 0],
                                    opacity: [1, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                            />
                        ))}
                    </div>

                    <div className="text-center space-y-12 z-10 animate-slide-up px-4">
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "backOut" }}
                            className="text-5xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-t from-rose-500 to-rose-200 drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]"
                        >
                            HAPPY VALENTINES!
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="space-y-6"
                        >
                            <p className="text-rose-400 text-sm tracking-[0.5em] uppercase">Starring</p>
                            <h2 className="text-5xl md:text-7xl font-handwriting text-white">Akshu & Babydoll</h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.5 }}
                            className="pt-12"
                        >
                            <p className="text-white/40 text-sm tracking-widest italic">
                                "And so, their adventure continues..."
                            </p>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }}
                            onClick={() => window.location.reload()}
                            className="mt-20 text-white/10 hover:text-white/50 text-xs uppercase"
                        >
                            Replay Memory ↺
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default FinalCinematic;
