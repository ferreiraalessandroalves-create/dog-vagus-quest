import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Lock } from "lucide-react";

interface MiniVSLGateProps {
  dogName: string;
  onContinue: () => void;
}

export default function MiniVSLGate({ dogName, onContinue }: MiniVSLGateProps) {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const unlocked = secondsLeft <= 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col px-4 pt-28 pb-8"
    >
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="question-title">
            🎉 O plano de{" "}
            <span style={{ color: "hsl(45 100% 51%)" }}>{dogName}</span> está
            pronto!
          </h2>
          <p className="question-subtitle">
            Antes de revelar, assista esse vídeo de 2 minutos que preparei
            especialmente para você
          </p>
        </div>

        {/* YouTube Player */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6" style={{ background: "hsl(210 20% 98%)", border: "1px solid hsl(220 13% 91%)" }}>
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Vídeo especial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button */}
        {unlocked ? (
          <button onClick={onContinue} className="cta-button group">
            ✅ Quero receber meu plano
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            disabled
            className="cta-button opacity-60 cursor-not-allowed"
            style={{ background: "hsl(220 13% 70%)" }}
          >
            <Lock className="w-5 h-5" />
            Liberando em {formatTime(secondsLeft)}...
          </button>
        )}

        {/* Warning */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          ⚠️ Não feche essa página
        </p>
      </div>
    </motion.div>
  );
}
