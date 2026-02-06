import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeartCursor = () => {
    const [hearts, setHearts] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
    const requestRef = useRef<number>();
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Throttle creation by distance
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 30) {
                const id = Date.now();
                setHearts(prev => [
                    ...prev.slice(-15), // Keep max 15 hearts
                    {
                        id,
                        x: e.clientX,
                        y: e.clientY,
                        text: Math.random() > 0.5 ? "A" : "B"
                    }
                ]);
                lastPos.current = { x: e.clientX, y: e.clientY };
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cleanup old hearts
    useEffect(() => {
        const interval = setInterval(() => {
            setHearts(prev => {
                if (prev.length === 0) return prev;
                const now = Date.now();
                return prev.filter(h => now - h.id < 1000); // 1s life
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            <AnimatePresence>
                {hearts.map(h => (
                    <motion.div
                        key={h.id}
                        className="absolute text-rose-500 font-bold select-none text-xl drop-shadow-md"
                        style={{ left: h.x, top: h.y }}
                        initial={{ scale: 0, opacity: 1, y: 0 }}
                        animate={{ scale: 1, opacity: 0, y: 50 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        ❤️ <span className="text-xs text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">{h.text}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default HeartCursor;
