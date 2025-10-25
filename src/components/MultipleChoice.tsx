import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <button
              onClick={() => onSelect(option.value)}
              className={cn(
                "w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg",
                "flex flex-col items-center gap-4 text-center",
                selected === option.value
                  ? "border-accent bg-accent/10 shadow-md"
                  : "border-border bg-card hover:border-accent/50"
              )}
            >
              {option.image && (
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-24 h-24 object-contain"
                />
              )}
              {option.emoji && (
                <span className="text-4xl">{option.emoji}</span>
              )}
              <span className="font-semibold text-lg">{option.label}</span>
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
          transition={{ delay: idx * 0.1 }}
        >
          <Button
            onClick={() => onSelect(option.value)}
            variant={selected === option.value ? "default" : "outline"}
            className={cn(
              "w-full justify-start text-left p-6 h-auto text-base md:text-lg font-medium rounded-xl",
              selected === option.value
                ? "bg-accent text-accent-foreground border-accent"
                : "hover:border-accent/50"
            )}
          >
            {option.emoji && (
              <span className="mr-3 text-2xl">{option.emoji}</span>
            )}
            {option.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
