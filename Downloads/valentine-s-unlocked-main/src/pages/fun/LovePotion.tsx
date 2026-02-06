import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FlaskConical, Plus } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playClick, playMagic, playHum } from "@/utils/audio";

const ingredients = [
    { id: "hugs", name: "Warm Hugs", icon: "🫂", color: "#fb923c" }, // Orange
    { id: "kisses", name: "Sweet Kisses", icon: "💋", color: "#f43f5e" }, // Rose
    { id: "stardust", name: "Stardust", icon: "✨", color: "#fde047" }, // Yellow
    { id: "moonlight", name: "Moonlight", icon: "🌙", color: "#60a5fa" }, // Blue
    { id: "chocolate", name: "Chocolate", icon: "🍫", color: "#78350f" }, // Brown
    { id: "laughter", name: "Laughter", icon: "😂", color: "#facc15" }, // Yellow
    { id: "flowers", name: "Rose Petals", icon: "🌹", color: "#e11d48" }, // Red
    { id: "music", name: "Love Songs", icon: "🎵", color: "#a855f7" }, // Purple
    { id: "cupid", name: "Cupid's Arrow", icon: "💘", color: "#ec4899" }, // Pink
    { id: "magic", name: "Magic Dust", icon: "🪄", color: "#d8b4fe" }, // Light Purple
    { id: "fire", name: "Passion Fire", icon: "🔥", color: "#ef4444" }, // Red
    { id: "frog", name: "Frog Legs", icon: "🐸", color: "#16a34a" }, // Green
];

