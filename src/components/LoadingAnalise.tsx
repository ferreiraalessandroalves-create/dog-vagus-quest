import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DONOS_AVATARS = [
  { src: "https://i.pravatar.cc/150?img=1", fallback: "MS", name: "Márcia Santos" },
  { src: "https://i.pravatar.cc/150?img=2", fallback: "RL", name: "Roberto Lima" },
  { src: "https://i.pravatar.cc/150?img=3", fallback: "AP", name: "Ana Paula" },
  { src: "https://i.pravatar.cc/150?img=4", fallback: "CF", name: "Carlos Ferreira" },
  { src: "https://i.pravatar.cc/150?img=5", fallback: "JM", name: "Júlia Moraes" },
];

const DEPOIMENTOS = [
  {
    nome: "Márcia Santos",
    usuario: "@marcia.golden",
    texto:
      "Meu Golden era super reativo. Em 2 semanas já tava andando do meu lado sem puxar. O método do Nervo Vago realmente funciona!",
  },
  {
    nome: "Roberto Lima",
    usuario: "@robertolima",
    texto:
      "Gastei mais de R$ 3.000 com adestradores e nada resolvia. Esse método mudou tudo em 21 dias. Hoje o Rex fica tranquilo sozinho!",
  },
  {
    nome: "Ana Paula Oliveira",
    usuario: "@anapaula.border",
    texto:
      "O app é perfeito! Acompanho cada passeio, vejo o progresso dela nos gráficos. Investimento que valeu MUITO a pena!",
  },
];

const PROGRESS_MESSAGES = [
  { threshold: 20, text: "Analisando comportamento" },
  { threshold: 40, text: "Identificando pontos de melhoria..." },
  { threshold: 60, text: "Criando plano personalizado de 21 dias..." },
  { threshold: 80, text: "Preparando sua oferta exclusiva..." },
];

interface LoadingAnaliseProps {
  nomeDoCao: string;
  onComplete: () => void;
}

export default function LoadingAnalise({ nomeDoCao, onComplete }: LoadingAnaliseProps) {
  const [progress, setProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const stableOnComplete = useCallback(onComplete, []);

  // Progress 0→100 in ~5s
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(stableOnComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [stableOnComplete]);

  // Rotate testimonials every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % DEPOIMENTOS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const depoimento = DEPOIMENTOS[currentTestimonial];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 100%)" }}
    >
      {/* Orange progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ background: "#E5E7EB" }}>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #FB923C, #F97316)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-8 max-w-[480px] mx-auto w-full gap-8">
        {/* Title & subtitle */}
        <div className="text-center">
          <h1 className="text-2xl md:text-[28px] font-bold leading-tight" style={{ color: "#1F2937" }}>
            Depoimentos de donos do método Canino Obediente 360°
          </h1>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "#6B7280" }}>
            Já são mais de 25.000 donos que usaram nosso método de equilíbrio do Nervo Vago e
            transformaram seus cães.
          </p>
        </div>

        {/* Avatar group */}
        <div className="flex items-center justify-center -space-x-3">
          {DONOS_AVATARS.map((avatar, i) => (
            <Avatar
              key={i}
              className="w-12 h-12 border-[3px] border-white shadow-sm"
              style={{ zIndex: DONOS_AVATARS.length - i }}
            >
              <AvatarImage src={avatar.src} alt={avatar.name} />
              <AvatarFallback className="text-xs font-semibold" style={{ background: "#E5E7EB", color: "#1F2937" }}>
                {avatar.fallback}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* Analysis status */}
        <div className="w-full">
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm leading-snug" style={{ color: "#6B7280" }}>
              Aguarde enquanto analiso as respostas de{" "}
              <strong style={{ color: "#1F2937" }}>{nomeDoCao}</strong> e te mostro como
            </p>
            <span className="text-lg font-bold ml-2 tabular-nums" style={{ color: "#F97316" }}>
              {progress}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #FB923C, #F97316)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-2xl p-6"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-base">⭐</span>
              ))}
            </div>

            {/* Author */}
            <p className="font-semibold text-base" style={{ color: "#1F2937" }}>
              {depoimento.nome}
            </p>
            <p className="text-xs mb-3" style={{ color: "#9CA3AF" }}>
              {depoimento.usuario}
            </p>

            {/* Text */}
            <p className="text-sm italic leading-relaxed" style={{ color: "#4B5563" }}>
              "{depoimento.texto}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress messages */}
        <div className="w-full flex flex-col gap-2">
          {PROGRESS_MESSAGES.map(
            (msg) =>
              progress > msg.threshold && (
                <motion.div
                  key={msg.threshold}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#6B7280" }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                    style={{ background: "#10B981" }}
                  />
                  {msg.text.includes("comportamento")
                    ? `Analisando comportamento de ${nomeDoCao}...`
                    : msg.text}
                </motion.div>
              )
          )}
        </div>
      </div>
    </motion.div>
  );
}
