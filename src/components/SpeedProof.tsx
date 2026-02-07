import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SpeedProofProps {
  dogName: string;
  estimatedDate: string;
  onContinue: () => void;
}

export default function SpeedProof({
  dogName,
  estimatedDate,
  onContinue,
}: SpeedProofProps) {
  const timeline = [
    { days: "Dias 1-7", description: `${dogName} começa a responder melhor aos comandos básicos` },
    { days: "Dias 8-14", description: "Redução significativa em latidos e reatividade" },
    { days: "Dias 15-21", description: "Transformação completa - comportamento calmo e equilibrado" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col px-4 pt-16 pb-8"
    >
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
        {/* Logo */}
        <div className="quiz-header">
          <span className="quiz-logo">Canino Obediente 360°</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "hsla(168, 60%, 51%, 0.08)" }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="hsl(168 60% 54%)"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h2 className="question-title">
            {dogName} pode estar{" "}
            <span style={{ color: "hsl(168 60% 54%)" }}>calmo e focado</span>{" "}
            em apenas 21 dias
          </h2>
          <p className="question-subtitle">
            Se você começar hoje, pode ver resultados até:
          </p>
        </div>

        {/* Date highlight */}
        <div 
          className="p-4 rounded-xl text-center mb-6"
          style={{ background: "linear-gradient(135deg, hsl(168 60% 54%), hsl(41 95% 60%))" }}
        >
          <p className="text-xl font-bold text-white">{estimatedDate}</p>
        </div>

        {/* Timeline */}
        <div className="space-y-3 mb-6">
          <h3 className="text-base font-bold text-center mb-4">O que você pode esperar:</h3>
          
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl"
              style={{ background: "hsl(210 20% 98%)", border: "1px solid hsl(220 13% 91%)" }}
            >
              <div className="text-xl">📅</div>
              <div>
                <p className="font-bold text-sm">{item.days}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Urgency box */}
        <div 
          className="p-4 rounded-xl text-center mb-6"
          style={{ background: "hsla(38, 92%, 50%, 0.08)", border: "1px solid hsla(38, 92%, 50%, 0.15)" }}
        >
          <p className="font-bold text-sm mb-1">⚡ Ação Rápida Necessária</p>
          <p className="text-xs text-muted-foreground">
            Quanto mais cedo você começar, mais rápido {dogName} terá uma vida mais feliz
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <button onClick={onContinue} className="cta-button group">
          Começar Agora
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
