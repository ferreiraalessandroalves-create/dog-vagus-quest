import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import drCarlosImage from "@/assets/dr-carlos-mendes.png";

interface AuthorityProps {
  onContinue: () => void;
}

export default function Authority({ onContinue }: AuthorityProps) {
  const benefits = [
    "Plano personalizado baseado nas características do seu cachorro",
    "Exercícios adaptados ao nível de reatividade identificado",
    "Suporte contínuo durante todo o desafio de 21 dias",
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
            style={{ background: "rgba(64, 196, 170, 0.15)" }}
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h2 className="question-title">
            Seu plano será{" "}
            <span style={{ color: "hsl(168 60% 54%)" }}>revisado por um especialista</span>
          </h2>
          <p className="question-subtitle">
            Nossos veterinários comportamentalistas irão personalizar seu plano
          </p>
        </div>

        {/* Expert card */}
        <div className="expert-card mb-6">
          <Avatar className="w-16 h-16 border-2" style={{ borderColor: "rgba(64, 196, 170, 0.3)" }}>
            <AvatarImage 
              src={drCarlosImage} 
              alt="Dr. Carlos Mendes" 
              className="object-cover object-top"
            />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1">Dr. Carlos Mendes, DVM</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Veterinário Comportamentalista Certificado
            </p>
            <p className="text-xs text-muted-foreground">
              15+ anos de experiência em reabilitação comportamental canina.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3 flex-1">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="hsl(158 64% 52%)"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-sm text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={onContinue} className="cta-button group mt-6">
          Continuar
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
