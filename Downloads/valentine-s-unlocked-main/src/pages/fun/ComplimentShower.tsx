import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CloudRain, Heart, Sparkles, Zap } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playClick, playSuccess, startRain, stopRain, playThunder } from "@/utils/audio";

// ... (interface Drop remains same) ...

const ComplimentShower = () => {
    const [drops, setDrops] = useState<Drop[]>([]);
    const [intensity, setIntensity] = useState(1); // 1 = Drizzle, 3 = Storm
    const [raining, setRaining] = useState(false);

    const handleToggleRain = () => {
        const newState = !raining;
        setRaining(newState);
        if (newState) {
            playSuccess();
            startRain(intensity);
        } else {
            playClick();
            stopRain();
        }
    };

    // Update rain sound when intensity changes while raining
    useEffect(() => {
        if (raining) {
            startRain(intensity);
        }
    }, [intensity]);

    // Cleanup on unmount
    useEffect(() => {
        return () => stopRain();
    }, []);

    const colors = ["text-teal-200", "text-pink-200", "text-yellow-200", "text-white"];

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (raining) {
            interval = setInterval(() => {
                // Spawn drops based on intensity
                const count = intensity;
                const newDrops: Drop[] = [];

                for (let i = 0; i < count; i++) {
                    newDrops.push({
                        id: Date.now() + Math.random(),
                        text: funZoneData.compliments[Math.floor(Math.random() * funZoneData.compliments.length)],
                        x: Math.random() * 80 + 10, // 10% to 90% width (safer bounds)
                        speed: Math.random() * 2 + 2,
                        delay: Math.random() * 0.5,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    });
                }

                setDrops(prev => [...prev, ...newDrops]);

                // Cleanup old drops (performance)
                setDrops(prev => prev.length > 50 ? prev.slice(-50) : prev);

                // Random Thunder in Storm Mode
                if (intensity >= 5 && Math.random() < 0.05) {
                    playThunder();
                }

            }, 800 / intensity);
        }

        return () => clearInterval(interval);
    }, [raining, intensity]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col p-6 relative overflow-hidden font-sans">

            <header className="absolute top-6 left-6 z-20">
                <Link to="/fun-zone" className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            {/* RAIN CONTAINER */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <AnimatePresence>
                    {drops.map(drop => (
                        <motion.div
                            key={drop.id}
                            initial={{ y: -50, opacity: 0, x: "-50%" }}
                            animate={{ y: "110vh", opacity: 1, x: "-50%" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: drop.speed, delay: drop.delay, ease: "linear" }}
                            style={{ left: `${drop.x}%` }}
                            className={`absolute text-lg md:text-2xl font-bold font-display ${drop.color} whitespace-nowrap drop-shadow-md`}
                        >
                            {drop.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="z-20 w-full max-w-2xl mx-auto mt-20 text-center flex-1 flex flex-col justify-end pb-20">

                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4">
                    LOVE SHOWER
                </h1>
                <p className="text-slate-400 mb-12">Soak up the affection. You deserve it.</p>

                {/* Controls */}
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-3xl shadow-xl">

                    <div className="flex items-center justify-between gap-8 mb-8">
                        <button
                            onClick={() => setIntensity(1)}
                            className={`p-4 rounded-xl flex-1 transition-all ${intensity === 1 ? "bg-teal-500/20 text-teal-300 border border-teal-500/50" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
                        >
                            <CloudRain className="mx-auto mb-2" size={24} />
                            <span className="text-xs font-bold uppercase">Drizzle</span>
                        </button>
                        <button
                            onClick={() => setIntensity(2)}
                            className={`p-4 rounded-xl flex-1 transition-all ${intensity === 2 ? "bg-teal-500/20 text-teal-300 border border-teal-500/50" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
                        >
                            <CloudRain className="mx-auto mb-2" size={32} />
                            <span className="text-xs font-bold uppercase">Rain</span>
                        </button>
                        <button
                            onClick={() => setIntensity(5)}
                            className={`p-4 rounded-xl flex-1 transition-all ${intensity === 5 ? "bg-teal-500/20 text-teal-300 border border-teal-500/50" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
                        >
                            <Zap className="mx-auto mb-2" size={32} />
                            <span className="text-xs font-bold uppercase">Storm</span>
                        </button>
                    </div>

                    <button
                        onClick={handleToggleRain}
                        className={`w-full py-4 rounded-xl font-black text-xl tracking-widest transition-all transform active:scale-95 ${raining
                            ? "bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/30"
                            : "bg-teal-500 hover:bg-teal-400 text-teal-950 shadow-lg shadow-teal-500/20"
                            }`}
                    >
                        {raining ? "STOP RAIN" : "START SHOWER"}
                    </button>

                </div>

                {/* Cute Umbrella visual at bottom */}
                {raining && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mx-auto mt-8 text-6xl"
                    >
                        ☔
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default ComplimentShower;
