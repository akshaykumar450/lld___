import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Copy, Check, Sparkles } from "lucide-react";
import { funZoneData } from "@/data/funZoneData";
import { playClick, playKeyClick } from "@/utils/audio";

const moods = [
    { id: "cute", label: "Cute", icon: "🎀", emojis: ["✨", "🥺", "👉👈", "💖", "🌸", "🎀"] },
    { id: "spicy", label: "Spicy", icon: "🌶️", emojis: ["🔥", "🥵", "😈", "💋", "🫦", "💦"] },
    { id: "angry", label: "Angry", icon: "🤬", emojis: ["😠", "💢", "😤", "🔪", "🛑", "💀"] },
    { id: "funny", label: "Funny", icon: "🤪", emojis: ["🤣", "🤡", "💀", "😹", "🍌", "💨"] },
];

const EmojiTranslator = () => {
    const [text, setText] = useState("");
    const [mood, setMood] = useState(moods[0]);
    const [copied, setCopied] = useState(false);

    // Translation Logic
    const translate = (input: string) => {
        if (!input) return "";

        let translated = input.split(" ").map(word => {
            const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
            // Direct lookup
            const direct = funZoneData.emojiDictionary[cleanWord as keyof typeof funZoneData.emojiDictionary];

            // 30% chance to just create a random mood emoji if no direct match? No, let's keep it readable.
            // But if it's a direct match, use it. 
            if (direct) return direct;

            return word;
        }).join(" ");

        // "Seasoning" based on mood - Randomly insert mood emojis
        // Split by space, and occasionally insert a mood emoji
        translated = translated.split(" ").map(word => {
            if (Math.random() > 0.7) { // 30% chance to append a mood emoji
                const randomMoodEmoji = mood.emojis[Math.floor(Math.random() * mood.emojis.length)];
                return `${word} ${randomMoodEmoji}`;
            }
            return word;
        }).join(" ");

        return translated;
    };

    const translatedText = translate(text);

    const handleCopy = () => {
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
        playClick();
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 font-sans relative">

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-pink-400 hover:text-pink-600 transition-colors">
                    <ArrowLeft className="mr-2" /> Arcade
                </Link>
            </header>

            <div className="mb-6 text-center">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">EMOJIFY 3000 🤖</h1>
                <p className="text-slate-400">Translate boring text into pure vibes.</p>
            </div>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">

                {/* Input */}
                <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-pink-100 min-h-[50vh] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-pink-400 font-bold uppercase tracking-wider text-sm">
                            <MessageCircle size={18} /> Human Text
                        </div>
                    </div>

                    <textarea
                        value={text}
                        onChange={(e) => { setText(e.target.value); playKeyClick(); }}
                        placeholder="Type something here (e.g., 'I love you so much')..."
                        className="flex-1 w-full text-lg md:text-xl text-slate-600 placeholder:text-slate-300 resize-none outline-none font-medium leading-relaxed"
                    />

                    {/* Mood Selector */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Select Vibe</label>
                        <div className="flex gap-2">
                            {moods.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => { setMood(m); playClick(); }}
                                    className={`
                                        flex-1 p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                                        ${mood.id === m.id
                                            ? "border-pink-500 bg-pink-50 text-pink-600 shadow-sm scale-105"
                                            : "border-slate-100 text-slate-400 hover:bg-slate-50"}
                                    `}
                                >
                                    <span className="text-2xl">{m.icon}</span>
                                    <span className="text-[10px] font-bold uppercase">{m.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-6 rounded-3xl shadow-2xl min-h-[50vh] flex flex-col text-white relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundImage: mood.id === 'spicy' ? 'linear-gradient(to bottom right, #ef4444, #b91c1c)' :
                            mood.id === 'angry' ? 'linear-gradient(to bottom right, #000000, #4c0519)' : // Black/Red for angry
                                mood.id === 'funny' ? 'linear-gradient(to bottom right, #facc15, #f97316)' : // Yellow/Orange
                                    'linear-gradient(to bottom right, #f472b6, #e11d48)' // Default Pink
                    }}
                >

                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm text-pink-100">
                            <Sparkles size={18} /> {mood.label} Output
                        </div>
                        <button
                            onClick={handleCopy}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                            title="Copy"
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto text-2xl md:text-3xl font-black leading-relaxed whitespace-pre-wrap relative z-10 drop-shadow-sm font-display">
                        {text ? translatedText : <span className="opacity-40 italic">Waiting for input... {mood.emojis[0]}</span>}
                    </div>

                </div>

            </div>
        </div>
    );
};


export default EmojiTranslator;
