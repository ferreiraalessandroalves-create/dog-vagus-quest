import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AuthorityProps {
  onContinue: () => void;
}

export default function Authority({ onContinue }: AuthorityProps) {
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Seu plano será{" "}
            <span className="text-accent">revisado por um especialista</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Nossos veterinários comportamentalistas certificados irão personalizar
            seu plano com base nas respostas fornecidas
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border-2 border-border space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                Dr. Carlos Mendes, DVM
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Veterinário Comportamentalista Certificado
              </p>
              <p className="text-sm text-muted-foreground">
                15+ anos de experiência em reabilitação comportamental canina.
                Especialista em técnicas de estimulação do nervo vago.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-success flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-muted-foreground">
              Plano personalizado baseado nas características do seu cachorro
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-success flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-muted-foreground">
              Exercícios adaptados ao nível de reatividade identificado
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-success flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-muted-foreground">
              Suporte contínuo durante todo o desafio de 21 dias
            </p>
          </div>
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
