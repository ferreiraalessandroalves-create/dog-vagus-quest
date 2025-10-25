import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-xl w-full space-y-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </Button>

        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="space-y-6">
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-14 text-lg"
            autoFocus
          />

          <div className="flex justify-center">
            <Button
              onClick={onNext}
              disabled={!value.trim()}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
