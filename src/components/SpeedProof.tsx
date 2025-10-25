import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4">
            <svg
              className="w-16 h-16 text-accent"
              fill="none"
              stroke="currentColor"
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
          
          <h2 className="text-3xl md:text-4xl font-bold">
            {dogName} pode estar{" "}
            <span className="text-accent">calmo e focado</span> em apenas 21 dias
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Se você começar hoje, pode ver resultados até:
          </p>
          
          <div className="bg-gradient-to-r from-accent to-secondary p-6 rounded-2xl">
            <p className="text-3xl font-bold text-white">{estimatedDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center">
            O que você pode esperar:
          </h3>
          
          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 p-4 bg-card rounded-xl border-2 border-border"
            >
              <div className="text-2xl">📅</div>
              <div>
                <p className="font-bold">Dias 1-7</p>
                <p className="text-sm text-muted-foreground">
                  {dogName} começa a responder melhor aos comandos básicos
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 p-4 bg-card rounded-xl border-2 border-border"
            >
              <div className="text-2xl">📅</div>
              <div>
                <p className="font-bold">Dias 8-14</p>
                <p className="text-sm text-muted-foreground">
                  Redução significativa em latidos e reatividade
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 p-4 bg-card rounded-xl border-2 border-border"
            >
              <div className="text-2xl">📅</div>
              <div>
                <p className="font-bold">Dias 15-21</p>
                <p className="text-sm text-muted-foreground">
                  Transformação completa - comportamento calmo e equilibrado
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-warning/10 p-6 rounded-2xl border-2 border-warning/20 text-center">
          <p className="font-bold mb-2">⚡ Ação Rápida Necessária</p>
          <p className="text-sm text-muted-foreground">
            Quanto mais cedo você começar, mais rápido {dogName} terá uma vida
            mais feliz e equilibrada
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
