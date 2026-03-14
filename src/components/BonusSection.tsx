import { useEffect, useRef, useState } from "react";
import receitasImg from "@/assets/bonuses/receitas.png";
import checklistImg from "@/assets/bonuses/checklist.png";
import transformacaoImg from "@/assets/bonuses/transformacao.png";

const CHECKOUT_URL = "https://pay.kiwify.com.br/ANFvpl3";

const BONUSES = [
  {
    badge: "BÔNUS 1",
    title: "Check List Diário de Treinamento Canino",
    description: "Acompanhe o progresso do seu cão dia a dia com clareza",
    originalPrice: "De R$ 37,00",
  },
  {
    badge: "BÔNUS 2",
    title: "Transformação do Ambiente de Treinamento Canino",
    description: "Monte o espaço ideal para treinar em casa com facilidade",
    originalPrice: "De R$ 47,00",
  },
  {
    badge: "BÔNUS 3",
    title: "34 Receitas Fáceis para seu Amigo",
    description: "Petiscos saudáveis que viram a recompensa perfeita no treino",
    originalPrice: "De R$ 27,00",
  },
];

const FadeIn = ({ delay = 0, children, className = "", style }: { delay?: number; children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const COVERS = [
  { img: checklistImg, alt: "Check List" },
  { img: receitasImg, alt: "34 Receitas" },
  { img: transformacaoImg, alt: "Transformação" },
];

const Carousel3D = () => {
  const [active, setActive] = useState(1);

  // Auto-rotate every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStyle = (index: number): React.CSSProperties => {
    const pos = (index - active + 3) % 3; // 0=left, 1=center, 2=right
    if (pos === 1) {
      return {
        transform: "translateX(0) rotateY(0deg) scale(1.1)",
        zIndex: 3,
        boxShadow: "0 0 50px 12px rgba(255,200,0,0.5)",
        opacity: 1,
      };
    }
    if (pos === 0) {
      return {
        transform: "translateX(clamp(-140px, -18vw, -100px)) rotateY(25deg) scale(0.85)",
        zIndex: 1,
        boxShadow: "0 0 25px 6px rgba(255,200,0,0.25)",
        opacity: 0.85,
      };
    }
    return {
      transform: "translateX(clamp(100px, 18vw, 140px)) rotateY(-25deg) scale(0.85)",
      zIndex: 1,
      boxShadow: "0 0 25px 6px rgba(255,200,0,0.25)",
      opacity: 0.85,
    };
  };

  return (
    <div className="flex justify-center items-center mb-14" style={{ perspective: "1200px" }}>
      <div className="relative flex items-center justify-center" style={{ width: "100%", maxWidth: 600, height: 380 }}>
        {COVERS.map((cover, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="absolute rounded-xl overflow-hidden cursor-pointer"
            style={{
              width: "clamp(140px, 24vw, 200px)",
              aspectRatio: "9/16",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
              ...getStyle(i),
            }}
          >
            <img src={cover.img} alt={cover.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

const BonusSection = () => {
  return (
    <section className="py-16 px-4" style={{ background: "#07071a" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "#FFD700" }}>
            INCLUSOS GRATUITAMENTE
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">🎁 SEUS BÔNUS EXCLUSIVOS</h2>
          <div className="w-24 h-0.5 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
        </FadeIn>

        {/* 3D Carousel */}
        <Carousel3D />

        {/* Bonus Cards */}
        <div className="space-y-4 mb-10">
          {BONUSES.map((bonus, i) => (
            <FadeIn key={i} delay={0.1 * (i + 1)}>
              <div
                className="relative rounded-xl overflow-hidden flex"
                style={{
                  background: "linear-gradient(135deg, #0f0f2a, #1a1a3a)",
                  border: "1px solid rgba(255, 200, 0, 0.3)",
                }}
              >
                {/* Gold left bar */}
                <div className="w-1 flex-shrink-0" style={{ background: "linear-gradient(to bottom, #FFD700, #FF8C00)" }} />

                <div className="p-4 sm:p-5 flex-1">
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
                    style={{ background: "#FFD700", color: "#000" }}
                  >
                    {bonus.badge}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1">{bonus.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">{bonus.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xs line-through" style={{ textDecorationColor: "#ef4444" }}>
                      {bonus.originalPrice}
                    </span>
                    <span className="font-black text-lg" style={{ color: "#FFD700" }}>GRÁTIS</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Total Value Box */}
        <FadeIn delay={0.4}>
          <div
            className="rounded-2xl p-6 sm:p-8 text-center mb-8"
            style={{
              background: "linear-gradient(135deg, #1a1200, #2e2000)",
              border: "2px solid #FFD700",
              boxShadow: "0 0 20px rgba(255,200,0,0.3)",
            }}
          >
            <p className="text-white text-base mb-2">Valor total dos bônus:</p>
            <p className="text-2xl text-gray-400 line-through mb-2" style={{ textDecorationColor: "#ef4444" }}>
              R$ 111,00
            </p>
            <p className="text-xl sm:text-2xl font-black mb-2" style={{ color: "#FFD700" }}>
              ✨ Você recebe TUDO gratuitamente ✨
            </p>
            <p className="text-gray-500 text-sm italic">Apenas ao garantir seu acesso hoje</p>
          </div>
        </FadeIn>


      </div>

      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 10px rgba(255,200,0,0.4); }
          50% { box-shadow: 0 0 30px rgba(255,200,0,0.7); }
        }
      `}</style>
    </section>
  );
};

export default BonusSection;
