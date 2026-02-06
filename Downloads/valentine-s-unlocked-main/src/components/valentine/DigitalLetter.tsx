import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayedText(text.substring(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, started]);

    return <span>{displayedText}</span>;
};

const DigitalLetter = () => {
    return (
        <section className="py-20 px-4 max-w-3xl mx-auto">
            <div className="relative bg-[#fffdf0] text-neutral-800 p-8 md:p-16 rounded-sm shadow-2xl rotate-1 group">
                {/* Real Paper Texture - Subtle */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none rounded-sm mix-blend-multiply" />

                {/* Floating Particles for 'Magic' feel */}
                <motion.div
                    className="absolute -top-4 -right-4 text-4xl"
                    animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    🕊️
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                >
                    <div className="text-right text-sm font-mono text-gray-500 mb-8 tracking-widest uppercase opacity-70">
                        12th Nov 2024 • My World Changed
                    </div>

                    <h2 className="font-handwriting text-5xl text-rose-600 mb-8 drop-shadow-sm">Babydoll 💌,</h2>

                    <div className="font-handwriting text-xl md:text-2xl leading-relaxed space-y-6 text-gray-800">
                        <Typewriter
                            speed={15}
                            delay={500}
                            text="I’ve been wanting to write this for a while… something you could open on nights you miss me, or on days you just want to feel wrapped in my love from words alone."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={3500}
                            text="From the day we met through your Instagram page, I never imagined that one conversation would turn into someone becoming my peace… my habit… my heart. You walked into my life softly, but you changed everything loudly."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={8000}
                            text="Your happy, passionate energy pulled me in first… but it was your cute baby nature that made me stay. The way you care, the way you help, the way you love so purely — it melts me every single time."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={13000}
                            text="And your eyes… God, your eyes. If love had a doorway, it would be your eyes — because every time I look into them, I feel like I’m home. 🫠 And those dimples when you smile? They’re dangerous. One smile from you and my entire world resets. 💘"
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={19000}
                            text="But if there’s one place where my heart fully surrendered to you… it was Tokyo. Living there together… those warm nights, fun chaotic days, and soft lovely evenings — it felt like life paused just to let me love you properly."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={24000}
                            text="Walking beside you… waking up knowing you’re there… laughing over nothing… holding you close — it made me realize something very deeply: Loving you isn’t just a feeling… It’s where I belong."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={29000}
                            text="I still replay the first time I saw you in real life at the metro station. Time slowed down… noise faded… and it was just you. Our first date… the waffles, the pancakes, the shy smiles across the table. 🧇✨ Your birthday celebrations… our endless happy talks… every memory with you feels warm, golden, alive."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={35000}
                            text="You don’t just make me happy, Babydoll… You fill spaces in me I didn’t even know were empty. When I’m with you, joy feels effortless. When you listen to me, I feel understood. When you love me… I feel unstoppable."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={40000}
                            text="And sometimes… when I hold you close… I wish time would just freeze right there. Because in those quiet moments — your head on my chest, my arms around you — the world outside stops mattering. It’s just your warmth, your breath, your heartbeat syncing with mine. ❤️🔥"
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={46000}
                            text="I dream about our future more than I admit… Traveling the world together ✈️ Then coming back to a home that’s just ours — filled with laughter, late-night talks, stolen kisses, and the quiet comfort of simply existing in each other’s arms. 🏡💞"
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={52000}
                            text="And I promise you this — I’ll always try to be the man you feel safe with. The one who protects your heart. The one who cheers the loudest for your dreams. The one who loves you not just loudly… but consistently."
                        />
                        <br />
                        <Typewriter
                            speed={15}
                            delay={58000}
                            text="Because you’re not just my girlfriend, Babydoll… You’re my peace. 🌙 My happiness. ☀️ My safe place. 🫂 My home in a person. 🏠❤️"
                        />
                        <br />
                        <Typewriter
                            speed={20}
                            delay={64000}
                            text="And no matter where life takes us… You’ll always have me — Loving you, holding you, choosing you — Again and again."
                        />
                    </div>

                    <div className="mt-16 text-right">
                        <p className="font-handwriting text-3xl text-rose-600">Forever Yours,</p>
                        <div className="mt-4 inline-block transform -rotate-6 border-b-2 border-rose-500 pb-2">
                            <p className="font-handwriting text-4xl text-gray-800">Akshu ❤️✨</p>
                        </div>
                    </div>
                </motion.div>

                {/* Tape effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/50 rotate-2 backdrop-blur-sm shadow-sm opacity-80" />
            </div>
        </section>
    );
};

export default DigitalLetter;
