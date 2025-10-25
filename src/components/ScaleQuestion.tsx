import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScaleQuestionProps {
  selected?: number;
  onSelect: (value: number) => void;
  min?: number;
  max?: number;
}

export default function ScaleQuestion({
  selected,
  onSelect,
  min = 1,
  max = 5,
}: ScaleQuestionProps) {
  const emojis = ["👎", "👎", "😐", "👍", "👍"];

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>Discordo totalmente</span>
        <span>Concordo totalmente</span>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(
          (value, idx) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(value)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 transition-all duration-300",
                selected === value
                  ? "border-accent bg-accent/20 shadow-lg scale-110"
                  : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
              )}
            >
              <span className="text-2xl md:text-3xl mb-1">
                {emojis[idx]}
              </span>
            </motion.button>
          )
        )}
      </div>

      {selected !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 text-muted-foreground"
        >
          Sua resposta: <span className="font-semibold text-foreground">{selected}</span>
        </motion.p>
      )}
    </div>
  );
}
