import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/happy-dog.jpg";
import logoIcon from "@/assets/canino-logo-icon.png";

interface QuizIntroProps {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  const benefits = [
    "Método cientificamente comprovado",
    "Personalizado para seu cachorro",
    "Resultados em 21 dias",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12"
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-6">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img src={logoIcon} alt="Canino Obediente 360°" className="quiz-logo-img" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight"
        >
          Descubra o{" "}
          <span style={{ color: "hsl(168 60% 54%)" }}>Plano Personalizado</span>{" "}
          para Transformar o Comportamento do Seu Cachorro
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base md:text-lg text-muted-foreground text-center"
        >
          Baseado no revolucionário método de Equilíbrio do Nervo Vago
        </motion.p>

        {/* Hero Image */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src={heroImage}
            alt="Cachorro feliz com seu dono"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm"
        >
          <button onClick={onStart} className="cta-button group">
            Começar Avaliação Gratuita
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3 w-full max-w-sm"
        >
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(158 64% 52%)" }} />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted-foreground"
        >
          Junte-se a mais de 25.000 donos de cães que transformaram a vida de seus pets
        </motion.p>
      </div>
    </motion.div>
  );
}
