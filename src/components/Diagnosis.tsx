import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    if (tensionLevel < 4) return "text-success";
    if (tensionLevel < 8) return "text-warning";
    return "text-danger";
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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Diagnóstico Personalizado de{" "}
            <span className="text-accent">{dogName}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Baseado nas suas respostas, aqui está a avaliação do nervo vago
          </p>
        </div>

        <div className="bg-card p-8 rounded-2xl border-2 border-border text-center space-y-4">
          <h3 className="text-xl font-bold">Nível de Tensão do Nervo Vago</h3>
          
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className={getTensionColor()}
                strokeDasharray={502}
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 502 - (502 * tensionLevel) / 11.5 }}
                strokeLinecap="round"
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getTensionColor()}`}>
                {tensionLevel.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">de 11.5</span>
            </div>
          </div>

          <p className={`text-2xl font-bold ${getTensionColor()}`}>
            Tensão {getTensionLabel()}
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border-2 border-border space-y-4">
          <h3 className="text-xl font-bold">Principais Problemas Identificados:</h3>
          <div className="space-y-2">
            {mainProblems.map((problem, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-muted-foreground">{problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20">
          <p className="text-center">
            <strong className="text-accent">Boa notícia!</strong> Com o programa
            correto de reequilíbrio do nervo vago, {dogName} pode apresentar
            melhorias significativas em apenas 21 dias.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
          >
            Ver Meu Plano Personalizado
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
