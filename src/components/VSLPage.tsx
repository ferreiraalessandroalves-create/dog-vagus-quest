import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import imgFx48 from "@/assets/Image_fx_48.png";
import imgFx49 from "@/assets/Image_fx_49.png";
import imgFx50 from "@/assets/Image_fx_50.png";
import imgFx51 from "@/assets/Image_fx_51.png";
import imgFx52 from "@/assets/Image_fx_52.png";
import imgFx53 from "@/assets/Image_fx_53.png";
import heroBg from "@/assets/hero-2.jpeg";

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

const COMPARISONS = [
  {
    before: { img: imgFx52, alt: "Cachorros reativos e agressivos", label: "Cachorros reativos e difíceis de controlar" },
    after: { img: imgFx53, alt: "Passeio tranquilo com múltiplos cães", label: "Passeio tranquilo e harmonioso com múltiplos cães" },
  },
  {
    before: { img: imgFx50, alt: "Casa bagunçada e dona estressada", label: "Casa bagunçada e estresse constante" },
    after: { img: imgFx51, alt: "Cachorro calmo e ambiente organizado", label: "Cachorro calmo e harmonia total em casa" },
  },
  {
    before: { img: imgFx48, alt: "Cachorro puxando a guia violentamente", label: "Cachorro puxando a guia e sem controle" },
    after: { img: imgFx49, alt: "Passeio tranquilo e obediente", label: "Passeio tranquilo com perfeito controle" },
  },
];

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

const HeroBar = ({ label, value, color }: { label: string; value: number; color: "red" | "green" }) => (
  <div>
    <div className="flex justify-between items-center mb-1 sm:mb-2">
      <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate mr-2">{label}</span>
      <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${color === "red" ? "text-red-600" : "text-green-600"}`}>{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-4">
      <div
        className={`h-2.5 sm:h-4 rounded-full transition-all duration-500 ${color === "red" ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-green-500 to-green-600"}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const VSLPage = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-white">
      {/* SEÇÃO 1: TIMER NO TOPO */}
      <section className="py-4 px-6 bg-red-50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl p-4 text-center border-2 border-red-200">
            <p className="text-sm font-semibold mb-2 text-red-800">⏰ Oferta disponível por:</p>
            <div className="text-4xl font-black text-red-600" style={{ fontVariantNumeric: "tabular-nums" }}>{minutes}:{seconds}</div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: MINI VSL DE TEXTO */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">Parabéns! Identificamos o perfil do seu cachorro.</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">Antes de te dar acesso ao protocolo, preciso te explicar por que tudo que você já tentou não funcionou.</p>
          <p className="text-gray-700 leading-relaxed mb-6">Métodos tradicionais de adestramento usam punição e repetição forçada. Isso ativa o sistema de estresse do seu cão — quanto mais você pune, mais ansioso e reativo ele fica. Por isso late mais, puxa mais e desobedece mais.</p>
          <p className="text-gray-700 leading-relaxed">O Canino Obediente 360° ativa o nervo vago — o sistema de calma natural do seu cão. Quando o nervo vago é ativado, o comportamento muda naturalmente, sem punição e sem estresse.</p>
        </div>
      </section>

      {/* SEÇÃO 3: HERO COM BARRAS ANTES/DEPOIS */}
      <section className="relative flex items-center justify-center px-4 py-16 min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight px-4">
            <span className="text-white block mb-2">DEIXE SEU CACHORRO</span>
            <span className="text-orange-400 block mb-2 text-5xl md:text-6xl lg:text-7xl">10X MAIS OBEDIENTE</span>
            <span className="text-white block text-3xl md:text-4xl lg:text-5xl">EM APENAS 21 DIAS COM O</span>
            <span className="text-white block text-3xl md:text-4xl lg:text-5xl">MÉTODO DE EQUILÍBRIO DO NERVO VAGO</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-red-200 hover:border-red-400 transition-all duration-300">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-lg">❌ ANTES DE USAR</div>
              </div>
              <div className="space-y-2 sm:space-y-4">
                {BEFORE_BARS.map((bar) => <HeroBar key={bar.label} label={bar.label} value={bar.value} color="red" />)}
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-green-200 hover:border-green-400 transition-all duration-300">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-lg">✅ DEPOIS DE USAR</div>
              </div>
              <div className="space-y-2 sm:space-y-4">
                {AFTER_BARS.map((bar) => <HeroBar key={bar.label} label={bar.label} value={bar.value} color="green" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: PROBLEMAS */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sua vida antes de começar a usar o Canino Obediente 360°</h2>
          <div className="space-y-3">
            {PROBLEMS.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 text-red-600">❌</span>
                <p className="text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: BENEFÍCIOS */}
      <section className="py-8 px-6 bg-emerald-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">A vida depois de começar a usar o Canino Obediente 360°</h2>
          <div className="space-y-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 text-emerald-500">✅</span>
                <p className="text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: COMPARATIVOS ANTES/DEPOIS COM IMAGENS */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">ESSE É O NÍVEL DE OBEDIÊNCIA QUE VOCÊ VAI ATINGIR</h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">COM SEU CACHORRO EM 21 DIAS</h3>
          </div>

          <div className="space-y-12">
            {COMPARISONS.map((comp, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8">
                <div className="relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-red-500 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl">❌ ANTES</span>
                  </div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-red-300 group-hover:border-red-500 transition-all duration-300 transform group-hover:scale-105">
                    <img src={comp.before.img} alt={comp.before.alt} className="w-full h-96 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                      <p className="text-white font-bold text-xl text-center drop-shadow-lg">{comp.before.label}</p>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-green-500 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl">✅ DEPOIS</span>
                  </div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-green-300 group-hover:border-green-500 transition-all duration-300 transform group-hover:scale-105">
                    <img src={comp.after.img} alt={comp.after.alt} className="w-full h-96 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                      <p className="text-white font-bold text-xl text-center drop-shadow-lg">{comp.after.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">
              Educar seu cachorro não precisa ser complexo e demorado,<br />21 dias é o suficiente
            </h2>
          </div>

          <div className="mt-8 text-center max-w-md mx-auto">
            <CTAButton>🎯 Quero Transformar Meu Cachorro Agora!</CTAButton>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: LISTA COMPLETA */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">NESSE PROGRAMA VOCÊ TERÁ ACESSO A:</h2>
          <div className="space-y-3">
            {ACCESS_LIST.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 text-emerald-500">✅</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VSLPage;
