import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import DayGuard from "@/components/DayGuard";
import confetti from "canvas-confetti";

// --- Physics Types ---
interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  emoji: string;
}

const HUG_EMOJIS = ["🤗", "🧸", "💖", "🫂", "✨"];
const COLORS = ["#FDA4AF", "#F43F5E", "#FB7185", "#FECDD3", "#FFF1F2"];

const HugDay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]); // React state for counting, Ref for physics
  const ballsRef = useRef<Ball[]>([]); // Physics state (mutable for performance)

  const [isFull, setIsFull] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const requestRef = useRef<number>();

  // --- Physics Constants ---
  const GRAVITY = 0.4;
  const FRICTION = 0.99;
  const BOUNCE = 0.7;

  // --- Initialize Loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      if (!canvas || !containerRef.current) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      ballsRef.current.forEach((ball, i) => {
        // Apply forces
        ball.vy += GRAVITY;
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;

        // Move
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall Collisions
        if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx *= -BOUNCE;
        } else if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -BOUNCE;
        }

        if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= -BOUNCE;
          // Friction on floor
          ball.vx *= 0.95;
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -BOUNCE;
        }

        // Simple Ball-to-Ball Collision (O(N^2) - okay for low count)
        for (let j = i + 1; j < ballsRef.current.length; j++) {
          const other = ballsRef.current[j];
          const dx = other.x - ball.x;
          const dy = other.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.radius + other.radius;

          if (distance < minDist) {
            // Resolve overlap
            const angle = Math.atan2(dy, dx);
            const targetX = ball.x + Math.cos(angle) * minDist;
            const targetY = ball.y + Math.sin(angle) * minDist;
            const ax = (targetX - other.x) * 0.05; // Spring force
            const ay = (targetY - other.y) * 0.05;

            ball.vx -= ax;
            ball.vy -= ay;
            other.vx += ax;
            other.vy += ay;
          }
        }

        // Draw
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = `${ball.radius}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(ball.emoji, ball.x, ball.y + 2);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  // --- Resize Handler ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Interaction ---
  const addBall = () => {
    if (!canvasRef.current || isSent) return;

    const r = 25 + Math.random() * 20; // Radius 25-45
    const newBall: Ball = {
      id: Date.now() + Math.random(),
      x: Math.random() * canvasRef.current.width,
      y: -50, // Start above
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * 5,
      radius: r,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      emoji: HUG_EMOJIS[Math.floor(Math.random() * HUG_EMOJIS.length)]
    };

    ballsRef.current.push(newBall);
    setBalls([...ballsRef.current]); // Trigger re-render check for count

    // Check Fullness
    if (ballsRef.current.length > 30) setIsFull(true);
  };

  const shakeJar = () => {
    ballsRef.current.forEach(ball => {
      ball.vy -= 15 + Math.random() * 10; // Jump up
      ball.vx += (Math.random() - 0.5) * 20; // Crazy side move
    });
  };

  const sendHugJar = () => {
    setIsSent(true);
    confetti({ particleCount: 200, spread: 150, origin: { y: 0.6 } });
  };

  return (
    <DayGuard dayId="hug-day">
      <DayLayout dayName="Hug Day" emoji="🫂">
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">

          <AnimatePresence>
            {!isSent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ y: -1000, rotate: 20, opacity: 0, transition: { duration: 0.8, ease: "backIn" } }}
                className="relative w-full max-w-md"
              >
                {/* Headers */}
                <div className="text-center mb-16 relative z-10">
                  <h1 className="font-display text-4xl font-bold text-foreground">The Virtual Hug Jar 🏺</h1>
                  <p className="text-muted-foreground mt-2">Fill it up with warm fuzzies!</p>
                </div>

                {/* JAR CONTAINER */}
                <div className="relative mx-auto w-[320px] h-[500px] md:w-[400px] md:h-[600px]">
                  {/* Lid */}
                  <div className="w-[340px] md:w-[420px] h-12 bg-gray-300 rounded-t-lg absolute -top-10 left-1/2 -translate-x-1/2 z-20 border-b-4 border-gray-400/50 shadow-sm" />

                  {/* Glass Body */}
                  <div
                    ref={containerRef}
                    onClick={addBall}
                    className="w-full h-full bg-white/20 backdrop-blur-sm border-4 border-white/40 rounded-b-3xl rounded-t-lg shadow-2xl relative overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
                    style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25) inset" }}
                  >
                    <canvas ref={canvasRef} className="w-full h-full block" />

                    {/* Tap Hint */}
                    {balls.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-white/70 text-xl font-bold animate-pulse">Tap to add a HUG! 👇</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-12 flex flex-col gap-4 max-w-xs mx-auto relative z-30">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                    <motion.div
                      className="bg-rose-500 h-2.5 rounded-full"
                      style={{ width: `${Math.min(100, (balls.length / 30) * 100)}%` }}
                      layout
                    />
                  </div>
                  <p className="text-center text-sm font-bold text-rose-500">{balls.length} / 30 Hugs</p>

                  <div className="flex gap-4">
                    <button
                      onClick={shakeJar}
                      className="flex-1 btn-outline-romantic py-3"
                    >
                      Shake It! 📳
                    </button>
                    <button
                      onClick={sendHugJar}
                      disabled={!isFull}
                      className="flex-1 btn-romantic py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isFull ? "Send Jar 📦" : "Fill it more!"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="receipt"
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="bg-white p-8 max-w-md w-full shadow-2xl rounded-sm border-t-8 border-rose-500 relative"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #e5e7eb 20px)" }}
              >
                <div className="text-center font-mono space-y-4">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    🚚
                  </div>
                  <h2 className="text-2xl font-bold uppercase border-b-2 border-black pb-4">Delivery Receipt</h2>

                  <div className="text-left space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>RECEIVER:</span>
                      <span className="font-bold text-rose-600 uppercase">MY TULIP 🌷</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ITEM:</span>
                      <span className="font-bold">JAR OF HUGS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>QTY:</span>
                      <span className="font-bold">{balls.length} Units</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WEIGHT:</span>
                      <span className="font-bold">HEAVY (Pure Love)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STATUS:</span>
                      <span className="text-green-600 font-bold">DELIVERED</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-black pt-4 mt-4">
                    <p className="text-lg italic">"Sending you a jar full of hugs to keep you warm Babydoll!"</p>
                  </div>

                  <div className="pt-6">
                    <button onClick={() => window.location.reload()} className="text-xs text-muted-foreground hover:underline">
                      Send Another?
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </DayLayout>
    </DayGuard>
  );
};

export default HugDay;
