import { motion, AnimatePresence } from "framer-motion";

interface ExitModalBeforeProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitModalBefore = ({ isOpen, onClose }: ExitModalBeforeProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "hsl(0 0% 100%)",
              border: "2px solid hsl(220 13% 91%)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground/60 text-3xl font-light hover:text-foreground transition-colors leading-none"
              aria-label="Fechar"
            >
              ×
            </button>

            {/* Emoji */}
            <div className="text-5xl mb-4">⚠️</div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
              Espere! Não saia agora...
            </h2>

            {/* Text */}
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 space-y-3">
              <p>
                Não saia antes de receber seu plano personalizado de{" "}
                <strong className="text-foreground">GRAÇA!</strong>
              </p>
              <p>
                Você está a apenas 1 minuto de descobrir como transformar o comportamento do seu cachorro.
              </p>
              <p>
                Mais de{" "}
                <span style={{ color: "hsl(168 60% 54%)" }} className="font-bold">
                  25.000
                </span>{" "}
                pessoas já receberam o plano gratuito.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onClose}
              className="cta-button"
            >
              ✓ Ok, Quero Meu Plano Gratuito
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitModalBefore;
