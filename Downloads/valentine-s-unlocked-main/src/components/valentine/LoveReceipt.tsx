import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
    { item: "Cute Smile", price: "∞" },
    { item: "Warm Hugs", price: "Free" },
    { item: "Silly Jokes", price: "Daily" },
    { item: "Support", price: "100%" },
    { item: "Morning Coffee", price: "$5.00" },
    { item: "Late Night Talks", price: "Priceless" },
    { item: "Your laugh", price: "Music" },
    { item: "Patience", price: "Gold" },
    { item: "Adventure", price: "Go!" },
    { item: "Kindness", price: "Huge" }
];

const LoveReceipt = () => {
    const [items, setItems] = useState<{ id: number; text: string; price: string }[]>([
        { id: 1, text: "Stole my Heart", price: "Ticket" }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const printNext = () => {
        const next = reasons[Math.floor(Math.random() * reasons.length)];
        const newItem = {
            id: Date.now(),
            text: next.item,
            price: next.price
        };
        setItems(prev => [...prev, newItem]);
    };

    // Auto-scroll to bottom of receipt when new item printed
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [items]);

    return (
        <section className="py-20 bg-neutral-100 flex flex-col items-center justify-center relative overflow-hidden border-t border-rose-100">

            <div className="text-center mb-8 relative z-10">
                <h2 className="font-display text-4xl text-neutral-800 mb-2">Love Transaction 🧾</h2>
                <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase">Itemized Invoice of my Affection</p>
            </div>

            {/* PRINTER CONTAINER */}
            <div className="relative w-80">

                {/* Visual Printer Face */}
                <div className="absolute -top-4 left-0 right-0 h-16 bg-neutral-800 rounded-t-xl z-20 shadow-lg flex items-center justify-center border-b-4 border-neutral-900">
                    <div className="w-40 h-2 bg-black rounded-full" /> {/* Slot */}
                </div>

                {/* THE RECEIPT PAPER */}
                <div
                    className="bg-white mx-4 min-h-[400px] max-h-[500px] shadow-2xl relative pt-12 pb-20 px-6 font-mono text-sm leading-relaxed text-neutral-700 flex flex-col"
                    style={{
                        filter: "drop-shadow(0 20px 10px rgba(0,0,0,0.1))",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%) " // Fade out top slightly
                    }}
                >
                    {/* Paper Texture */}
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')]" />

                    {/* Receipt Header */}
                    <div className="text-center border-b-2 border-dashed border-neutral-300 pb-4 mb-4">
                        <h3 className="text-xl font-bold uppercase tracking-wider">OFFICIAL RECEIPT</h3>
                        <p className="text-xs mt-1">Date: 14/02/2026</p>
                        <p className="text-xs">Cashier: Cupid 🏹</p>
                    </div>

                    {/* Items List */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 no-scrollbar scroll-smooth space-y-2">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: -20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    className="flex justify-between items-end border-b border-dotted border-neutral-200 pb-1"
                                >
                                    <span className="uppercase">{item.text}</span>
                                    <span className="font-bold">{item.price}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Fake printing whitespace */}
                        <div className="h-12" />
                    </div>

                    {/* Receipt Footer */}
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-neutral-300 text-center">
                        <div className="flex justify-between font-bold text-lg mb-2">
                            <span>TOTAL</span>
                            <span>MY HEART ❤️</span>
                        </div>
                        <p className="text-[10px] uppercase">Thank you for being you!</p>
                        <div className="mt-2 w-full h-8 bg-neutral-800 text-white flex items-center justify-center text-xs tracking-[0.5em] font-bold barcode">
                            ||| || ||| | |||
                        </div>
                    </div>

                    {/* Jiggly Bottom Edge */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-white" style={{ clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)" }}></div>
                </div>

                {/* Print Button (Floating) */}
                <button
                    onClick={printNext}
                    className="absolute -right-16 top-1/2 -translate-y-1/2 bg-rose-500 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:bg-rose-600 hover:scale-110 active:scale-95 transition-all z-30"
                    title="Print Next"
                >
                    🖨️
                </button>

            </div>
        </section>
    );
};

export default LoveReceipt;
