import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const questions = [
    {
        id: 1,
        text: "Who said 'I Love You' first? 💬",
        options: [
            { text: "Me (The Handsome One)", score: 10 },
            { text: "You (The Pretty One)", score: 10 },
            { text: "We said it together", score: 20 }
        ]
    },
    {
        id: 2,
        text: "What is my favorite thing about you? 🥺",
        options: [
            { text: "Your beautiful smile", score: 10 },
            { text: "Your kindness", score: 10 },
            { text: "Everything (Correct Answer)", score: 100 }
        ]
    },
    {
        id: 3,
        text: "Where do I want to take you one day? ✈️",
        options: [
            { text: "Paris under the stars", score: 10 },
            { text: "A cozy cabin in the woods", score: 10 },
            { text: "To the moon and back", score: 20 }
        ]
    },
    {
        id: 4,
        text: "What describes us best? 👩‍❤️‍👨",
        options: [
            { text: "Partners in Crime", score: 10 },
            { text: "Tom & Jerry", score: 10 },
            { text: "Soulmates", score: 20 }
        ]
    },
    {
        id: 5,
        text: "Who is the better cook? 🍳",
        options: [
            { text: "You (obviously)", score: 20 },
            { text: "Me (I try my best)", score: 10 },
            { text: "We order pizza", score: 10 }
        ]
    },
    {
        id: 6,
        text: "What do I do when you're sad? 😢",
        options: [
            { text: "Give you space", score: 0 },
            { text: "Hug you until you smile", score: 20 },
            { text: "Buy you chocolate", score: 10 }
        ]
    },
    {
        id: 7,
        text: "How much do I love you? 📏",
        options: [
            { text: "To the moon", score: 10 },
            { text: "More than pizza", score: 10 },
            { text: "Infinity & Beyond", score: 20 }
        ]
    },
    {
        id: 8,
        text: "What is my promise to you? 🤞",
        options: [
            { text: "To always be by your side", score: 20 },
            { text: "To do the dishes", score: 10 },
            { text: "To let you win arguments", score: 10 }
        ]
    },
    {
        id: 9,
        text: "If we were a movie, which genre? 🎬",
        options: [
            { text: "Romantic Comedy", score: 10 },
            { text: "Epic Romance", score: 20 },
            { text: "Action Adventure", score: 10 }
        ]
    },
    {
        id: 10,
        text: "Will you be my Valentine? 🌹",
        options: [
            { text: "YES!", score: 50 },
            { text: "Of course!", score: 50 },
            { text: "Always", score: 50 }
        ]
    }
];

const LoveQuiz = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (points: number) => {
        const newScore = score + points;
        setScore(newScore);

        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
        } else {
            setShowResult(true);
            fireConfetti();
        }
    };

    const fireConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#ffa500', '#ff69b4']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#ffa500', '#ff69b4']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <section className="py-20 px-4 max-w-2xl mx-auto text-center relative z-20">
            <h2 className="font-display text-5xl text-rose-200 mb-8 drop-shadow-lg">Love Quiz 📝</h2>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_0_30px_rgba(244,63,94,0.2)] min-h-[400px] flex flex-col justify-center relative overflow-hidden group">

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl -z-10 group-hover:bg-rose-500/30 transition-colors" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10 group-hover:bg-purple-500/30 transition-colors" />

                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key={currentQ}
                            initial={{ opacity: 0, x: 50, rotate: 1 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, x: -50, rotate: -1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold mb-4 tracking-widest border border-rose-500/30">
                                    QUESTION {currentQ + 1} / {questions.length}
                                </span>
                                <h3 className="text-3xl text-white font-bold leading-tight">{questions[currentQ].text}</h3>
                            </div>

                            <div className="grid gap-3">
                                {questions[currentQ].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt.score)}
                                        className="p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 border border-white/10 hover:border-transparent transition-all text-left group/btn flex items-center justify-between"
                                    >
                                        <span className="text-rose-100 group-hover/btn:text-white font-medium text-lg">{opt.text}</span>
                                        <span className="opacity-0 group-hover/btn:opacity-100 transform translate-x-4 group-hover/btn:translate-x-0 transition-all">💕</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center relative z-10"
                        >
                            <motion.div
                                className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center text-6xl mb-6 shadow-2xl relative"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <span className="relative z-10">🏆</span>
                                <div className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-50 animate-pulse" />
                            </motion.div>

                            <h3 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300 mb-2">
                                Certified Soulmate!
                            </h3>
                            <p className="text-rose-100/80 text-lg mb-8">
                                You passed with flying colors. <br />
                                Score: <strong className="text-white">100/100 (Perfect!)</strong>
                            </p>

                            <div className="bg-rose-500/20 p-6 rounded-2xl border border-rose-500/30 mb-8 transform rotate-1">
                                <p className="font-handwriting text-2xl text-rose-200">
                                    "It was never about the score. It was about us being on the same page, always." 💖
                                </p>
                            </div>

                            <button
                                onClick={() => { setShowResult(false); setCurrentQ(0); setScore(0); }}
                                className="text-sm text-white/40 hover:text-white underline transition-colors"
                            >
                                Retake Quiz
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LoveQuiz;
