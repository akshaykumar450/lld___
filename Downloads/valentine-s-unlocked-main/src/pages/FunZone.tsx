import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Heart, Stars, Gift, Repeat, Music,
    Sparkles, Smile, Zap, RefreshCw, MessageCircle, ArrowLeft, Gamepad2, Volume2
} from "lucide-react";
import { playClick, playSuccess, initAudio } from "@/utils/audio";

const games = [
    { id: "love-calculator", name: "Love Lab", icon: Heart, color: "bg-rose-500", desc: "Scientific compatibility analysis" },
    { id: "bubble-wrap", name: "Heart Popper", icon: Zap, color: "bg-blue-500", desc: "Stress relief popping" },
    { id: "fortune-cookie", name: "Destiny Bakery", icon: Gift, color: "bg-orange-500", desc: "Crack open your future" },
    { id: "truth-or-dare", name: "Truth or Dare", icon: Repeat, color: "bg-purple-500", desc: "Spicy couple's edition" },
    { id: "date-wheel", name: "Romance Wheel", icon: RefreshCw, color: "bg-yellow-500", desc: "Spin to decide the night" },
    { id: "compliments", name: "Love Shower", icon: Sparkles, color: "bg-teal-500", desc: "Raining affection" },
    { id: "doodle", name: "Love Canvas", icon: Smile, color: "bg-indigo-500", desc: "Draw your heart out" },
    { id: "mood-ring", name: "Soul Scanner", icon: Stars, color: "bg-violet-500", desc: "Check your vibe" },
    { id: "potion-mixer", name: "Witch's Brew", icon: RefreshCw, color: "bg-green-500", desc: "Mix magical ingredients" },
    { id: "emoji-translator", name: "Emojify", icon: MessageCircle, color: "bg-pink-500", desc: "Translate text to cute" },
];

const FunZone = () => {
    return (
        <div className="min-h-screen bg-neutral-950 overflow-x-hidden p-6 pb-24 font-sans selection:bg-rose-500/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-12 relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Reality
                    </Link>

                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 shadow-lg shadow-rose-500/20 mb-4"
                        >
                            <Gamepad2 className="w-10 h-10 text-white" />
                        </motion.div>

                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 filter drop-shadow-sm font-display tracking-tight"
                        >
                            VALENTINE'S ARCADE
                        </motion.h1>
                        <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-6">
                            Welcome to the hidden game room. Select a cartridge to play.
                        </p>

                        {/* Audio Start Button */}
                        <button
                            onClick={() => { initAudio(); playSuccess(); }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 transition-all active:scale-95"
                            title="Click if sounds aren't playing"
                        >
                            <Volume2 size={16} />
                            <span>Sound Check</span>
                        </button>
                    </div>
                </header>

                {/* Game Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                    {games.map((game, i) => (
                        <Link key={game.id} to={`/fun-zone/${game.id}`} className="group relative block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="h-full bg-neutral-900 border border-white/10 rounded-3xl p-1 overflow-hidden hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-rose-500/10"
                            >
                                {/* Card Content */}
                                <div className="bg-neutral-900 h-full rounded-[20px] p-6 flex flex-col items-center text-center relative overflow-hidden">

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${game.color}`} />

                                    {/* Icon */}
                                    <div className={`w-20 h-20 rounded-2xl ${game.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <game.icon className="w-10 h-10 text-white" />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                                        {game.name}
                                    </h3>
                                    <p className="text-white/40 text-sm font-medium">
                                        {game.desc}
                                    </p>

                                    {/* Play Button visual */}
                                    <div className="mt-8 px-6 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:bg-white group-hover:text-black transition-all">
                                        Press Start
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Ambient Background */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-rose-900/20 blur-[120px] rounded-full mix-blend-screen" />
                </div>
            </div>
        </div>
    );
};

export default FunZone;
