import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { rastrear } from "@/lib/tracking";

interface MiniVSLGateProps {
  dogName: string;
  onContinue: () => void;
}

const VIDEO_DURATION = 191; // 3:11

export default function MiniVSLGate({ dogName, onContinue }: MiniVSLGateProps) {
  const [secondsLeft, setSecondsLeft] = useState(VIDEO_DURATION);
  const unlocked = secondsLeft <= 0;
  const tracked50 = useRef(false);

  useEffect(() => {
    rastrear("vsl_iniciada");
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (!tracked50.current && secondsLeft <= VIDEO_DURATION / 2 && secondsLeft > 0) {
      tracked50.current = true;
      rastrear("vsl_50");
    }
    if (secondsLeft <= 0) {
      rastrear("vsl_100");
      rastrear("botao_liberado");
    }
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
            Antes de revelar, assista esse vídeo que preparei
            especialmente para você
          </p>
        </div>

        {/* Panda Video Player - 9:16 vertical mobile */}
        <div
          className="w-full max-w-[360px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden mb-6"
          style={{ background: "hsl(210 20% 98%)", border: "1px solid hsl(220 13% 91%)" }}
        >
          <iframe
            id="panda-07b4fe95-fe15-44cb-937d-7685eaa34338"
            src="https://player-vz-8994d1f1-14f.tv.pandavideo.com.br/embed/?v=07b4fe95-fe15-44cb-937d-7685eaa34338"
            className="w-full h-full"
            style={{ border: "none" }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            loading="lazy"
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
