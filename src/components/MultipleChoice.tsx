import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  emoji?: string;
  image?: string;
}

interface MultipleChoiceProps {
  options: Option[];
  selected?: string;
  onSelect: (value: string) => void;
  variant?: "default" | "card";
}

export default function MultipleChoice({
  options,
  selected,
  onSelect,
  variant = "default",
}: MultipleChoiceProps) {
  if (variant === "card") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, idx) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <button
              onClick={() => onSelect(option.value)}
              className={cn(
                "option-card option-card-image w-full",
                selected === option.value && "selected"
              )}
            >
              {option.image && (
                <img
                  src={option.image}
                  alt={option.label}
                  className="option-image"
                />
              )}
              {option.emoji && !option.image && (
                <span className="text-4xl mb-2">{option.emoji}</span>
              )}
              <span className="option-text text-sm">{option.label}</span>
            </button>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {options.map((option, idx) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <button
            onClick={() => onSelect(option.value)}
            className={cn(
              "option-card w-full",
              selected === option.value && "selected"
            )}
          >
            {option.emoji && (
              <span className="option-emoji">{option.emoji}</span>
            )}
            <span className="option-text">{option.label}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
