import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hardcoded chapters for the story - User can edit this content
const chapters = [
    {
        title: "Chapter 1: The Spark",
        content: `This is where our spicy story begins... 
        
        Use this space to write about that one night, or that one dream, or simply a fantasy you want to share. 
        
        (Open this file in your editor to add your real story!)`
    },
    {
        title: "Chapter 2: The Heat",
        content: `As the tension grew, so did the desire...
        
        [Your private words go here]`
    },
    {
        title: "Chapter 3: The Climax",
        content: `And then, everything exploded into stars...`
    }
];

interface SmutBookProps {
    onClose: () => void;
}

const SmutBook = ({ onClose }: SmutBookProps) => {
    const [page, setPage] = useState(0);

    const nextPage = () => {
        if (page < chapters.length - 1) setPage(p => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(p => p - 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[4/3] bg-[#fdfbf6] rounded-r-2xl rounded-l-md shadow-2xl flex overflow-hidden">

                {/* Book Spine / Cover Edge */}
                <div className="w-4 md:w-8 h-full bg-gradient-to-r from-red-900 via-rose-900 to-rose-800 shadow-inner z-20" />

                {/* Content Area */}
                <div className="flex-1 relative p-8 md:p-12 flex flex-col font-serif">

                    {/* Paper Texture */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none mix-blend-multiply" />

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 border-b-2 border-rose-900/10 pb-4">
                        <h2 className="text-2xl md:text-3xl text-rose-900 font-display italic">Volume I: Us</h2>
                        <span className="text-rose-900/40 font-mono text-sm px-2">Page {page + 1}</span>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-bold text-rose-800">{chapters[page].title}</h3>
                                <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                                    {chapters[page].content}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex justify-between items-center z-10">
                        <button
                            onClick={prevPage}
                            disabled={page === 0}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${page === 0 ? 'opacity-0 cursor-default' : 'hover:bg-rose-100 text-rose-800'}`}
                        >
                            ← Previous
                        </button>

                        <button
                            onClick={nextPage}
                            disabled={page === chapters.length - 1}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${page === chapters.length - 1 ? 'opacity-0 cursor-default' : 'hover:bg-rose-100 text-rose-800'}`}
                        >
                            Next →
                        </button>
                    </div>

                    {/* Close Button (X) */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-rose-900/30 hover:text-rose-600 transition-colors z-50 text-2xl"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SmutBook;
