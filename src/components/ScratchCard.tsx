import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import coinCursor from "@/assets/coin-cursor-custom.png";

interface ScratchCardProps {
  dogName: string;
  onReveal: () => void;
}
export default function ScratchCard({
  dogName,
  onReveal
}: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Draw scratch-off layer with golden gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#F4C430");
    gradient.addColorStop(0.5, "#DAA520");
    gradient.addColorStop(1, "#B8860B");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add watermark text pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    
    // Create repeating watermark pattern
    const watermarkText = "Canino Obediente 360°";
    const spacing = 180;
    for (let y = 0; y < canvas.height + 50; y += 50) {
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-20 * Math.PI / 180);
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();
      }
    }

    // Add scratch instruction
    ctx.fillStyle = "#2C3E50";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🔓 RASPE AQUI", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "16px Arial";
    ctx.fillText("para revelar seu desconto", canvas.width / 2, canvas.height / 2 + 20);
  }, [dogName]);
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX,
      y: e.clientY
    });
    scratch(e);
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale for canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    x *= scaleX;
    y *= scaleY;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const progress = transparent / (pixels.length / 4) * 100;
    setScratchProgress(progress);
    if (progress > 60 && !isScratched) {
      setIsScratched(true);
      setTimeout(onReveal, 1000);
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-primary">Canino Obediente 360°</h2>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-accent">Raspe & Economize</span> no Desafio de Reequilíbrio do Nervo Vago personalizado de <span className="text-warning">{dogName}</span>!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Ajude seu cachorro a ficar Calmo e Focado hoje!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            {/* Conteúdo revelado ao raspar */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-8xl font-bold text-success mb-2">61%</p>
                <p className="text-2xl font-semibold text-accent">DE DESCONTO</p>
              </div>
            </div>
            
            {showCursor && (
              <div 
                className="fixed pointer-events-none z-50"
                style={{
                  left: mousePos.x - 24,
                  top: mousePos.y - 24,
                  width: '48px',
                  height: '48px',
                }}
              >
                <img 
                  src={coinCursor} 
                  alt="Cursor moeda" 
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'brightness(1.4) contrast(1.3) saturate(1.5) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                    mixBlendMode: 'normal'
                  }}
                />
              </div>
            )}
            <canvas 
              ref={canvasRef} 
              onMouseDown={() => setIsDrawing(true)} 
              onMouseUp={() => setIsDrawing(false)} 
              onMouseMove={handleMouseMove} 
              onMouseEnter={() => setShowCursor(true)}
              onMouseLeave={() => {
                setIsDrawing(false);
                setShowCursor(false);
              }} 
              onTouchStart={() => setIsDrawing(true)} 
              onTouchEnd={() => setIsDrawing(false)} 
              onTouchMove={scratch} 
              className="rounded-2xl shadow-lg touch-none" 
              style={{
            cursor: 'none',
            width: "400px",
            height: "300px"
          }} />
          </div>

          <div className="text-center space-y-2 max-w-md">
            <p className="text-lg font-semibold text-foreground">
              Desconto no Desafio de Reequilíbrio do Nervo Vago
            </p>
            <p className="text-base text-muted-foreground">
              Personalizado para <span className="text-warning font-bold">{dogName}</span>
            </p>
          </div>
        </div>

        {!isScratched && <p className="text-center text-sm text-muted-foreground">
            👆 Raspe com o dedo ou mouse para revelar seu desconto!
          </p>}

        {isScratched && <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card p-8 rounded-2xl shadow-xl max-w-md w-full border-2 border-accent text-center space-y-6">
              <div className="text-6xl">🤩</div>
              <h2 className="text-3xl font-bold">Woo hoo!</h2>
              <p className="text-muted-foreground">Você ganhou um desconto</p>
              <p className="text-5xl font-bold text-accent">61% off</p>
              <p className="text-sm text-muted-foreground">
                *Este desconto será aplicado automaticamente
              </p>
            </div>
          </motion.div>}
      </div>
    </motion.div>;
}