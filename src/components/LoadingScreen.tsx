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
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-background to-muted/20 relative"
    >
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary">Canino Obediente 360°</h2>
      </div>

      {/* Circular Progress */}
      <div className="relative w-40 h-40 mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-accent"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * currentProgress) / 100}
            strokeLinecap="round"
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">{currentProgress}%</span>
        </div>
      </div>

      {/* Text */}
      <p className="text-center text-muted-foreground max-w-md mb-8">{text}</p>

      {/* Social Proof */}
      <div className="text-center">
        <p className="text-2xl font-bold text-accent mb-2">
          Mais de 250.000 donos de cães
        </p>
        <p className="text-muted-foreground">escolheram Canino Obediente 360°</p>
      </div>

      {/* Confetti Effect */}
      {showConfetti && currentProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
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
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card p-8 rounded-2xl shadow-xl max-w-md w-full border-2 border-border"
          >
            <h3 className="text-xl font-bold text-center mb-6">
              {popupQuestion}
            </h3>
            <div className="flex gap-4">
              {popupOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handlePopupAnswer(option)}
                  className="flex-1 py-3 px-6 rounded-xl border-2 border-border hover:border-accent hover:bg-accent/10 transition-all font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
