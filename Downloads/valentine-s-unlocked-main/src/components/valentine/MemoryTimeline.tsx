import { useRef } from 'react';
import { motion } from 'framer-motion';

const memories = [
    {
        id: 1,
        date: "12 Nov 2024",
        title: "The Beginning",
        desc: "The night the stars aligned and our worlds collided.",
        img: "https://images.unsplash.com/photo-1518199266791-5375a83190b9?q=80&w=600&auto=format&fit=crop",
        note: "I knew instantly. Like gravity."
    },
    {
        id: 2,
        date: "15 Dec 2024",
        title: "First Fight",
        desc: "We argued about pizza toppings, but made up with 1000 sorrys.",
        img: "https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=600&auto=format&fit=crop",
        note: "You were right (this time). 🍕"
    },
    {
        id: 3,
        date: "01 Jan 2025",
        title: "New Year",
        desc: "Watching fireworks, realizing my best year was standing next to me.",
        img: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=600&auto=format&fit=crop",
        note: "Happy New Year, my love. 🎆"
    },
    {
        id: 4,
        date: "Future",
        title: "To Be Written...",
        desc: "The best chapters are yet to come.",
        img: "",
        note: "Waiting for our next adventure...",
        isLocked: true
    }
];

const MemoryTimeline = () => {
    const scrollRef = useRef(null);

    return (
        <section className="relative w-full py-20 bg-gradient-to-b from-rose-50 to-rose-100 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center text-rose-800 mb-16 font-display">Our Journey</h2>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar"
                >
                    {memories.map((mem, index) => (
                        <div
                            key={mem.id}
                            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 snap-center px-4"
                        >
                            <div
                                className="relative w-full h-[500px] perspective-1000 group cursor-pointer"
                            >
                                <div
                                    className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180"
                                >
                                    {/* Front of the card */}
                                    <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col backface-hidden">
                                        <div className="flex items-center mb-4">
                                            <span className="text-sm text-gray-500 font-mono">{mem.date}</span>
                                            {mem.isLocked && (
                                                <span className="ml-auto text-rose-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-3xl font-display text-rose-700 mb-3">{mem.title}</h3>
                                        <p className="text-gray-700 text-lg flex-grow">{mem.desc}</p>
                                        {mem.img && (
                                            <img
                                                src={mem.img}
                                                alt={mem.title}
                                                className="mt-4 rounded-md object-cover h-32 w-full"
                                            />
                                        )}
                                        <div className="mt-4 text-center">
                                            <span className="text-rose-400 text-xs uppercase tracking-widest border-b border-rose-200 pb-1">Hover to Reveal</span>
                                        </div>
                                    </div>

                                    {/* Back of the card */}
                                    <div className="absolute inset-0 bg-rose-100 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center backface-hidden rotate-y-180">
                                        <h4 className="font-handwriting text-2xl text-rose-600 mb-4">Dear You,</h4>
                                        <p className="font-handwriting text-xl leading-relaxed opacity-90 text-center">
                                            "{mem.note}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Spacer */}
                <div className="w-8 shrink-0" />
            </div>

            {/* Styles for 3D flip */}
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </section>
    );
};

export default MemoryTimeline;
