import { motion } from "framer-motion";
import { useState, useEffect } from "react";


interface ScratchCardProps {
  dogName: string;
  onReveal: () => void;
}

export default function ScratchCard({ dogName, onReveal }: ScratchCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Auto-reveal with countdown animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  // Trigger onReveal after animation
  useEffect(() => {
    if (revealed) {
      const timeout = setTimeout(onReveal, 2000);
      return () => clearTimeout(timeout);
    }
  }, [revealed, onReveal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-lg mx-auto text-center pt-28">

        {/* Header */}
        <h2 className="question-title mb-2">
          <span style={{ color: "hsl(168 60% 54%)" }}>Desconto Especial</span> para{" "}
          <span style={{ color: "hsl(45 100% 51%)" }}>{dogName}</span>!
        </h2>
        <p className="question-subtitle mb-8">
          Seu desconto exclusivo está sendo revelado...
        </p>

        {/* Reveal animation */}
        <div 
          className="relative w-full max-w-xs mx-auto aspect-[4/3] rounded-2xl overflow-hidden"
          style={{ background: "hsl(210 20% 98%)", border: "1px solid hsl(220 13% 91%)" }}
        >
          {!revealed ? (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ 
                background: "linear-gradient(135deg, hsl(41 95% 60%) 0%, hsl(38 92% 50%) 100%)" 
              }}
            >
              <motion.span
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="text-7xl font-bold text-white"
              >
                {countdown}
              </motion.span>
              <p className="text-white text-sm mt-2">Revelando...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white"
            >
              <span className="reveal-discount">61%</span>
              <span className="text-xl font-bold" style={{ color: "hsl(168 60% 54%)" }}>
                DE DESCONTO
              </span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-6">
          Desconto exclusivo no Desafio de Reequilíbrio do Nervo Vago personalizado
        </p>
      </div>

      {/* Reveal popup */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", damping: 12 }}
            className="p-8 rounded-2xl max-w-sm w-full text-center"
            style={{ background: "hsl(0 0% 100%)", border: "2px solid hsl(168 60% 51%)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
          >
            <div className="text-6xl mb-4">🤩</div>
            <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
            <p className="text-muted-foreground mb-4">Você ganhou um desconto de</p>
            <p className="text-5xl font-bold mb-4" style={{ color: "hsl(168 60% 54%)" }}>
              61% off
            </p>
            <p className="text-xs text-muted-foreground">
              *Este desconto será aplicado automaticamente
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
