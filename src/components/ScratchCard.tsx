import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ScratchCardProps {
  dogName: string;
  onReveal: () => void;
}

export default function ScratchCard({ dogName, onReveal }: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Draw scratch-off layer
    ctx.fillStyle = "#A8E6CF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = "#2C3E50";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("60%", canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = "16px Arial";
    ctx.fillText(`off no desafio personalizado de`, canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText(`reinicialização do nervo vago de ${dogName}`, canvas.width / 2, canvas.height / 2 + 55);
  }, [dogName]);

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

    const progress = (transparent / (pixels.length / 4)) * 100;
    setScratchProgress(progress);

    if (progress > 60 && !isScratched) {
      setIsScratched(true);
      setTimeout(onReveal, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-primary">PawChamp</h2>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-accent">Raspe & Economize</span> no Desafio de
            Reinicialização do Nervo Vago personalizado de {dogName}!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Ajude seu cachorro a se tornar Calmo&Focado hoje!
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center p-8 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl w-[400px] h-[300px] flex flex-col items-center justify-center">
                <p className="text-6xl font-bold text-accent mb-4">60%</p>
                <p className="text-sm text-muted-foreground">
                  off no desafio personalizado de
                </p>
                <p className="text-sm text-muted-foreground">
                  reinicialização do nervo vago de {dogName}
                </p>
              </div>
            </div>
            
            <canvas
              ref={canvasRef}
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseMove={scratch}
              onMouseLeave={() => setIsDrawing(false)}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={scratch}
              className="cursor-pointer rounded-2xl shadow-lg touch-none"
              style={{ width: "400px", height: "300px" }}
            />
          </div>
        </div>

        {!isScratched && (
          <p className="text-center text-sm text-muted-foreground">
            👆 Raspe com o dedo ou mouse para revelar seu desconto!
          </p>
        )}

        {isScratched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="bg-card p-8 rounded-2xl shadow-xl max-w-md w-full border-2 border-accent text-center space-y-6">
              <div className="text-6xl">🤩</div>
              <h2 className="text-3xl font-bold">Woo hoo!</h2>
              <p className="text-muted-foreground">Você ganhou um desconto</p>
              <p className="text-5xl font-bold text-accent">60% off</p>
              <p className="text-sm text-muted-foreground">
                *Este desconto será aplicado automaticamente
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
