import { motion } from "framer-motion";

interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <>
      {/* Progress bar container */}
      <div className="progress-bar-container">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      
      {/* Progress percentage indicator */}
      <div className="progress-text">
        {Math.round(percent)}%
      </div>
    </>
  );
}
