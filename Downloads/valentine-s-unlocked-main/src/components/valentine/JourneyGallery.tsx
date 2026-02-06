import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { imageConfig } from "@/config/valentine.config";

const photos = imageConfig.valentineDayPhotos.map((url, i) => ({
    id: i + 1,
    url: url,
    caption: "",
    rotate: Math.random() * 6 - 3
}));

const JourneyGallery = () => {
    const [index, setIndex] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % photos.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setIndex((prev) => (prev + 1) % photos.length);
    const prevSlide = () => setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

    return (
        <section className="py-24 bg-[#fff0f3] overflow-hidden relative border-t-4 border-dashed border-rose-200">

            {/* Cute Background Decorations */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 rotate-12 animate-pulse">💕</div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-20 -rotate-12 animate-pulse">🌸</div>
            <div className="absolute top-1/2 left-4 text-4xl opacity-10 rotate-45">🍬</div>
            <div className="absolute top-1/3 right-8 text-5xl opacity-15 -rotate-12">🍭</div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="font-handwriting text-6xl text-rose-500 mb-4 drop-shadow-sm">Our Lovely Journey 📸</h2>
                <p className="font-mono text-rose-400 mb-12 uppercase tracking-widest text-sm">20 Moments That Define Us</p>

                <div className="relative max-w-xl mx-auto h-[600px] flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                        {/* Previous Photo (Stack Effect) */}
                        <motion.div
                            key={index === 0 ? photos.length - 1 : index - 1}
                            className="absolute w-[80%] h-[80%] bg-white p-4 shadow-sm rotate-[-6deg] opacity-60 z-0 grayscale"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6, scale: 0.9, x: -100 }}
                        >
                            <img src={photos[index === 0 ? photos.length - 1 : index - 1].url} className="w-full h-[85%] object-cover mb-4" />
                        </motion.div>

                        {/* Current Photo (Polaroid Style) */}
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 200, rotate: 10, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, rotate: photos[index].rotate, scale: 1 }}
                            exit={{ opacity: 0, x: -200, rotate: -10, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative z-20 bg-white p-6 pb-20 shadow-[0_10px_40px_rgba(244,63,94,0.3)] w-full max-w-md rotate-2"
                        >
                            {/* Tape */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-rose-200/50 rotate-3 backdrop-blur-sm shadow-sm" />

                            <div className="aspect-[4/5] bg-neutral-100 mb-6 overflow-hidden border border-neutral-200">
                                <img src={photos[index].url} alt={photos[index].caption} className="w-full h-full object-cover" />
                            </div>

                            <div className="absolute bottom-6 left-0 right-0 text-center h-12">
                                {/* Detailed Caption removed - kept vacant */}
                                <p className="font-mono text-[10px] text-gray-400 mt-2 uppercase tracking-widest opacity-30">Image {index + 1} of 20</p>
                            </div>

                            {/* Stickers */}
                            <div className="absolute -bottom-4 -right-4 text-5xl drop-shadow-lg rotate-12">💖</div>
                        </motion.div>

                        {/* Next Photo (Stack Effect) */}
                        <motion.div
                            key={(index + 1) % photos.length}
                            className="absolute w-[80%] h-[80%] bg-white p-4 shadow-sm rotate-[6deg] opacity-60 z-0 grayscale"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6, scale: 0.9, x: 100 }}
                        >
                            <img src={photos[(index + 1) % photos.length].url} className="w-full h-[85%] object-cover mb-4" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button onClick={prevSlide} className="absolute left-0 md:-left-20 z-30 p-4 bg-white/50 hover:bg-white rounded-full text-rose-500 shadow-lg backdrop-blur-sm transition-all hover:scale-110">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextSlide} className="absolute right-0 md:-right-20 z-30 p-4 bg-white/50 hover:bg-white rounded-full text-rose-500 shadow-lg backdrop-blur-sm transition-all hover:scale-110">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-12 flex-wrap max-w-2xl mx-auto">
                    {photos.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-rose-500 scale-125' : 'bg-rose-200 hover:bg-rose-300'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneyGallery;
