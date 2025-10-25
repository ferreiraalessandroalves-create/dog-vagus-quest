import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-warning/10 rounded-full mb-4">
            <svg
              className="w-16 h-16 text-warning"
              fill="none"
              stroke="currentColor"
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
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Identificamos os{" "}
            <span className="text-accent">gatilhos de comportamento</span> do
            seu cachorro
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Com base nas suas respostas, detectamos os principais problemas:
          </p>
        </div>

        <div className="space-y-3">
          {triggers.map((trigger, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border-2 border-accent/20"
            >
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                {idx + 1}
              </div>
              <p className="text-lg font-medium">{trigger}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6">
          <p className="text-center text-muted-foreground">
            <strong className="text-foreground">Boa notícia:</strong> Estes problemas
            podem estar relacionados ao nervo vago do seu cachorro, e temos uma
            solução comprovada para isso.
          </p>
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
