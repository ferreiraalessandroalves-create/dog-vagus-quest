import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number;
  text: string;
  onComplete: () => void;
  showConfetti?: boolean;
  showPopup?: boolean;
  popupQuestion?: string;
  popupOptions?: string[];
  onPopupAnswer?: (answer: string) => void;
}

export default function LoadingScreen({
  progress,
  text,
  onComplete,
  showConfetti = false,
  showPopup = false,
  popupQuestion,
  popupOptions = [],
  onPopupAnswer,
}: LoadingScreenProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showPopupModal, setShowPopupModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= progress) {
          clearInterval(interval);
          if (showPopup) {
            setShowPopupModal(true);
          } else {
            setTimeout(onComplete, showConfetti ? 2000 : 1000);
          }
          return progress;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [progress, onComplete, showConfetti, showPopup]);

  const handlePopupAnswer = (answer: string) => {
    setShowPopupModal(false);
    onPopupAnswer?.(answer);
    setTimeout(onComplete, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
    >
      {/* Logo */}
      <div className="quiz-header mb-6">
        <span className="quiz-logo">Canino Obediente 360°</span>
      </div>

      {/* Loading circle */}
      <div className="relative w-32 h-32 mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke="hsl(168 60% 54%)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={352}
            strokeDashoffset={352 - (352 * currentProgress) / 100}
            strokeLinecap="round"
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{currentProgress}%</span>
        </div>
      </div>

      {/* Text */}
      <motion.p
        key={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-muted-foreground max-w-xs mb-8"
      >
        {text}
      </motion.p>

      {/* Social Proof */}
      <div className="text-center">
        <p className="text-xl font-bold mb-1" style={{ color: "hsl(168 60% 54%)" }}>
          Mais de 25.000 donos de cães
        </p>
        <p className="text-sm text-muted-foreground">escolheram Canino Obediente 360°</p>
      </div>

      {/* Confetti Effect */}
      {showConfetti && currentProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: "hsl(168 60% 54%)" }}
              initial={{
                x: "50%",
                y: "50%",
                opacity: 1,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Popup Modal */}
      {showPopupModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-2xl max-w-sm w-full"
            style={{ background: "hsl(230 20% 12%)", border: "2px solid hsl(230 15% 25%)" }}
          >
            <h3 className="text-lg font-bold text-center mb-6">
              {popupQuestion}
            </h3>
            <div className="flex flex-col gap-3">
              {popupOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handlePopupAnswer(option)}
                  className="option-card justify-center"
                >
                  <span className="text-sm font-medium">{option}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
