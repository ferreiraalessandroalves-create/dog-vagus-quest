import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-primary">PawChamp</h2>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            Tom vagal de {dogName}
          </h1>
        </div>

        {/* Chart */}
        <div className="bg-card p-6 rounded-2xl border-2 border-border">
          <div className="relative h-64">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t border-border/30" />
              ))}
            </div>

            {/* Chart line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--danger))" />
                  <stop offset="50%" stopColor="hsl(var(--warning))" />
                  <stop offset="100%" stopColor="hsl(var(--success))" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--danger))" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(var(--warning))" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <motion.path
                d="M 20 40 Q 120 35, 150 80 T 250 130 T 340 170 L 340 200 L 20 200 Z"
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Main line */}
              <motion.path
                d="M 20 40 Q 120 35, 150 80 T 250 130 T 340 170"
                stroke="url(#lineGradient)"
                strokeWidth="4"
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
                <circle cx="20" cy="40" r="6" fill="hsl(var(--danger))" />
                <rect
                  x="5"
                  y="-10"
                  width="60"
                  height="25"
                  rx="5"
                  fill="hsl(var(--foreground))"
                />
                <text
                  x="35"
                  y="8"
                  textAnchor="middle"
                  fill="hsl(var(--background))"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Hoje
                </text>
              </motion.g>

              {/* After challenge marker */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
              >
                <circle cx="340" cy="170" r="6" fill="hsl(var(--success))" />
                <rect
                  x="280"
                  y="145"
                  width="120"
                  height="30"
                  rx="8"
                  fill="hsl(var(--accent))"
                />
                <text
                  x="340"
                  y="165"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Após Desafio
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Week labels */}
          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            <span>SEMANA 1</span>
            <span>SEMANA 2</span>
            <span>SEMANA 3</span>
            <span>SEMANA 4</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Este gráfico mostra seu progresso potencial se você seguir todas as
            etapas listadas em nosso plano
          </p>
          
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-foreground">O </span>
            <span className="text-accent">Desafio de Reequilíbrio do Nervo Vago</span>
            <span className="text-foreground"> personalizado de </span>
            <span className="text-warning">{dogName}</span>
            <span className="text-foreground"> está pronto</span>
          </h3>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
          >
            Continuar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