const LovePotion = () => {
    const [selected, setSelected] = useState<typeof ingredients>([]);
    const [brewing, setBrewing] = useState(false);
    const [result, setResult] = useState("");
    const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

    const addIngredient = (ing: typeof ingredients[0]) => {
        if (brewing || selected.length >= 3) return;

        if (selected.find(i => i.id === ing.id)) {
            setSelected(selected.filter(i => i.id !== ing.id));
            playClick();
        } else {
            setSelected([...selected, ing]);
            playClick();
        }
    };

    const brew = () => {
        if (selected.length < 2) return;
        setBrewing(true);
        setResult("");
        playHum(3);

        // Generate smoke particles
        const newParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 50
        }));
        setParticles(newParticles);

        setTimeout(() => {
            setBrewing(false);
            const randomOutcome = funZoneData.potionResults[Math.floor(Math.random() * funZoneData.potionResults.length)];
            setResult(randomOutcome);
            setParticles([]); // Clear particles
            setSelected([]);
            playMagic();
        }, 3000);
    };

    // Calculate mixed color
    const liquidColor = selected.length === 0
        ? "#475569" // Slate-600 default
        : selected.length === 1
            ? selected[0].color
            : selected[selected.length - 1].color; // Simplified mixing visual

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30" />

            {/* Ambient floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: Math.random() * 1000 }}
                        animate={{ opacity: [0, 0.5, 0], y: -100, x: Math.random() * 40 - 20 }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                        style={{ left: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-purple-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative z-10">

                {/* Ingredients Shelf */}
                <div className="order-2 md:order-1 bg-slate-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <h2 className="text-white font-bold mb-6 flex items-center gap-2 text-xl">
                        <FlaskConical className="text-purple-400" />
                        <span>Pantry</span>
                        <span className="text-xs text-slate-400 font-normal ml-auto">Pick 2 or 3</span>
                    </h2>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {ingredients.map(ing => {
                            const isSelected = selected.find(i => i.id === ing.id);
                            return (
                                <motion.button
                                    key={ing.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addIngredient(ing)}
                                    className={`
                                        flex flex-col items-center justify-center p-3 rounded-xl border transition-all aspect-square
                                        ${isSelected
                                            ? "bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                            : "bg-slate-800/50 border-white/5 hover:bg-slate-700 hover:border-white/20"}
                                    `}
                                >
                                    <span className="text-3xl mb-1">{ing.icon}</span>
                                    <span className="text-[10px] text-center text-slate-300 font-medium leading-tight">{ing.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Cauldron Area */}
                <div className="order-1 md:order-2 flex flex-col items-center justify-center relative min-h-[400px]">

                    {/* Flying Ingredients Animation Area */}
                    <AnimatePresence>
                        {selected.map((ing, i) => (
                            <motion.div
                                key={`${ing.id}-drop`}
                                initial={{ opacity: 1, y: -200, scale: 0.5, x: (i - 1) * 50 }}
                                animate={{ y: 0, scale: 0, opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeIn", delay: 0.1 }}
                                className="absolute top-1/2 left-1/2 z-20 text-4xl pointer-events-none"
                            >
                                {ing.icon}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Smoke Particles */}
                    {brewing && particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.6, 0], y: -150, x: p.x, scale: 2 }}
                            transition={{ duration: 2, ease: "easeOut", delay: Math.random() * 0.5 }}
                            className="absolute top-1/4 left-1/2 z-20 w-8 h-8 rounded-full bg-slate-400/30 blur-md pointer-events-none"
                        />
                    ))}

                    {/* Cauldron */}
                    <div className="relative mt-20">
                        {/* Rim */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-6 bg-slate-700 rounded-full z-10 border-b border-slate-900 shadow-lg" />

                        {/* Pot Body */}
                        <div className="w-44 h-40 bg-slate-800 rounded-b-[5rem] rounded-t-xl relative border-l-4 border-r-4 border-b-8 border-slate-900 overflow-hidden shadow-2xl mx-auto">

                            {/* Liquid */}
                            <motion.div
                                animate={{
                                    height: selected.length === 0 ? "20%" : selected.length === 1 ? "40%" : selected.length === 2 ? "60%" : "85%",
                                    backgroundColor: liquidColor
                                }}
                                className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                            >
                                {/* Bubbles */}
                                {(brewing || selected.length > 0) && (
                                    <div className="absolute inset-0 w-full h-full">
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ y: [0, -60], opacity: [0, 1, 0] }}
                                                transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }}
                                                className="absolute w-2 h-2 bg-white/30 rounded-full"
                                                style={{ left: `${Math.random() * 100}%`, bottom: "10%" }}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="absolute top-0 w-full h-2 bg-white/10" />
                            </motion.div>
                        </div>

                        {/* Feet */}
                        <div className="absolute -bottom-2 left-2 w-6 h-8 bg-slate-900 -rotate-12 rounded-b-lg" />
                        <div className="absolute -bottom-2 right-2 w-6 h-8 bg-slate-900 rotate-12 rounded-b-lg" />
                    </div>

                    {/* Controls / Result */}
                    <div className="min-h-[100px] flex items-center justify-center mt-8 w-full z-30">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="text-center bg-slate-800/90 backdrop-blur-md p-6 rounded-2xl border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] max-w-sm"
                                >
                                    <div className="text-5xl mb-3">🔮</div>
                                    <h3 className="text-xl font-bold text-purple-200 mb-1">Potion Result:</h3>
                                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">{result}</p>
                                    <button onClick={() => { setSelected([]); setResult(""); }} className="text-sm text-slate-400 hover:text-white underline pb-1">
                                        Mix Another
                                    </button>
                                </motion.div>
                            ) : (
                                <button
                                    onClick={brew}
                                    disabled={selected.length < 2 || brewing}
                                    className={`
                                        w-full max-w-xs py-4 rounded-xl font-black uppercase tracking-widest transition-all transform active:scale-95 border-b-4
                                        ${selected.length >= 2
                                            ? "bg-purple-500 hover:bg-purple-400 text-white border-purple-700 shadow-purple-500/30 shadow-lg"
                                            : "bg-slate-800 text-slate-600 border-slate-900 cursor-not-allowed"}
                                    `}
                                >
                                    {brewing ? "Brewing..." : selected.length === 0 ? "Add Ingredients" : "Mix Potion"}
                                </button>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default LovePotion;
