import { motion, AnimatePresence } from 'framer-motion';
import happyDog from '@/assets/happy-dog.jpg';

interface ExitModalAfterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitModalAfter = ({ isOpen, onClose }: ExitModalAfterProps) => {
  const redirectToCheckout = () => {
    window.location.href = 'https://pay.kiwify.com.br/ANFvpl3';
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
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[600px] rounded-[30px] p-10 md:p-[60px] text-center overflow-y-auto max-h-[95vh]"
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
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

            {/* Imagem do cachorro */}
            <div className="mx-auto mb-5">
              <img
                src={happyDog}
                alt="Cachorro feliz"
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full object-cover mx-auto"
                style={{ border: '8px solid rgba(255,255,255,0.3)' }}
              />
            </div>

            {/* Desconto gigante */}
            <div className="text-5xl md:text-[5rem] font-black text-white mb-2 leading-none">
              61% OFF
            </div>

            {/* Título */}
            <h2 className="text-2xl md:text-[2.5rem] font-black text-[#fef08a] mb-6 leading-tight">
              🎉 OFERTA EXCLUSIVA! 🎉
            </h2>

            {/* Texto principal */}
            <div className="text-base md:text-[1.3rem] text-white leading-[1.8] mb-6 space-y-3">
              <p>Antes de sair...</p>
              <p>Que tal garantir seu plano com 61% de desconto agora mesmo?</p>
              <p>
                De <span className="line-through opacity-80">R$ 174,00</span> por apenas{' '}
                <span className="text-[#fef08a] text-xl md:text-[1.8rem] font-bold">R$ 67,90</span>
              </p>
              <p className="text-lg font-semibold">⏰ Esta oferta expira em 15 minutos!</p>
            </div>

            {/* CTA Principal */}
            <motion.button
              onClick={redirectToCheckout}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white text-[#ff6b6b] px-6 md:px-[50px] py-4 md:py-5 rounded-full text-lg md:text-[1.3rem] font-bold hover:bg-gray-100 transition-colors shadow-lg w-full md:w-auto"
            >
              🚀 Sim! Quero Garantir 61% OFF Agora
            </motion.button>

            {/* CTA Secundário */}
            <button
              onClick={onClose}
              className="mt-4 bg-transparent border-2 border-white text-white px-6 md:px-[30px] py-3 md:py-4 rounded-full text-sm md:text-base hover:bg-white/10 transition-colors w-full md:w-auto"
            >
              Não, obrigado. Vou perder o desconto.
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitModalAfter;
