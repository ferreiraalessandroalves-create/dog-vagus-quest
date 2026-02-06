import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      className="min-h-screen flex flex-col px-4 pt-16 pb-8"
    >
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
        {/* Logo */}
        <div className="quiz-header">
          <span className="quiz-logo">Canino Obediente 360°</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="question-title">
            O que é o{" "}
            <span style={{ color: "hsl(168 60% 54%)" }}>Nervo Vago</span>?
          </h2>
          <p className="question-subtitle">
            Entenda a ciência por trás do comportamento do seu cachorro
          </p>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <img
            src={vagusNerveIllustration}
            alt="Ilustração do nervo vago em cachorro"
            className="w-full rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Info cards */}
        <div className="space-y-4 flex-1">
          <div className="p-4 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.08)" }}>
            <h3 className="text-base font-bold mb-2">🧠 O Sistema Nervoso Canino</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O nervo vago é o nervo mais longo do corpo, conectando o cérebro aos principais órgãos. Ele controla a resposta ao estresse, digestão e comportamento social.
            </p>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.08)" }}>
            <h3 className="text-base font-bold mb-2">⚡ Quando Desequilibrado</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Reatividade excessiva (latidos, puxões)</li>
              <li>• Ansiedade e medo constantes</li>
              <li>• Dificuldade em aprender comandos</li>
              <li>• Comportamentos destrutivos</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "rgba(64, 196, 170, 0.15)", border: "1px solid rgba(64, 196, 170, 0.3)" }}>
            <h3 className="text-base font-bold mb-2" style={{ color: "hsl(168 60% 54%)" }}>✨ A Solução</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exercícios específicos de estimulação do nervo vago podem reequilibrar o sistema nervoso, resultando em comportamento calmo e equilibrado em apenas 21 dias.
            </p>
          </div>

          <div className="info-box">
            <p className="text-muted-foreground text-xs">
              <strong className="text-foreground">Baseado em ciência:</strong> Mais de 500 estudos científicos comprovam a eficácia da estimulação do nervo vago.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button onClick={onContinue} className="cta-button group">
            Continuar para Meu Plano
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
