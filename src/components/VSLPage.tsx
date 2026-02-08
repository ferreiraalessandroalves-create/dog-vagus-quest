import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import happyDog from "@/assets/happy-dog.jpg";

const CHECKOUT_URL = "https://pay.kiwify.com.br/ANFvpl3";

const BEFORE_BARS = [
  { label: "Qualidade comportamental", value: 20 },
  { label: "Satisfação pessoal", value: 35 },
  { label: "Produtividade nos passeios", value: 15 },
  { label: "Facilidade para educar", value: 22 },
  { label: "Conhecimento em adestramento", value: 15 },
];

const AFTER_BARS = [
  { label: "Qualidade comportamental", value: 100 },
  { label: "Satisfação pessoal", value: 93 },
  { label: "Produtividade nos passeios", value: 95 },
  { label: "Facilidade para educar", value: 95 },
  { label: "Conhecimento em adestramento", value: 92 },
];

const PROBLEMS = [
  "Cachorro reativo e desobediente",
  "Vergonha de passear com ele",
  "Muito tempo gasto tentando educar",
  "Se sentir perdido no adestramento",
  "Passeios sem controle",
  "Qualidade de vida baixa",
  "Dificuldade de ter um cão calmo",
  "Comportamento que não impressiona",
];

const BENEFITS = [
  "Cachorro calmo e obediente",
  "Orgulho de passear com ele",
  "Treinos rápidos de 5-10 minutos",
  "Método profissional validado",
  "Passeios tranquilos e prazerosos",
  "Qualidade de vida excelente",
  "Técnicas do Nervo Vago funcionando",
  "Comportamento que impressiona a todos",
  "Comandos essenciais dominados",
  "Vínculo fortalecido com seu cão",
];

const ACCESS_LIST = [
  "Método profissional completo",
  "Treinos de 5-10 minutos",
  "Reforço positivo comprovado",
  "Demonstrações em vídeo",
  "Correção de comportamentos",
  "Técnicas do nervo vago",
  "Comandos essenciais – Senta, Fica, Vem, Deita",
  "Guia PDF completo",
  "Para toda família",
  "Vínculo fortalecido",
  "Aplicativo Canino Obediente 360°",
];

const ProgressBar = ({ value, color }: { value: number; color: "red" | "green" }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`h-full ${color === "red" ? "bg-red-500" : "bg-green-500"}`}
    />
  </div>
);

const CTAButton = ({ children }: { children?: React.ReactNode }) => (
  <motion.a
    href={CHECKOUT_URL}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="block w-full text-center text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transition-all"
    style={{
      background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
      boxShadow: "0 4px 20px rgba(251, 146, 60, 0.3)",
    }}
  >
    {children || "Obter o Canino Obediente 360°"}
  </motion.a>
);

