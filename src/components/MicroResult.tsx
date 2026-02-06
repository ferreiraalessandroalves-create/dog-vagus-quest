import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MicroResultProps {
  triggers: string[];
  onContinue: () => void;
}

export default function MicroResult({ triggers, onContinue }: MicroResultProps) {
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
            style={{ background: "rgba(245, 158, 11, 0.15)" }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="hsl(38 92% 50%)"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h2 className="question-title">
            Identificamos os{" "}
            <span style={{ color: "hsl(168 60% 54%)" }}>gatilhos</span> do seu cachorro
          </h2>
          <p className="question-subtitle">
            Com base nas suas respostas, detectamos os principais problemas:
          </p>
        </div>

        {/* Triggers list */}
        <div className="space-y-3 mb-6">
          {triggers.map((trigger, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(64, 196, 170, 0.2)" }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: "hsl(168 60% 54%)" }}
              >
                {idx + 1}
              </div>
              <p className="text-sm font-medium">{trigger}</p>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <div className="info-box mb-6">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Boa notícia:</strong> Estes problemas
            podem estar relacionados ao nervo vago do seu cachorro, e temos uma
            solução comprovada para isso.
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <button onClick={onContinue} className="cta-button group">
          Continuar
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
