import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SmutBook from './SmutBook';

const SecretVault = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pin, setPin] = useState("");
    const [showBook, setShowBook] = useState(false);

    // Scenarios for the spinner
    const SCENARIOS = [
        "Blindfolded surprise on video call...",
        "Send a photo that makes me blush immediately...",
        "Whisper your darkest desire in a voice note...",
        "Order me dinner online right now...",
        "Describe exactly what you'd do if you were here...",
        "Wear that one outfit I love on our next call...",
        "Truth or Dare: You pick the stakes...",
        "Send me a song that reminds you of *that* night...",
        "Watch a movie together while on video call...",
        "Tell me a secret you've never told anyone...",
        "Send a video of you dancing to our song...",
        "Plan our dream vacation in detail...",
        "Cook the same meal together on video call...",
        "Read me a bedtime story...",
        "Send a funny face selfie right now...",
        "Describe your dream date night...",
        "Tell me what you love most about me...",
        "Send a picture of your view right now...",
        "Write a poem for me...",
        "Send a voice note of you laughing...",
        "Do a virtual museum tour together...",
        "Play a game of 20 questions...",
        "Send a picture of something blue...",
        "Tell me about your childhood crush...",
        "Send a video of you singing...",
        "Describe your perfect day...",
        "Tell me your biggest fear...",
        "Send a picture of your favorite outfit...",
        "Tell me your favorite memory of us...",
        "Send a voice note saying 'I love you'...",
        "Do a virtual escape room together...",
        "Play a game of 'Never Have I Ever'...",
        "Send a picture of your breakfast...",
        "Tell me your favorite joke...",
        "Send a video of you working out...",
        "Describe your dream house...",
        "Tell me your favorite movie...",
        "Send a picture of your pet (if you have one)...",
        "Tell me your favorite book...",
        "Send a voice note of you humming...",
        "Do a virtual yoga session together...",
        "Play a game of 'Would You Rather'...",
        "Send a picture of your favorite snack...",
        "Tell me your favorite song...",
        "Send a video of you cooking...",
        "Describe your dream car...",
        "Tell me your favorite color...",
        "Send a picture of your shoe collection...",
        "Tell me your favorite animal...",
        "Send a voice note of you whispering...",
        "Do a virtual art class together...",
        "Play a game of 'Pictionary'...",
        "Send a picture of your favorite place...",
        "Tell me your favorite food...",
        "Send a video of you playing an instrument...",
        "Describe your dream job...",
        "Tell me your favorite sport...",
        "Send a picture of your favorite accessory...",
        "Tell me your favorite season...",
        "Send a voice note of you sighing...",
        "Do a virtual cooking class together...",
        "Play a game of 'Charades'...",
        "Send a picture of your favorite flower...",
        "Tell me your favorite drink...",
        "Send a video of you doing a magic trick...",
        "Describe your dream wedding...",
        "Tell me your favorite holiday...",
        "Send a picture of your favorite quote...",
        "Tell me your favorite scent...",
        "Send a voice note of you yawning...",
        "Do a virtual dance class together...",
        "Play a game of 'Trivia'...",
        "Send a picture of your favorite celebrity...",
        "Tell me your favorite TV show...",
        "Send a video of you doing an impression...",
        "Describe your dream city...",
        "Tell me your favorite dessert...",
        "Send a picture of your favorite artist...",
        "Tell me your favorite band...",
        "Send a voice note of you whistling...",
        "Do a virtual fitness class together...",
        "Play a game of 'Bingo'...",
        "Send a picture of your favorite brand...",
        "Tell me your favorite gadget...",
        "Send a video of you doing a backflip (or trying)...",
        "Describe your dream computer...",
        "Tell me your favorite app...",
        "Send a picture of your favorite website...",
        "Tell me your favorite emoji...",
        "Send a voice note of you groaning...",
        "Do a virtual wine tasting together...",
        "Play a game of 'Poker'...",
        "Send a picture of your favorite card game...",
        "Tell me your favorite board game...",
        "Send a video of you playing a video game...",
        "Describe your dream console...",
        "Tell me your favorite character...",
        "Send a picture of your favorite level...",
        "Tell me your favorite boss...",
        "Send a voice note of you shouting...",
        "Do a virtual karaoke session together...",
        "Play a game of 'Uno'...",
        "Send a picture of your favorite toy...",
        "Tell me your favorite hobby...",
        "Send a video of you doing a craft...",
        "Describe your dream project...",
        "Tell me your favorite tool...",
        "Send a picture of your favorite material...",
        "Tell me your favorite technique...",
        "Send a voice note of you humming a tune...",
        "Do a virtual DIY workshop together...",
        "Play a game of 'Scrabble'...",
        "Send a picture of your favorite word...",
        "Tell me your favorite letter...",
        "Send a video of you writing...",
        "Describe your dream pen...",
        "Tell me your favorite notebook...",
        "Send a picture of your favorite ink...",
        "Tell me your favorite font...",
        "Send a voice note of you reading...",
        "Do a virtual book club together...",
        "Play a game of 'Chess'...",
        "Send a picture of your favorite piece...",
        "Tell me your favorite move...",
        "Send a video of you thinking...",
        "Describe your dream strategy...",
        "Tell me your favorite player...",
        "Send a picture of your favorite match...",
        "Tell me your favorite tournament..."
    ];

    const [scenario, setScenario] = useState(SCENARIOS[0]);

    const spinScenario = () => {
        const random = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
        setScenario(random);
    };

    const CORRECT_PIN = "1211"; // Nov 12

    const handleNum = (num: string) => {
        if (pin.length < 4) {
            setPin(prev => prev + num);
        }
    };

    const handleClear = () => setPin("");

    const [redeemedCoupon, setRedeemedCoupon] = useState<{ emoji: string, text: string } | null>(null);

    const handleEnter = () => {
        if (pin === CORRECT_PIN) {
            setIsOpen(true);
        } else {
            setPin("");
            alert("Wrong PIN! Hint: When did we meet? (DDMM)");
        }
    };

    const handleRedeem = (coupon: { emoji: string, text: string }) => {
        setRedeemedCoupon(coupon);
    };

    const sendToWhatsApp = () => {
        if (!redeemedCoupon) return;
        const text = encodeURIComponent(`Hey Akshu 🫣\n\nI'm legally redeeming my coupon: *${redeemedCoupon.text}* ${redeemedCoupon.emoji}\n\nYou have 24 hours to comply. 😘`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <section className="py-20 px-4 flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="font-display text-4xl text-rose-200 mb-8">Top Secret 🔒</h2>

            <AnimatePresence mode="wait">
                {showBook ? (
                    <SmutBook key="book" onClose={() => setShowBook(false)} />
                ) : redeemedCoupon ? (
                    // REDEEM MODAL
                    <motion.div
                        key="redeem"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-neutral-900 border border-rose-500 p-8 rounded-3xl max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(244,63,94,0.3)]"
                    >
                        <button
                            onClick={() => setRedeemedCoupon(null)}
                            className="absolute top-4 right-4 text-rose-500 hover:text-white"
                        >✕</button>

                        <div className="text-6xl mb-6 animate-bounce">{redeemedCoupon.emoji}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{redeemedCoupon.text}</h3>
                        <p className="text-rose-200/60 mb-8 text-sm">Valid for one-time use only</p>

                        <div className="bg-white/5 p-4 rounded-xl border border-dashed border-rose-500/30 mb-8">
                            <p className="font-mono text-xs text-rose-400 mb-1">TICKET ID</p>
                            <p className="font-mono text-lg tracking-widest text-white">LOVE-{Math.floor(Math.random() * 9000) + 1000}</p>
                        </div>

                        <button
                            onClick={sendToWhatsApp}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-colors"
                        >
                            <span>Send to Him 📲</span>
                        </button>
                    </motion.div>
                ) : !isOpen ? (
                    // LOCK SCREEN
                    <motion.div
                        key="lock"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-neutral-800 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full"
                    >
                        <div className="mb-8 bg-black/50 p-4 rounded-xl text-center text-3xl font-mono tracking-[0.5em] text-rose-500 h-16 flex items-center justify-center">
                            {pin.padEnd(4, "•")}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                <button
                                    key={n}
                                    onClick={() => handleNum(n.toString())}
                                    className="h-16 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold transition-colors"
                                >
                                    {n}
                                </button>
                            ))}
                            <button onClick={handleClear} className="h-16 rounded-xl bg-rose-900/30 text-rose-400 font-bold">C</button>
                            <button onClick={() => handleNum("0")} className="h-16 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold">0</button>
                            <button onClick={handleEnter} className="h-16 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold">↵</button>
                        </div>
                        <p className="text-center text-white/30 text-xs mt-6">Hint: When did our world combine?</p>
                    </motion.div>
                ) : (
                    // VAULT CONTENT
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl w-full bg-neutral-900 border border-rose-500/30 p-8 rounded-3xl text-center"
                    >
                        <div className="text-6xl mb-4 animate-pulse">🔥</div>
                        <h3 className="font-display text-4xl text-rose-500 mb-2">After Dark</h3>
                        <p className="text-rose-200/60 mb-8 italic">"What happens here, stays here..."</p>

                        <div className="space-y-12">

                            {/* NEW: THE BOOK OF US */}
                            <div className="relative group cursor-pointer" onClick={() => setShowBook(true)}>
                                <div className="absolute inset-0 bg-rose-600/20 blur-xl group-hover:bg-rose-600/40 transition-all rounded-full" />
                                <div className="bg-neutral-800 border border-rose-500/50 p-6 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform relative z-10">
                                    <div className="text-left">
                                        <h4 className="text-2xl font-bold text-rose-400">📖 The Midnight Book</h4>
                                        <p className="text-white/50 text-sm">Read our private story...</p>
                                    </div>
                                    <span className="text-4xl">➜</span>
                                </div>
                            </div>

                            {/* 1. Naughty Coupons (Long Distance Edition) */}
                            <div>
                                <h4 className="text-xl font-bold text-rose-400 mb-4 border-b border-rose-500/20 pb-2 mx-auto max-w-xs">Redeem Online 🌐</h4>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[
                                        { emoji: "📹", text: "Private Video Show" },
                                        { emoji: "👑", text: "I Do What You Say" },
                                        { emoji: "🎙️", text: "Spicy Voice Note" },
                                        { emoji: "🫣", text: "Screen Share Roulette" },
                                        { emoji: "👗", text: "Outfit Rating (Live)" },
                                        { emoji: "🌶️", text: "Truth or Dare" }
                                    ].map((c, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => handleRedeem(c)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-rose-950/40 border border-rose-500/30 p-4 rounded-xl w-32 h-32 flex flex-col items-center justify-center gap-2 hover:bg-rose-900/40 transition-colors group"
                                        >
                                            <span className="text-3xl group-hover:scale-110 transition-transform">{c.emoji}</span>
                                            <span className="text-xs font-bold text-rose-200">{c.text}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Fantasy Generator */}
                            <div>
                                <h4 className="text-xl font-bold text-rose-400 mb-4 border-b border-rose-500/20 pb-2 mx-auto max-w-xs">Scenario Spinner</h4>
                                <div className="bg-black/40 p-6 rounded-2xl border border-rose-500/20 max-w-sm mx-auto">
                                    <p className="text-rose-100 font-handwriting text-xl min-h-[3rem] flex items-center justify-center">
                                        "{scenario}"
                                    </p>
                                    <button
                                        onClick={spinScenario}
                                        className="mt-4 text-xs text-rose-500 hover:text-rose-400 uppercase tracking-widest border border-rose-500/50 px-4 py-2 rounded-full hover:bg-rose-500/10 transition-colors"
                                    >
                                        Spin Again ↻
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => { setIsOpen(false); setPin(""); }}
                            className="mt-12 text-rose-500/50 hover:text-rose-500 underline text-sm"
                        >
                            Lock Vault
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SecretVault;
