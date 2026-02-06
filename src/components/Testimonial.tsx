import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TestimonialProps {
  onContinue: () => void;
}

export default function Testimonial({ onContinue }: TestimonialProps) {
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
          <h2 className="question-title">O plano está pronto! ✨</h2>
          <p className="question-subtitle">
            Veja o que outros donos dizem sobre o resultado:
          </p>
        </div>

        {/* Testimonial card */}
        <div className="testimonial-card mb-6">
          <div className="testimonial-stars mb-2">★★★★★</div>
          <h3 className="text-lg font-bold mb-3">Nova abordagem para a calma</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
            "Esta foi uma maneira nova para mim de aprender a ajudar meu cachorro a
            ficar calmo. Ainda não terminamos, mas já vi grandes melhorias com
            nosso Pastor Alemão de 8 anos que tinha algum treinamento mas
            lutava com reatividade."
          </p>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: "rgba(64, 196, 170, 0.2)" }}
            >
              👤
            </div>
            <div>
              <p className="font-semibold text-sm">Ernesto</p>
              <p className="text-xs text-muted-foreground">Dono verificado</p>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div 
          className="p-5 rounded-xl text-center mb-6"
          style={{ background: "rgba(64, 196, 170, 0.1)", border: "1px solid rgba(64, 196, 170, 0.2)" }}
        >
          <p className="text-xl font-bold mb-1" style={{ color: "hsl(168 60% 54%)" }}>
            Mais de 25.000 donos de cães
          </p>
          <p className="text-sm text-muted-foreground">
            escolheram Canino Obediente 360° para transformar o comportamento dos seus cachorros
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <button onClick={onContinue} className="cta-button group">
          Continuar
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
