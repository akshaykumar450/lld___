import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const notes = [
    "You're Cute! 😘", "Love You! ❤️", "My Favorite! 🌟", "Hugs! 🤗",
    "Kiss Me! 💋", "Forever! ♾️", "Soulmate! 🦢", "Sunshine! ☀️"
];

const Balloon = ({ id, onPop }: { id: number; onPop: (id: number) => void }) => {
    const [popped, setPopped] = useState(false);
    const randomColor = ['bg-red-500', 'bg-rose-400', 'bg-pink-500', 'bg-purple-500'][id % 4];
    const delay = Math.random() * 5;
    const xPos = Math.random() * 80 + 10; // 10% to 90%
    const note = notes[id % notes.length];

    const handlePop = () => {
        if (popped) return;
        setPopped(true);
        onPop(id);

        // Mini confetti at balloon position
        // Note: Actual positioning would require refs, just doing global for effect simplicity
        confetti({
            particleCount: 20,
            spread: 30,
            origin: { y: 0.7 }, // Approximate
            colors: ['#fff', '#f43f5e']
        });
    };

    return (
        <AnimatePresence>
            {!popped && (
                <motion.div
                    initial={{ y: "120vh", x: `${xPos}%` }}
                    animate={{ y: "-100vh" }}
                    transition={{ duration: 15, delay: delay, ease: "linear", repeat: Infinity }}
                    className="absolute bottom-0 cursor-pointer group"
                    onClick={handlePop}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* Balloon Shape */}
                    <div className={`w-24 h-32 ${randomColor} rounded-[50%] rounded-b-[45%] relative shadow-lg opacity-90 backdrop-blur-sm border-r-4 border-white/20`}>
                        {/* Shine */}
                        <div className="absolute top-4 left-4 w-4 h-8 bg-white/40 rounded-full rotate-[-45deg]" />

                        {/* String */}
                        <div className="absolute -bottom-12 left-1/2 w-0.5 h-12 bg-white/50 origin-top animate-wave" />

                        {/* Text (Hidden until hover?) No, showing it makes it clickable */}
                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/20 select-none group-hover:text-white/50 transition-colors">
                            ?
                        </div>
                    </div>
                </motion.div>
            )}
            {popped && (
                <motion.div
                    initial={{ scale: 0, opacity: 1, x: `${xPos}%`, y: "50vh" }} // Simplified pos
                    animate={{ scale: 1.5, opacity: 0, y: "-20vh" }}
                    transition={{ duration: 1 }}
                    className="absolute pointer-events-none font-bold text-2xl text-rose-300 whitespace-nowrap z-20"
                    style={{ left: `${xPos}%`, top: '50%' }} // Centered fallback
                >
                    {note}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const BalloonPop = () => {
    const [poppedCount, setPoppedCount] = useState(0);
    const [balloons, setBalloons] = useState(Array.from({ length: 15 }, (_, i) => i));

    const handlePop = (id: number) => {
        setPoppedCount(prev => prev + 1);
        // Respawn logic or just removal? Let's generic respawn
        setTimeout(() => {
            setBalloons(prev => [...prev.filter(b => b !== id), id + 100]); // New ID
        }, 1000);
    };

    return (
        <section className="py-20 px-4 min-h-[600px] relative overflow-hidden bg-gradient-to-b from-sky-900 to-neutral-900 border-t border-white/10">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 text-rose-200/20 text-9xl">☁️</div>
                <div className="absolute top-40 right-20 text-rose-200/10 text-8xl">☁️</div>
            </div>

            <div className="relative z-10 text-center mb-12">
                <h2 className="font-display text-5xl text-rose-300 drop-shadow-lg mb-4">Pop My Heart! 🎈</h2>
                <p className="text-white/70 text-lg">Catch the flying balloons for a surprise.</p>
                <div className="mt-4 inline-block bg-white/10 px-6 py-2 rounded-full border border-white/20">
                    <span className="text-2xl font-bold text-white">{poppedCount}</span> <span className="text-rose-200">Love Notes Found</span>
                </div>
            </div>

            {/* Balloon Container */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Re-enable pointer events for balloons */}
                <div className="w-full h-full relative pointer-events-auto">
                    {balloons.map(id => (
                        <Balloon key={id} id={id} onPop={handlePop} />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default BalloonPop;
