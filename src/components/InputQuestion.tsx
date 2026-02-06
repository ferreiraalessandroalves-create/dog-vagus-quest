import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InputQuestionProps {
  title: string;
  subtitle?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function InputQuestion({
  title,
  subtitle,
  placeholder,
  value,
  onChange,
  onNext,
  onBack,
}: InputQuestionProps) {
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

        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="self-start mb-4 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="question-title">{title}</h2>
          {subtitle && <p className="question-subtitle">{subtitle}</p>}
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="quiz-input mb-6"
          autoFocus
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <button
          onClick={onNext}
          disabled={!value.trim()}
          className="cta-button group"
        >
          Continuar
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
