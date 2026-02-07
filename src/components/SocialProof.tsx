import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import awardSeal from "@/assets/award-seal.png";

interface SocialProofProps {
  onContinue: () => void;
}

export default function SocialProof({ onContinue }: SocialProofProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col px-4 pt-16 pb-8"
    >
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
        {/* Logo */}
        <div className="quiz-header">
          <span className="quiz-logo">Canino Obediente 360°</span>
        </div>

        {/* Main stat */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Mais de{" "}
            <span style={{ color: "hsl(168 60% 54%)" }}>25.000</span>{" "}
            donos
          </h2>
          <p className="text-base text-muted-foreground">
            escolheram o{" "}
            <span className="font-semibold text-foreground">
              Desafio de Equilíbrio do Nervo Vago
            </span>{" "}
            para ajudar seus cães!
          </p>
        </motion.div>

        {/* Quote card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl mb-6"
          style={{ background: "hsla(168, 60%, 51%, 0.06)", border: "1px solid hsla(168, 60%, 51%, 0.15)" }}
        >
          <div className="text-4xl mb-3" style={{ color: "hsla(168, 60%, 51%, 0.3)" }}>❝</div>
          <p className="text-lg font-medium mb-4 leading-relaxed">
            Reatividade não é uma falha — é o nervo vago do seu cachorro pedindo ajuda
          </p>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Canino Obediente 360°</span>
            <span> • Equipe especializada</span>
          </div>
        </motion.div>

        {/* Academic badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 p-4 rounded-xl mb-6"
          style={{ background: "hsl(210 20% 98%)", border: "1px solid hsl(220 13% 91%)" }}
        >
          <img
            src={awardSeal}
            alt="Selo Acadêmico"
            className="w-16 h-16 object-contain"
          />
          <div>
            <p className="font-semibold text-sm">
              Descobertas científicas mais recentes
            </p>
            <p className="text-xs text-muted-foreground">
              Apresentadas em Oxford, Harvard e Cambridge
            </p>
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button onClick={onContinue} className="cta-button group">
            Continuar
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
