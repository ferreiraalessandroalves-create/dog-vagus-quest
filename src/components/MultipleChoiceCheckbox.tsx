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
              "option-card w-full",
              selected.includes(option.value) && "selected"
            )}
          >
            <Checkbox
              checked={selected.includes(option.value)}
              className="pointer-events-none border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            {option.emoji && (
              <span className="text-xl">{option.emoji}</span>
            )}
            <span className="text-sm font-medium flex-1 text-left">{option.label}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
