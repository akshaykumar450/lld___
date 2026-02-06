import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eraser, Download, Trash2, Undo } from "lucide-react";
import { playClick } from "@/utils/audio";

const DoodleBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#F43F5E");
    const [lineWidth, setLineWidth] = useState(4);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [step, setStep] = useState(0);

    // Setup Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Make it look like a piece of paper (A4 ratio-ish or just rectangular)
            canvas.width = window.innerWidth > 800 ? 800 : window.innerWidth - 40;
            canvas.height = 500;

            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (ctx) {
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Save initial white state
                const initial = ctx.getImageData(0, 0, canvas.width, canvas.height);
                setHistory([initial]);
            }
        }
    }, []);

    const saveHistory = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const newHistory = history.slice(0, step + 1);
        newHistory.push(data);
        setHistory(newHistory);
        setStep(newHistory.length - 1);
    };

    const undo = () => {
        if (step <= 0) return;
        const newStep = step - 1;
        setStep(newStep);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        ctx.putImageData(history[newStep], 0, 0);
        playClick();
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        setIsDrawing(true);
        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            saveHistory();
            setIsDrawing(false);
        }
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        let clientX, clientY;
        if ('touches' in e) {
            const touch = e.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (ctx) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                saveHistory();
                playClick();
            }
        }
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement("a");
            link.download = "love-canvas-masterpiece.png";
            link.href = canvas.toDataURL();
            link.click();
            playClick();
        }
    };

    const colors = ["#F43F5E", "#Eab308", "#22c55e", "#3b82f6", "#a855f7", "#000000", "#ffffff"];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">

            {/* Wooden Background */}
            <div className="absolute inset-0 z-0 bg-[#3b2616] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-100" style={{ backgroundBlendMode: 'overlay' }} />
            <div className="absolute inset-0 z-0 bg-black/20" /> {/* Vignette */}

            <header className="absolute top-6 left-6 z-10">
                <Link to="/fun-zone" className="flex items-center text-amber-100/80 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2" /> Back to Arcade
                </Link>
            </header>

            <div className="mb-4 text-center z-10">
                <h1 className="text-4xl font-display font-black text-amber-100 drop-shadow-md tracking-wider">LOVE CANVAS</h1>
                <p className="text-amber-200/60 text-sm">Create something beautiful together</p>
            </div>

            {/* Paper / Canvas Container */}
            <div className="relative z-10 bg-[#fdfbf7] p-1 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-1">
                {/* Tape effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm -rotate-2 shadow-sm z-20" />

                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair touch-none bg-white"
                />
            </div>

            {/* Toolbar */}
            <div className="mt-8 flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-2xl z-10">

                {/* Color Palette */}
                <div className="flex gap-3 bg-[#2a1a10] p-4 rounded-full shadow-xl border border-white/10">
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => { setColor(c); playClick(); }}
                            className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 shadow-lg ${color === c ? "border-white scale-110 ring-2 ring-white/30" : "border-transparent"}`}
                            style={{ backgroundColor: c === "#ffffff" ? "#f0f0f0" : c }}
                            title={c === "#ffffff" ? "Eraser" : "Color"}
                        >
                            {c === "#ffffff" && <Eraser size={16} className="mx-auto text-slate-400" />}
                        </button>
                    ))}
                </div>

                {/* Tools */}
                <div className="flex gap-3 bg-[#2a1a10] p-4 rounded-full shadow-xl border border-white/10 text-amber-100">

                    {/* Brush Size */}
                    <div className="flex items-center gap-2 px-2 border-r border-white/10 mr-2">
                        <button onClick={() => setLineWidth(4)} className={`p-2 rounded-lg hover:bg-white/10 ${lineWidth === 4 ? "bg-white/20" : ""}`}>
                            <div className="w-2 h-2 bg-current rounded-full" />
                        </button>
                        <button onClick={() => setLineWidth(8)} className={`p-2 rounded-lg hover:bg-white/10 ${lineWidth === 8 ? "bg-white/20" : ""}`}>
                            <div className="w-4 h-4 bg-current rounded-full" />
                        </button>
                        <button onClick={() => setLineWidth(16)} className={`p-2 rounded-lg hover:bg-white/10 ${lineWidth === 16 ? "bg-white/20" : ""}`}>
                            <div className="w-6 h-6 bg-current rounded-full" />
                        </button>
                    </div>

                    {/* Actions */}
                    <button onClick={undo} disabled={step <= 0} className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Undo">
                        <Undo size={22} />
                    </button>
                    <button onClick={clearCanvas} className="p-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors" title="Clear All">
                        <Trash2 size={22} />
                    </button>
                    <button onClick={downloadImage} className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Save Image">
                        <Download size={22} />
                    </button>
                </div>

            </div>
        </div>
    );
};



export default DoodleBoard;
