import { motion, AnimatePresence } from 'framer-motion';

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
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[600px] rounded-[30px] p-10 md:p-[60px] text-center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            {/* Botão X */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-4xl md:text-5xl font-light hover:opacity-80 transition-opacity leading-none"
              aria-label="Fechar"
            >
              ×
            </button>

            {/* Emoji */}
            <div className="text-5xl md:text-6xl mb-5">⚠️</div>

            {/* Título */}
            <h2 className="text-2xl md:text-[2.5rem] font-black text-white mb-6 leading-tight">
              Espere! Não saia agora...
            </h2>

            {/* Texto principal */}
            <div className="text-base md:text-[1.3rem] text-white leading-[1.8] mb-8 space-y-4">
              <p>Não saia antes de receber seu plano personalizado de <strong>GRAÇA!</strong></p>
              <p>
                Você está a apenas 1 minuto de descobrir exatamente como 
                transformar o comportamento do seu cachorro.
              </p>
              <p>
                Mais de <span className="text-[#fef08a] font-bold">250.000</span> pessoas já receberam o plano gratuito.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onClose}
              className="bg-[#10b981] text-white px-8 md:px-[50px] py-4 md:py-5 rounded-full text-lg md:text-[1.2rem] font-bold hover:bg-[#059669] transition-colors shadow-lg"
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
