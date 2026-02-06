import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StarMap = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions
        const setSize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };
        setSize();
        window.addEventListener('resize', setSize);

        // Stars Data
        const stars = Array.from({ length: 200 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.05
        }));

        // Constellation (A Heart approximate)
        const padding = 100; // Keep away from edges
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const constellation = [
            { x: cx, y: cy + 50 },
            { x: cx - 40, y: cy },
            { x: cx - 20, y: cy - 40 },
            { x: cx + 20, y: cy - 40 },
            { x: cx + 40, y: cy },
            { x: cx, y: cy + 50 } // Loop back
        ];

        const animate = () => {
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear

            // Draw Stars
            stars.forEach(star => {
                star.alpha += star.twinkleSpeed;
                if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed *= -1;

                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Constellation
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            constellation.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();

            // Draw Constellation Points
            constellation.forEach(p => {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
                // Glow
                ctx.fillStyle = "rgba(244, 63, 94, 0.4)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', setSize);
        };
    }, []);

    return (
        <div className="relative w-full h-[60vh] bg-neutral-900 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <canvas ref={canvasRef} className="w-full h-full block" />

            <div className="absolute bottom-6 left-6 text-left">
                <h3 className="font-display text-3xl text-white mb-1">The Night We Met</h3>
                <p className="text-white/60 text-sm font-mono">NORTHERN HEMISPHERE • 12 NOV 2024</p>
                <p className="text-white/40 text-xs mt-2 italic">"This was the sky when my world changed."</p>
            </div>
        </div>
    );
};

export default StarMap;
