import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export default function QuestionCard({
  title,
  subtitle,
  children,
  onBack,
  showBack = true,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col px-4 pt-16 pb-8 md:pt-20 md:pb-12"
    >
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
        {/* Quiz logo */}
        <div className="quiz-header">
          <span className="quiz-logo">Canino Obediente 360°</span>
        </div>

        {/* Back button */}
        {showBack && onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="self-start mb-4 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        )}

        {/* Question header */}
        <div className="text-center mb-6">
          <h2 className="question-title">{title}</h2>
          {subtitle && (
            <p className="question-subtitle">{subtitle}</p>
          )}
        </div>

        {/* Question content */}
        <div className="flex-1 flex flex-col space-y-3">{children}</div>
      </div>
    </motion.div>
  );
}
