import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  emoji?: string;
}

interface MultipleChoiceCheckboxProps {
  options: Option[];
  selected: string[];
  onSelect: (values: string[]) => void;
}

export default function MultipleChoiceCheckbox({
  options,
  selected = [],
  onSelect,
}: MultipleChoiceCheckboxProps) {
  const handleToggle = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onSelect(newSelected);
  };

  return (
    <div className="space-y-3">
      {options.map((option, idx) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <button
            onClick={() => handleToggle(option.value)}
            className={cn(
              "w-full p-4 rounded-xl border-2 transition-all duration-300",
              "flex items-center gap-4 text-left hover:shadow-md",
              selected.includes(option.value)
                ? "border-accent bg-accent/10"
                : "border-border bg-card hover:border-accent/50"
            )}
          >
            <Checkbox
              checked={selected.includes(option.value)}
              className="pointer-events-none"
            />
            {option.emoji && (
              <span className="text-2xl">{option.emoji}</span>
            )}
            <span className="font-medium flex-1">{option.label}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
