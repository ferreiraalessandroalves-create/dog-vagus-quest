import { motion, AnimatePresence } from "framer-motion";
import happyDog from "@/assets/happy-dog.jpg";

interface ExitModalAfterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitModalAfter = ({ isOpen, onClose }: ExitModalAfterProps) => {
  const redirectToCheckout = () => {
    window.location.href = "https://pay.kiwify.com.br/ANFvpl3";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md rounded-2xl p-6 text-center overflow-y-auto max-h-[90vh]"
            style={{
              background: "linear-gradient(135deg, #ff6b6b 0%, #EE5A6F 100%)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 text-3xl font-light hover:text-white transition-colors leading-none"
              aria-label="Fechar"
            >
              ×
            </button>

            {/* Dog image */}
            <div className="mx-auto mb-4">
              <img
                src={happyDog}
                alt="Cachorro feliz"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                style={{ border: "4px solid rgba(255,255,255,0.3)" }}
              />
            </div>

            {/* Discount */}
            <div className="text-5xl md:text-6xl font-black text-white mb-2 leading-none">
              61% OFF
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-yellow-200 mb-4 leading-tight">
              🎉 OFERTA EXCLUSIVA! 🎉
            </h2>

            {/* Text */}
            <div className="text-sm md:text-base text-white leading-relaxed mb-6 space-y-2">
              <p>Antes de sair...</p>
              <p>Que tal garantir seu plano com 61% de desconto?</p>
              <p>
                De <span className="line-through opacity-70">R$ 147,00</span> por apenas{" "}
                <span className="text-yellow-200 text-lg md:text-xl font-bold">R$ 57,33</span>
              </p>
              <p className="font-semibold">⏰ Esta oferta expira em 15 minutos!</p>
            </div>

            {/* Primary CTA */}
            <motion.button
              onClick={redirectToCheckout}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full bg-white text-red-500 px-6 py-4 rounded-xl text-base md:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg mb-3"
            >
              🚀 Sim! Quero 61% OFF Agora
            </motion.button>

            {/* Secondary CTA */}
            <button
              onClick={onClose}
              className="w-full bg-transparent border-2 border-white/50 text-white px-4 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors"
            >
              Não, vou perder o desconto
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitModalAfter;
