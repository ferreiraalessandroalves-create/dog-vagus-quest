import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

interface DiagnosisProps {
  dogName: string;
  tensionLevel: number;
  mainProblems: string[];
  onContinue: () => void;
}

export default function Diagnosis({
  dogName,
  tensionLevel,
  mainProblems,
  onContinue,
}: DiagnosisProps) {
  const getTensionColor = () => {
    if (tensionLevel < 4) return "hsl(158 64% 52%)";
    if (tensionLevel < 8) return "hsl(38 92% 50%)";
    return "hsl(4 90% 58%)";
  };

  const getTensionLabel = () => {
    if (tensionLevel < 4) return "Leve";
    if (tensionLevel < 8) return "Moderada";
    return "Severa";
  };

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
          <h2 className="question-title">
            Diagnóstico de{" "}
            <span style={{ color: "hsl(45 100% 51%)" }}>{dogName}</span>
          </h2>
          <p className="question-subtitle">
            Baseado nas suas respostas, aqui está a avaliação do nervo vago
          </p>
        </div>

        {/* Tension gauge */}
        <div className="p-6 rounded-2xl text-center mb-6" style={{ background: "rgba(255, 255, 255, 0.08)" }}>
          <p className="text-sm text-muted-foreground mb-4">Nível de Tensão do Nervo Vago</p>
          
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke={getTensionColor()}
                strokeWidth="10"
                fill="none"
                strokeDasharray={352}
                initial={{ strokeDashoffset: 352 }}
                animate={{ strokeDashoffset: 352 - (352 * tensionLevel) / 11.5 }}
                strokeLinecap="round"
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: getTensionColor() }}>
                {tensionLevel.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">de 11.5</span>
            </div>
          </div>

          <p className="text-xl font-bold" style={{ color: getTensionColor() }}>
            Tensão {getTensionLabel()}
          </p>
        </div>

        {/* Problems identified */}
        {mainProblems.length > 0 && (
          <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(255, 255, 255, 0.08)" }}>
            <h3 className="text-base font-bold mb-3">Problemas Identificados:</h3>
            <div className="space-y-2">
              {mainProblems.map((problem, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "hsl(168 60% 54%)" }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Good news box */}
        <div 
          className="p-4 rounded-xl mb-6"
          style={{ background: "rgba(64, 196, 170, 0.15)", border: "1px solid rgba(64, 196, 170, 0.3)" }}
        >
          <p className="text-sm text-center">
            <strong style={{ color: "hsl(168 60% 54%)" }}>Boa notícia!</strong>{" "}
            <span className="text-muted-foreground">
              Com o programa correto, {dogName} pode apresentar melhorias significativas em apenas 21 dias.
            </span>
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <button onClick={onContinue} className="cta-button group">
          Ver Meu Plano Personalizado
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
