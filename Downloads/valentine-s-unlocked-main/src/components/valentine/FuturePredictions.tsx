import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Massive pool of 50 Predictions
const predictionPool = [
    // 1-10: Milestones & Home
    { title: "Future Home 🏡", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", desc: "A cozy cottage with a massive garden." },
    { title: "Mini Versions 👶", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800", desc: "Laughter filling every room. They have your eyes." },
    { title: "Growing Old 👴👵", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800", desc: "Holding hands on a porch swing, watching the sunset." },
    { title: "Dream Wedding 💍", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", desc: "The magical day we say 'I do' forever." },
    { title: "Sunday Mornings ☕", img: "https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?w=800", desc: "Breakfast in bed and absolutely nowhere to be." },
    { title: "Fur Babies 🐾", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800", desc: "A chaotic house filled with wagging tails and endless cuddles." },
    { title: "Late Night Snacks 🍕", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", desc: "Raiding the fridge at 2 AM together." },
    { title: "Renovation Project 🔨", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800", desc: "Painting walls and building ikea furniture together." },
    { title: "Garden Harvest 🥕", img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800", desc: "Eating vegetables we grew in our own backyard." },
    { title: "Holiday Hosting 🦃", img: "https://images.unsplash.com/photo-1576402187880-3b0055c1b72c?w=800", desc: "Hosting big family dinners with too much food." },

    // 11-20: Travel & Adventure
    { title: "World Travelers ✈️", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", desc: "Passports full of stamps from everywhere." },
    { title: "Road Trip 🚗", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800", desc: "Singing bad karaoke on an endless highway." },
    { title: "Paris Night 🗼", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", desc: "Kissing under the Eiffel Tower lights." },
    { title: "Beach Getaway 🏖️", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", desc: "Sand in our toes and ocean breeze in our hair." },
    { title: "Mountain Peak 🏔️", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", desc: "Conquering heights and fears together." },
    { title: "Northern Lights 🌌", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800", desc: "Watching the sky dance in green and purple." },
    { title: "Camping Trip ⛺", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800", desc: "Sleeping under a billion stars." },
    { title: "Safari 🦁", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", desc: "Seeing wild elephants in the savannah." },
    { title: "Disneyland 🎢", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800", desc: "Acting like kids again, mouse ears and all." },
    { title: "Cruise Ship 🚢", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800", desc: "Watching the ocean go by from our balcony." },

    // 21-30: Fun & silly
    { title: "Cooking Fails 🍳", img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800", desc: "Burning dinner but ordering pizza and laughing." },
    { title: "Movie Marathon 🎬", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800", desc: "Building a pillow fort and watching 3 movies in a row." },
    { title: "Video Games 🎮", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800", desc: "Drafting our teams for a late night gaming session." },
    { title: "Karaoke Night 🎤", img: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800", desc: "Singing terribly off-key but loving it." },
    { title: "Grocery Run 🛒", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800", desc: "Riding the cart in the parking lot." },
    { title: "Halloween 🎃", img: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=800", desc: "Matching costumes every single year." },
    { title: "Snowball Fight ❄️", img: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800", desc: "No mercy in the snow!" },
    { title: "Rainy Day 🌧️", img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800", desc: "Reading books while listening to the rain." },
    { title: "Late Night Drive 🌙", img: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800", desc: "Just driving and talking until 3 AM." },
    { title: "Pizza Night 🍕", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", desc: "Trying every topping combination possible." },

    // 31-40: Career & Success
    { title: "Power Couple 💼", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", desc: "Both crushing our career goals." },
    { title: "Graduation 🎓", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", desc: "Cheering the loudest for each other's wins." },
    { title: "Own Business 🚀", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", desc: "Building an empire side-by-side." },
    { title: "Art Studio 🎨", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800", desc: "Creating masterpieces (or mess) together." },
    { title: "Library 📚", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", desc: "A room in our house just for books." },
    { title: "Charity Ball 💃", img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800", desc: "Dressed up fancy for a good cause." },
    { title: "Giving Back 🎁", img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800", desc: "Volunteering together to help others." },
    { title: "Tech Life 💻", img: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=800", desc: "Building the future on our laptops." },
    { title: "Farm Life 🚜", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", desc: "Retiring to a quiet life with nature." },
    { title: "City Lights 🌃", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800", desc: "Living in a high-rise with a view." },

    // 41-50: Intimate & Sweet
    { title: "Forehead Kisses 💋", img: "https://images.unsplash.com/photo-1522858547137-f1dcec5f1f55?w=800", desc: "The silent way of saying 'I love you'." },
    { title: "Dancing 💃🕺", img: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800", desc: "Dancing in the living room to no music." },
    { title: "Sick Days 🤒", img: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800", desc: "Taking care of each other with soup and cuddles." },
    { title: "Surprise Gifts 🎁", img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800", desc: "Just because I was thinking of you." },
    { title: "Picnic 🧺", img: "https://images.unsplash.com/photo-1558981420-87aa9dad1c89?w=800", desc: "Cheese, wine, and grass stains." },
    { title: "Stargazing 🔭", img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800", desc: "Finding our own constellations." },
    { title: "Spa Day 🧖", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800", desc: "Relaxing and pampering ourselves." },
    { title: "Wine Tasting 🍷", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800", desc: "Pretending we are sommeliers." },
    { title: "By the Fire 🔥", img: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=800", desc: "Warm socks and hot cocoa." },
    { title: "Eternity ♾️", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800", desc: "A lifetime of memories, just you and me." }
];

type PredictionType = typeof predictionPool[number];

const PredictionCard = ({ data, isActive, onClick }: { data: PredictionType, isActive: boolean, onClick: () => void }) => {
    return (
        <div
            className="w-[300px] h-[450px] cursor-pointer perspective-1000"
            onClick={onClick}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: isActive ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT (Locked/Mystery) */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-950 to-black border-2 border-rose-500/30 rounded-2xl flex flex-col items-center justify-center shadow-2xl overflow-hidden p-6 text-center group">
                    {/* Decorative pattern/card back */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                    <div className="w-full h-full border-2 border-rose-500/20 rounded-xl flex flex-col items-center justify-center p-4 group-hover:border-rose-500/50 transition-colors">
                        <span className="text-6xl mb-6 filter drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse">🔮</span>
                        <h3 className="text-2xl font-display text-rose-200 mb-2">Future</h3>
                        <div className="w-12 h-1 bg-rose-500 rounded-full mb-2" />
                        <p className="text-rose-400/60 font-mono text-xs uppercase tracking-widest">Tap to Scry</p>
                    </div>
                </div>

                {/* BACK (Revealed) */}
                <div
                    className="absolute inset-0 backface-hidden bg-white rounded-2xl overflow-hidden shadow-2xl bg-neutral-900"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden' }}
                >
                    <div className="h-3/5 relative">
                        <img src={data.img} alt={data.title} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                    <div className="h-2/5 p-6 flex flex-col items-center text-center justify-center">
                        <h3 className="text-xl font-bold text-rose-400 mb-2">{data.title}</h3>
                        <p className="text-gray-300 font-handwriting text-lg leading-relaxed text-sm">
                            "{data.desc}"
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

const FuturePredictions = () => {
    // Initial State: First 3 items
    const [currentCards, setCurrentCards] = useState([predictionPool[0], predictionPool[1], predictionPool[2]]);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    // History to avoid repeats: Initialize with indices 0, 1, 2
    const [history, setHistory] = useState<number[]>([0, 1, 2]);

    const smartClick = (index: number) => {
        if (activeIdx === index) {
            // Closing self -> Swap self after delay
            setActiveIdx(null);
            setTimeout(() => swapCard(index), 600);
        } else {
            // Opening new -> If there was an old one, swap old one after delay
            const oldIdx = activeIdx;
            setActiveIdx(index);
            if (oldIdx !== null) {
                setTimeout(() => swapCard(oldIdx), 600);
            }
        }
    };

    const swapCard = (indexToSwap: number) => {
        // Filter out items that are currently displayed OR are in the recent history
        const displayedTitles = currentCards.map(c => c.title);

        // Find candidates in the pool that are NOT displayed AND NOT in history
        // Note: checking by Index in pool is easier
        const currentIndices = currentCards.map(c => predictionPool.indexOf(c));

        // Available indices are those NOT in currentIndices AND NOT in history (last 20)
        let availableIndices = predictionPool
            .map((_, idx) => idx)
            .filter(idx => !currentIndices.includes(idx) && !history.includes(idx));

        // Fallback: If we run out of fresh items (history full), just pick any non-displayed
        if (availableIndices.length === 0) {
            availableIndices = predictionPool
                .map((_, idx) => idx)
                .filter(idx => !currentIndices.includes(idx));
        }

        if (availableIndices.length > 0) {
            const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            const randomNew = predictionPool[randomIdx];

            setCurrentCards(prev => {
                const newCards = [...prev];
                newCards[indexToSwap] = randomNew;
                return newCards;
            });

            // Update history: Push new index, keep max 20
            setHistory(prev => {
                const newHistory = [...prev, randomIdx];
                if (newHistory.length > 20) newHistory.shift(); // Remove oldest
                return newHistory;
            });
        }
    };

    return (
        <section className="py-24 px-4 bg-neutral-900/50">
            <div className="text-center mb-16">
                <h2 className="font-display text-5xl text-rose-200 mb-4 drop-shadow-lg">Our Destiny 🔮</h2>
                <p className="text-rose-200/60 text-lg">Tap a card to reveal. Tap another to change fate.</p>
                <p className="text-rose-200/30 text-xs mt-2 font-mono">50+ Possible Futures</p>
            </div>

            <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
                {currentCards.map((card, i) => (
                    <PredictionCard
                        key={i}
                        data={card}
                        isActive={activeIdx === i}
                        onClick={() => smartClick(i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FuturePredictions;
