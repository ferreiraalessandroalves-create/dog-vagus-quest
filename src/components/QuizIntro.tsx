import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/happy-dog.jpg";

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
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)" }}
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-6">

        {/* Label */}
        <motion.span
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            color: "#3B82F6",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Canino Obediente 360°
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-extrabold text-center"
          style={{
            color: "#1a1a2e",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.2,
          }}
        >
          Descubra o{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #1a3a8a, #60b0f4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >Plano</span>{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4DB8B8, #D4A017)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Personalizado
          </span>{" "}
          para Transformar o Comportamento do Seu Cachorro
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: "#666", fontSize: "17px" }}
          className="text-center max-w-md"
        >
          Responda algumas perguntas rápidas e receba um plano exclusivo baseado no perfil do seu cão.
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
          className="flex flex-col gap-3 w-full max-w-sm items-center"
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
