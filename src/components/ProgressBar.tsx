import { motion } from "framer-motion";

interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card shadow-sm">
      <div className="h-1.5 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-accent via-secondary to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
