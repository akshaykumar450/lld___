import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { passwordConfig } from "@/config/valentine.config";
import { Sparkles, Lock, Unlock, ArrowRight } from "lucide-react";

interface PasswordLockProps {
    dayId: string;
    onUnlock: () => void;
}

const PasswordLock = ({ dayId, onUnlock }: PasswordLockProps) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);

    const config = passwordConfig[dayId];

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (input.toLowerCase().trim() === config.password.toLowerCase()) {
            setIsUnlocking(true);
            setTimeout(onUnlock, 1500); // Wait for animation
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full"
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-rose-500/20 blur-[120px] rounded-full"
                    animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <AnimatePresence>
                {!isUnlocking ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        className="relative z-10 w-full max-w-md p-8"
                    >
                        {/* Lock Icon */}
                        <motion.div
                            className="flex justify-center mb-8"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-rose-500 blur-xl opacity-40 animate-pulse" />
                                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20 shadow-2xl">
                                    <Lock className="w-12 h-12 text-rose-300" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Riddle Card */}
                        <div className="text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-white to-rose-200 font-display">
                                    Locked
                                </h2>
                                <p className="text-rose-200/60 text-sm tracking-widest uppercase mt-2">
                                    Answer the riddle to enter
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                    <p className="text-lg text-rose-100 font-medium italic">
                                        "{config?.riddle || "Checking security..."}"
                                    </p>
                                </div>
                            </motion.div>

                            {/* Input Form */}
                            <motion.form
                                onSubmit={handleSubmit}
                                className="relative group"
                                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your answer here..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 pr-12 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all font-mono tracking-wider"
                                    autoFocus
                                />

                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-rose-500 text-white/50 hover:text-white rounded-lg transition-all"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.form>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm font-medium"
                                >
                                    Incorrect! Try again, love. ❤️
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-green-500/20 p-8 rounded-full backdrop-blur-lg border border-green-500/30 mb-8"
                        >
                            <Unlock className="w-16 h-16 text-green-400" />
                        </motion.div>
                        <h2 className="text-4xl font-bold text-white tracking-widest font-display">
                            UNLOCKED
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PasswordLock;
