import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FlowerType = 'rose' | 'sunflower' | 'tulip' | 'daisy';

interface PlantedFlower {
    id: number;
    x: number;
    y: number;
    type: FlowerType;
    scale: number;
}

const seeds = [
    { type: 'rose', label: 'Passion 🌹', color: 'bg-red-500' },
    { type: 'sunflower', label: 'Joy ☀️', color: 'bg-yellow-400' },
    { type: 'tulip', label: 'Trust 🌷', color: 'bg-pink-400' },
    { type: 'daisy', label: 'Comfort 🌼', color: 'bg-white' },
] as const;

const LoveGarden = () => {
    const [flowers, setFlowers] = useState<PlantedFlower[]>([]);
    const [selectedSeed, setSelectedSeed] = useState<FlowerType | null>(null);

    const handlePlant = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!selectedSeed) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Add new flower
        const newFlower: PlantedFlower = {
            id: Date.now(),
            x,
            y,
            type: selectedSeed,
            scale: 0.5 + Math.random() * 0.5 // Random size
        };

        setFlowers([...flowers, newFlower]);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-sky-200 to-green-100 overflow-hidden relative border-t-4 border-white/50">

            {/* Header */}
            <div className="text-center mb-8 relative z-20">
                <h2 className="font-display text-5xl text-green-700 drop-shadow-sm mb-2">Our Love Garden 🌿</h2>
                <p className="font-handwriting text-2xl text-green-600">Plant seeds of love and watch them grow.</p>
                <div className="bg-white/40 backdrop-blur-sm inline-block px-4 py-1 rounded-full text-sm text-green-800 mt-2 font-mono">
                    {flowers.length === 0 ? "Select a seed & click on the grass!" : `${flowers.length} flowers blooming!`}
                </div>
            </div>

            {/* Garden Area */}
            <div
                className={`relative mx-auto w-full max-w-4xl h-[400px] bg-[#8dce68] rounded-[50px] shadow-inner overflow-hidden cursor-crosshair border-b-8 border-[#7ab558] group transition-all ${selectedSeed ? 'hover:shadow-green-200/50' : ''}`}
                onClick={handlePlant}
            >
                {/* Background Grass Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grass.png')]" />

                {/* Plants */}
                <AnimatePresence>
                    {flowers.map((flower) => (
                        <motion.div
                            key={flower.id}
                            initial={{ scale: 0, y: 50, opacity: 0 }}
                            animate={{ scale: flower.scale, y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="absolute origin-bottom"
                            style={{ left: flower.x - 24, top: flower.y - 64 }} // Centered stem
                        >
                            {/* SVG Flowers */}
                            {flower.type === 'rose' && (
                                <div className="relative w-12 h-16">
                                    <div className="w-1 h-full bg-green-700 mx-auto" /> {/* Stem */}
                                    <div className="absolute top-8 left-1 w-4 h-4 bg-green-600 rounded-tr-xl rounded-bl-xl rotate-45" /> {/* Leaf */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-red-600 rounded-full shadow-md animate-pulse" /> {/* Bloom */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-400 rounded-full opacity-60" />
                                </div>
                            )}
                            {flower.type === 'sunflower' && (
                                <div className="relative w-16 h-20">
                                    <div className="w-1.5 h-full bg-green-800 mx-auto" />
                                    <div className="absolute top-10 right-0 w-5 h-3 bg-green-700 rounded-full" />
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center animate-spin-slow shadow-sm">
                                        <div className="w-6 h-6 bg-yellow-800 rounded-full" />
                                    </div>
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full scale-125 -z-10 blur-sm opacity-50" />
                                </div>
                            )}
                            {flower.type === 'tulip' && (
                                <div className="relative w-10 h-16">
                                    <div className="w-1 h-full bg-green-600 mx-auto" />
                                    <div className="absolute top-8 -left-2 w-3 h-8 bg-green-500 rounded-full rotate-[-15deg]" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-pink-500 rounded-t-full rounded-b-xl shadow-sm" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-pink-300 opacity-50" />
                                </div>
                            )}
                            {flower.type === 'daisy' && (
                                <div className="relative w-10 h-12">
                                    <div className="w-1 h-full bg-green-500 mx-auto" />
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-sm">
                                        <div className="absolute inset-0 bg-yellow-300 w-3 h-3 m-auto rounded-full" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Hint text if empty */}
                {flowers.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-green-900/30 text-3xl font-bold font-display rotate-[-5deg]">Plant something with me...</p>
                    </div>
                )}
            </div>

            {/* Seed Packets */}
            <div className="flex justify-center gap-4 mt-8 relative z-20">
                {seeds.map((seed) => (
                    <button
                        key={seed.type}
                        onClick={() => setSelectedSeed(seed.type)}
                        className={`
                            relative group p-4 rounded-xl transition-all duration-300 border-b-4 border-r-4
                            ${selectedSeed === seed.type
                                ? 'bg-white border-green-600 scale-110 -translate-y-2 shadow-xl ring-2 ring-green-400'
                                : 'bg-white/80 border-green-200 hover:scale-105 hover:bg-white hover:shadow-lg'
                            }
                        `}
                    >
                        <div className={`w-12 h-12 ${seed.color} rounded-full mb-2 mx-auto shadow-inner flex items-center justify-center`}>
                            <span className="text-xl">🌱</span>
                        </div>
                        <span className="font-bold text-gray-700 text-sm block">{seed.label}</span>

                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Click to Select
                        </div>
                    </button>
                ))}
            </div>

            <style>{`
                .animate-spin-slow { animation: spin 8s linear infinite; }
                @keyframes spin { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
            `}</style>
        </section>
    );
};

export default LoveGarden;