const VSLPage = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [showPopup, setShowPopup] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Popup after 30s
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 30000);
    return () => clearTimeout(t);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      {/* SEÇÃO 1: HERO */}
      <section className="py-8 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-center leading-tight mb-4" style={{ color: "#1F2937" }}>
            DEIXE SEU CACHORRO{" "}
            <span style={{ color: "#FB923C" }}>10X MAIS OBEDIENTE</span>{" "}
            EM APENAS 21 DIAS COM O MÉTODO DE EQUILÍBRIO DO NERVO VAGO
          </h1>
          <p className="text-center text-base" style={{ color: "#6B7280" }}>
            Transforme no seu celular ou app
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: ANTES/DEPOIS BARRAS */}
      <section className="py-8 px-6" style={{ background: "#F9FAFB" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Antes */}
          <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
              style={{ background: "#FEF2F2", color: "#DC2626" }}>
              ANTES DE USAR
            </div>
            <div className="space-y-4">
              {BEFORE_BARS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm" style={{ color: "#374151" }}>{bar.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "#DC2626" }}>{bar.value}%</span>
                  </div>
                  <ProgressBar value={bar.value} color="red" />
                </div>
              ))}
            </div>
          </div>

          {/* Depois */}
          <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
              style={{ background: "#D1FAE5", color: "#059669" }}>
              DEPOIS DE USAR
            </div>
            <div className="space-y-4">
              {AFTER_BARS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm" style={{ color: "#374151" }}>{bar.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "#059669" }}>{bar.value}%</span>
                  </div>
                  <ProgressBar value={bar.value} color="green" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PROBLEMAS */}
      <section className="py-8 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>
            Sua vida antes de começar a usar o Canino Obediente 360°
          </h2>
          <div className="space-y-3">
            {PROBLEMS.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0" style={{ color: "#DC2626" }}>❌</span>
                <p style={{ color: "#374151" }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: BENEFÍCIOS */}
      <section className="py-8 px-6" style={{ background: "#ECFDF5" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>
            A vida depois de começar a usar o Canino Obediente 360°
          </h2>
          <div className="space-y-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0" style={{ color: "#10B981" }}>✅</span>
                <p style={{ color: "#374151" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: LISTA COMPLETA */}
      <section className="py-8 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#1F2937" }}>
            NESSE PROGRAMA VOCÊ TERÁ ACESSO A:
          </h2>
          <div className="space-y-3">
            {ACCESS_LIST.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0" style={{ color: "#10B981" }}>✅</span>
                <p style={{ color: "#374151" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: TIMER + OFERTA */}
      <section className="py-8 px-6" style={{ background: "#F9FAFB" }}>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Timer */}
          <div className="rounded-xl p-4 text-center" style={{ background: "#FEF2F2", border: "2px solid #FECACA" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "#991B1B" }}>
              ⏰ Oferta disponível por:
            </p>
            <div className="text-4xl font-black" style={{ color: "#DC2626", fontVariantNumeric: "tabular-nums" }}>
              {minutes}:{seconds}
            </div>
          </div>

          {/* Offer Box */}
          <div className="rounded-2xl p-6" style={{
            background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
            border: "3px solid #FB923C",
          }}>
            <div className="text-center font-bold py-3 px-4 rounded-lg mb-6 text-white"
              style={{ background: "#F97316" }}>
              🎁 CONDIÇÃO ESPECIAL COM 61% DE DESCONTO
            </div>

            <h3 className="text-2xl font-bold text-center mb-2" style={{ color: "#1F2937" }}>
              Canino Obediente 360°
            </h3>
            <p className="text-center mb-6" style={{ color: "#6B7280" }}>
              Acesso completo ao método + App + Suporte
            </p>

            <div className="text-center mb-6">
              <p className="text-sm line-through" style={{ color: "#9CA3AF" }}>De R$ 120,50</p>
              <p className="text-lg mb-2" style={{ color: "#374151" }}>Por apenas</p>
              <p className="text-5xl font-black" style={{ color: "#059669" }}>R$ 47,00</p>
              <p className="text-sm mt-2" style={{ color: "#6B7280" }}>ou 12x de R$ 4,30</p>
            </div>

            <CTAButton />
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: GRID ANTES/DEPOIS VISUAL */}
      <section className="py-8 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-8" style={{ color: "#1F2937" }}>
            ESSE É O NÍVEL DE OBEDIÊNCIA QUE VOCÊ VAI ATINGIR COM SEU CACHORRO EM 21 DIAS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={`before-${i}`} className="contents">
                <div>
                  <div className="w-full h-48 rounded-xl flex items-center justify-center text-6xl"
                    style={{ background: "#FEF2F2" }}>
                    😟
                  </div>
                  <p className="text-center text-sm mt-2" style={{ color: "#6B7280" }}>Antes</p>
                </div>
                <div>
                  <div className="w-full h-48 rounded-xl flex items-center justify-center text-6xl"
                    style={{ background: "#ECFDF5" }}>
                    😊
                  </div>
                  <p className="text-center text-sm mt-2" style={{ color: "#6B7280" }}>Depois</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 8: FACILIDADE */}
      <section className="py-8 px-6" style={{ background: "#F9FAFB" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>
            Educar seu cachorro não precisa ser complexo e demorado,<br />
            21 dias é o suficiente
          </h2>
          <CTAButton />
        </div>
      </section>

      {/* SEÇÃO 9: APP GRATUITO */}
      <section className="py-8 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, #40C4AA 0%, #2DD4BF 100%)" }}>
            📱
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>
            O aplicativo para acompanhar é gratuito
          </h2>
          <p className="leading-relaxed" style={{ color: "#6B7280" }}>
            Nós ensinamos e você usa o aplicativo Canino Obediente 360° para
            acompanhar o progresso do seu cachorro no celular. Ele é 100%
            gratuito e você não terá custo nenhum para usar.
          </p>
        </div>
      </section>

      {/* SEÇÃO 10: GARANTIA 7 DIAS */}
      <section className="py-8 px-6" style={{ background: "#ECFDF5" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <polygon
                points="60,5 73,40 110,40 80,62 90,98 60,78 30,98 40,62 10,40 47,40"
                fill="#7C3AED"
                stroke="#6D28D9"
                strokeWidth="2"
              />
              <text x="60" y="58" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">7</text>
              <text x="60" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">DIAS</text>
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>
            Garantia de 100% de devolução do dinheiro
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: "#374151" }}>
            O nosso programa de adestramento é apoiado por uma garantia de 100%
            de devolução do dinheiro. Estamos tão confiantes de que o nosso
            produto vai te ajudar que garantimos um reembolso total no prazo de
            7 dias após a compra, se não vir resultados visíveis no comportamento
            do seu cachorro.
          </p>
          <CTAButton />
        </div>
      </section>

      {/* SEÇÃO 11: POPUP 61% OFF */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl p-8 text-center overflow-y-auto max-h-[90vh]"
              style={{ background: "linear-gradient(135deg, #FF6B7A 0%, #EE5A6F 100%)" }}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-white text-2xl leading-none"
              >
                ✕
              </button>

              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden"
                style={{ border: "4px solid rgba(255,255,255,0.3)" }}>
                <img src={happyDog} alt="Cachorro feliz" className="w-full h-full object-cover" />
              </div>

              <div className="text-5xl font-black text-white mb-2">61% OFF</div>
              <p className="text-white text-lg mb-4">🎉 OFERTA EXCLUSIVA! 🎉</p>

              <p className="text-white mb-2">Antes de sair...</p>
              <p className="text-white text-lg font-semibold mb-4">
                Que tal garantir seu plano com 61% de desconto?
              </p>

              <div className="rounded-xl p-4 mb-4 text-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                <p className="text-white text-sm line-through">De R$ 120,50</p>
                <p className="text-white text-3xl font-black">R$ 47,00</p>
              </div>

              <p className="text-white text-sm mb-6">⏰ Esta oferta expira em 15 minutos!</p>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg mb-3"
                style={{ color: "#EE5A6F" }}
              >
                🎉 Sim! Quero 61% OFF Agora
              </a>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-3 px-6 rounded-xl text-sm text-white font-semibold"
                style={{ border: "2px solid rgba(255,255,255,0.5)", background: "transparent" }}
              >
                Não, vou perder o desconto
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VSLPage;
