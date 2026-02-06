import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Music, X } from "lucide-react";

// Song Mapping configuration
const SONG_MAPPING: Record<string, { id: string; title: string; artist: string }> = {
    // Default (River Flows in You - Yiruma)
    "default": { id: "77xQnn4rtPZOSxCd0YTmP8", title: "River Flows in You", artist: "Yiruma" },

    // Rose Day - Until I Found You (Stephen Sanchez)
    "/day/rose": { id: "0T5iIrXA4p5GsubkhuBIKV", title: "Until I Found You", artist: "Stephen Sanchez" },

    // Propose Day - All of Me (John Legend)
    "/day/propose": { id: "3U4isOIWM3VvDubwSI3y7a", title: "All of Me", artist: "John Legend" },

    // Chocolate Day - Sugar (Maroon 5)
    "/day/chocolate": { id: "3GCdLUSnKSMJhs4Tj6CV3s", title: "Sugar", artist: "Maroon 5" },

    // Teddy Day - I Like Me Better (Lauv)
    "/day/teddy": { id: "2P91MQbaiQOfbiz9VqhqKQ", title: "I Like Me Better", artist: "Lauv" },

    // Promise Day - A Thousand Years (Christina Perri)
    "/day/promise": { id: "6lanRgr6wXibZr8KgzXxBl", title: "A Thousand Years", artist: "Christina Perri" },

    // Hug Day - Earned It (The Weeknd)
    "/day/hug": { id: "4ee8fE6Wp0Vb3K1b5mO2W9", title: "Earned It", artist: "The Weeknd" },

    // Kiss Day - Just the Way You Are (Bruno Mars)
    "/day/kiss": { id: "7BqBn9nzAq8spo5e7cZ0dJ", title: "Just the Way You Are", artist: "Bruno Mars" },

    // Valentine Day - Can't Help Falling in Love (Elvis Presley)
    "/day/valentine": { id: "44AyOl4qVkzS48vBsbNXaC", title: "Can't Help Falling in Love", artist: "Elvis Presley" }
};

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Determine current song based on path
    const currentPath = location.pathname;
    const songData = SONG_MAPPING[currentPath] || SONG_MAPPING["default"];

    // Spotify Embed URL
    const spotifyUrl = `https://open.spotify.com/embed/track/${songData.id}?utm_source=generator&theme=0`;

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
            <motion.div
                initial={false}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0.8,
                    y: isOpen ? 0 : 20,
                    pointerEvents: isOpen ? "auto" : "none"
                }}
                className="rounded-2xl shadow-2xl overflow-hidden w-[300px] bg-black origin-bottom-left"
            >
                <div className="bg-black/90 p-2 flex justify-between items-center border-b border-white/10">
                    <div className="flex flex-col pl-2">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none mb-0.5">Now Playing</span>
                        <span className="text-[10px] text-rose-400 font-medium truncate w-48">{songData.title}</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white p-1">
                        <X size={14} />
                    </button>
                </div>
                <iframe
                    key={songData.id} // Force re-render on song change
                    style={{ borderRadius: "0 0 12px 12px" }}
                    src={spotifyUrl}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </motion.div>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-white/10 bg-black/40 backdrop-blur-sm text-white/50 hover:text-rose-400 hover:bg-black/80 hover:border-rose-500/30`}
                title={`Play: ${songData.title}`}
            >
                <Music size={16} className={isOpen ? "text-rose-400" : ""} />
            </motion.button>
        </div>
    );
};

export default MusicPlayer;
