import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProgressChartProps {
  dogName: string;
  onContinue: () => void;
}

export default function ProgressChart({ dogName, onContinue }: ProgressChartProps) {
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
            Tom vagal de <span style={{ color: "hsl(45 100% 51%)" }}>{dogName}</span>
          </h2>
        </div>

        {/* Chart */}
        <div className="p-4 rounded-2xl mb-6" style={{ background: "rgba(255, 255, 255, 0.08)" }}>
          <div className="relative h-48">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t border-white/10" />
              ))}
            </div>

            {/* Chart line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(4 90% 58%)" />
                  <stop offset="50%" stopColor="hsl(38 92% 50%)" />
                  <stop offset="100%" stopColor="hsl(158 64% 52%)" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(4 90% 58%)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(38 92% 50%)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="hsl(158 64% 52%)" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <motion.path
                d="M 15 30 Q 90 28, 115 60 T 195 100 T 260 130 L 260 150 L 15 150 Z"
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Main line */}
              <motion.path
                d="M 15 30 Q 90 28, 115 60 T 195 100 T 260 130"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Today marker */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
              >
                <circle cx="15" cy="30" r="5" fill="hsl(4 90% 58%)" />
                <rect x="2" y="5" width="40" height="18" rx="4" fill="white" />
                <text x="22" y="17" textAnchor="middle" fill="hsl(230 20% 10%)" fontSize="10" fontWeight="bold">
                  Hoje
                </text>
              </motion.g>

              {/* After challenge marker */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
              >
                <circle cx="260" cy="130" r="5" fill="hsl(158 64% 52%)" />
                <rect x="195" y="108" width="85" height="20" rx="4" fill="hsl(168 60% 54%)" />
                <text x="237" y="122" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                  Após Desafio
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Week labels */}
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>SEM 1</span>
            <span>SEM 2</span>
            <span>SEM 3</span>
            <span>SEM 4</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground text-center mb-6">
          Este gráfico mostra seu progresso potencial se você seguir todas as etapas listadas em nosso plano
        </p>

        {/* Ready message */}
        <div className="text-center mb-6">
          <p className="text-lg font-bold">
            O{" "}
            <span style={{ color: "hsl(168 60% 54%)" }}>Desafio de Reequilíbrio do Nervo Vago</span>
            {" "}personalizado de{" "}
            <span style={{ color: "hsl(45 100% 51%)" }}>{dogName}</span>
            {" "}está pronto
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
