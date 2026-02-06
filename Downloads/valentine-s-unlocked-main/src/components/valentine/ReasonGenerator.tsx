import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A large pool of reasons (simulating 365 lines)
const reasons365 = [
    "Your smile is my favorite sun.", "You make coffee taste better.", "Your laugh is my favorite song.",
    "The way you hug me tight.", "How you listen to me.", "Your kindness to animals.",
    "Your silly dance moves.", "How you text me good morning.", "The sparkle in your eyes.",
    "You challenge me to grow.", "Reviewing food like a critic.", "Your warm hands.",
    "How you handle stress.", "Your distinct style.", "The way you say my name.",
    "Our inside jokes.", "Your patience.", "How you share your food.",
    "Your ambition.", "Your calmness.", "The way you smell.",
    "Your handwritten notes.", "How you defend your friends.", "Your movie taste.",
    "The way you look at me.", "Your intelligence.", "Your bad puns.",
    "How you make me feel safe.", "Your sense of adventure.", "Your messy hair in the morning.",
    "Because you are my best friend.", "How you support my dreams.", "Your voice.",
    "The way you hold my hand.", "Your generosity.", "Your honesty.",
    "How you make me laugh when I'm mad.", "Your love for family.", "Your curiosity.",
    "The way you drive.", "Your singing voice (even if bad).", "Your optimism.",
    "How you remember small details.", "Your chaotic energy.", "Your quiet moments.",
    "Because you chose me.", "Because I chose you.", "Your cute sneeze.",
    "How you organize things.", "Your protectiveness.", "Your empathy.",
    "The way you breathe when sleeping.", "Your confidence.", "Your vulnerability.",
    "Because you get me.", "Your memes.", "Your loyalty.",
    "The future we are building.", "Every single day with you.", "365 Days of You."
    // ... intended to be 365 in spirit
];

const ReasonGenerator = () => {
    const [reason, setReason] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateReason = () => {
        setLoading(true);
        setReason(null);
        setTimeout(() => {
            const random = reasons365[Math.floor(Math.random() * reasons365.length)];
            setReason(random);
            setLoading(false);
        }, 800);
    };

    return (
        <section className="py-20 px-4 text-center bg-rose-50 border-t border-rose-100">
            <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-4xl text-rose-400 mb-2">365 Reasons Why 💖</h2>
                <p className="text-neutral-500 mb-8">Click to find out why I love you today.</p>

                <div className="relative min-h-[120px] mb-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xl text-rose-300 font-mono animate-pulse"
                            >
                                Searching my heart...
                            </motion.div>
                        ) : reason ? (
                            <motion.div
                                key="reason"
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-xl border border-rose-100 inline-block relative"
                            >
                                <span className="absolute -top-3 -left-3 text-3xl">❝</span>
                                <p className="font-handwriting text-3xl text-rose-500 px-8 leading-snug">
                                    {reason}
                                </p>
                                <span className="absolute -bottom-3 -right-3 text-3xl">❞</span>
                            </motion.div>
                        ) : (
                            <div className="text-neutral-300 italic">Press the button below...</div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    onClick={generateReason}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all flex items-center gap-2 mx-auto"
                >
                    <span className="text-2xl">🎰</span> Generate Reason
                </motion.button>
            </div>
        </section>
    );
};

export default ReasonGenerator;
