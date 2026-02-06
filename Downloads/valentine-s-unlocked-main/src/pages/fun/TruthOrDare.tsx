import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Repeat, Sparkles, Flame, Heart, MessageCircle } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playSwoosh, playClick } from "@/utils/audio";

const TruthOrDare = () => {
    const [currentCard, setCurrentCard] = useState<{ type: "Truth" | "Dare", text: string, category: string } | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [category, setCategory] = useState<"Soft" | "Deep" | "Spicy" | "Adult">("Soft");

    const pickCard = (type: "Truth" | "Dare") => {
        setIsFlipped(false);
        playClick(); // Select click

        // Tiny delay to reset flip animation
        setTimeout(() => {
            const pool = type === "Truth" ? funZoneData.truths : funZoneData.dares;

            // 1. Filter by Category
            const categoryPool = pool.filter(item => item.category === category);

            // 2. Filter out history, but if pool is empty/small, reset or fallback
            // If the filtered category pool empty? (Shouldn't happen if data exists)
            if (categoryPool.length === 0) return;

            const available = categoryPool.filter(q => !history.includes(q.text));

            // Fallback to full category pool if we've seen everything
            const selectionPool = available.length > 0 ? available : categoryPool;

            const selected = selectionPool[Math.floor(Math.random() * selectionPool.length)];

            setCurrentCard({ type, text: selected.text, category: selected.category });
            setHistory(prev => [...prev.slice(-10), selected.text]);
            setIsFlipped(true);
            playSwoosh(); // Flip swoosh sound
        }, 200);
    };

    return (
        <div className="min-h-screen bg-[#2A0A18] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-rose-900 opacity-50" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-purple-200 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            <div className="max-w-xl w-full relative z-10 flex flex-col items-center">

                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400 font-display mb-2 drop-shadow-lg">
                        TRUTH OR DARE
                    </h1>
                    <p className="text-purple-200/60 uppercase tracking-widest text-xs">Couple's Edition</p>
                </div>

                {/* Card Area */}
                <div className="h-[400px] w-full max-w-sm perspective-1000 relative mb-12">
                    <motion.div
                        className="w-full h-full relative preserve-3d transition-all duration-700"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                    >
                        {/* Front of Card (Selection Menu) */}
                        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 flex flex-col items-center justify-center shadow-2xl">
                            <p className="text-white/80 font-medium mb-8">Whose turn is it?</p>

                            <div className="grid grid-cols-1 gap-4 w-full">
                                <button
                                    onClick={() => pickCard("Truth")}
                                    className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105"
                                >
                                    <div className="flex items-center justify-center gap-3 relative z-10">
                                        <MessageCircle className="w-6 h-6" />
                                        <span className="text-2xl font-bold uppercase tracking-widest">Truth</span>
                                    </div>
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>

                                <div className="flex items-center justify-center gap-4 opacity-50">
                                    <div className="h-px bg-white/40 flex-1" />
                                    <span className="text-xs font-bold text-white uppercase">OR</span>
                                    <div className="h-px bg-white/40 flex-1" />
                                </div>

                                <button
                                    onClick={() => pickCard("Dare")}
                                    className="group relative overflow-hidden bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105"
                                >
                                    <div className="flex items-center justify-center gap-3 relative z-10">
                                        <Flame className="w-6 h-6" />
                                        <span className="text-2xl font-bold uppercase tracking-widest">Dare</span>
                                    </div>
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Back of Card (The Question) */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-[40px] p-8 flex flex-col items-center justify-center shadow-2xl text-center border-8 border-white">

                            {/* Type Badge */}
                            <div className={`
                                absolute top-8 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-md
                                ${currentCard?.type === "Truth" ? "bg-indigo-500" : "bg-rose-500"}
                            `}>
                                {currentCard?.category} {currentCard?.type}
                            </div>

                            {/* Decorative Icon */}
                            <div className="mb-6 opacity-10">
                                {currentCard?.type === "Truth" ? <MessageCircle size={120} /> : <Flame size={120} />}
                            </div>

                            {/* The Text */}
                            <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                                {currentCard?.text}
                            </p>

                            {/* Action */}
                            <button
                                onClick={() => setIsFlipped(false)}
                                className="absolute bottom-8 text-sm font-bold text-slate-400 hover:text-slate-800 flex items-center gap-2 transition-colors"
                            >
                                <Repeat size={16} /> Choose Again
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-full">
                    {["Soft", "Deep", "Spicy", "Adult"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => { setCategory(tag as any); playClick(); }}
                            className={`
                                flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all duration-300 transform
                                ${category === tag
                                    ? "bg-white text-purple-900 border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] font-bold"
                                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/30 hover:text-white"
                                }
                            `}
                        >
                            {tag === "Soft" && <Sparkles size={14} />}
                            {tag === "Deep" && <Heart size={14} />}
                            {tag === "Spicy" && <Flame size={14} />}
                            {tag === "Adult" && <span className="text-xs">🔞</span>}
                            <span className="text-sm">{tag}</span>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TruthOrDare;
