import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScaleQuestionProps {
  selected?: number;
  onSelect: (value: number) => void;
  min?: number;
  max?: number;
}

const scaleOptions = [
  { value: 1, emoji: "😊", label: "Nunca" },
  { value: 2, emoji: "🙂", label: "Raramente" },
  { value: 3, emoji: "😐", label: "Às vezes" },
  { value: 4, emoji: "😟", label: "Frequentemente" },
  { value: 5, emoji: "😫", label: "Sempre" },
];

export default function ScaleQuestion({
  selected,
  onSelect,
  min = 1,
  max = 5,
}: ScaleQuestionProps) {
  return (
    <div className="w-full py-4">
      {/* Scale labels */}
      <div className="flex justify-between mb-3 px-1">
        <span className="text-xs text-muted-foreground">Discordo</span>
        <span className="text-xs text-muted-foreground">Concordo</span>
      </div>

      {/* Emoji scale */}
      <div className="emoji-scale">
        {scaleOptions.map((option, idx) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => onSelect(option.value)}
            className={cn(
              "emoji-option",
              selected === option.value && "selected"
            )}
          >
            {option.emoji}
          </motion.button>
        ))}
      </div>

      {/* Selected response text */}
      {selected !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm mt-4"
          style={{ color: "hsl(168 60% 54%)" }}
        >
          {scaleOptions.find(o => o.value === selected)?.label}
        </motion.p>
      )}
    </div>
  );
}
