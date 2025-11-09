import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import vagusNerveIllustration from "@/assets/vagus-nerve-illustration.jpg";

interface EducationProps {
  onContinue: () => void;
}

export default function Education({ onContinue }: EducationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            O que é o{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Nervo Vago
            </span>
            ?
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Entenda a ciência por trás do comportamento do seu cachorro
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <img
              src={vagusNerveIllustration}
              alt="Ilustração do nervo vago em cachorro"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border-2 border-border">
            <h3 className="text-xl font-bold mb-3">🧠 O Sistema Nervoso Canino</h3>
            <p className="text-muted-foreground">
              O nervo vago é o nervo mais longo do corpo, conectando o cérebro aos
              principais órgãos. Ele controla a resposta ao estresse, digestão,
              frequência cardíaca e comportamento social do seu cachorro.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl border-2 border-border">
            <h3 className="text-xl font-bold mb-3">⚡ Quando o Nervo Vago Está Desequilibrado</h3>
            <p className="text-muted-foreground mb-3">
              Um nervo vago desequilibrado pode causar:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Reatividade excessiva (latidos, puxões na coleira)</li>
              <li>• Ansiedade e medo constantes</li>
              <li>• Problemas digestivos</li>
              <li>• Dificuldade em aprender comandos</li>
              <li>• Comportamentos destrutivos</li>
            </ul>
          </div>

          <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20">
            <h3 className="text-xl font-bold mb-3 text-accent">✨ A Solução</h3>
            <p className="text-muted-foreground">
              Através de exercícios específicos de estimulação do nervo vago,
              podemos reequilibrar o sistema nervoso do seu cachorro, resultando
              em um comportamento mais calmo, focado e equilibrado em apenas 21
              dias.
            </p>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border-2 border-primary/20">
            <p className="text-center text-sm text-muted-foreground">
              <strong className="text-foreground">Baseado em ciência:</strong> Mais de 500
              estudos científicos comprovam a eficácia da estimulação do nervo
              vago no tratamento de problemas comportamentais em cães.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
          >
            Continuar para Meu Plano
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
