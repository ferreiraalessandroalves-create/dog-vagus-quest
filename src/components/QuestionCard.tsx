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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-3xl w-full space-y-8">
        {/* Back button */}
        {showBack && onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        )}

        {/* Question header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Question content */}
        <div className="space-y-4">{children}</div>
      </div>
    </motion.div>
  );
}
