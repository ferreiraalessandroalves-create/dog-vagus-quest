import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import logoIcon from "@/assets/canino-logo-icon.png";

interface EmailCaptureProps {
  dogName: string;
  onSubmit: (email: string) => void;
  disabled?: boolean;
}

export default function EmailCapture({
  dogName,
  onSubmit,
  disabled = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [acceptTips, setAcceptTips] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const emailDomains = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"];

  const getSuggestions = () => {
    if (!email || email.includes("@")) return [];
    return emailDomains.map((domain) => email + domain);
  };

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      onSubmit(email);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col px-4 pt-16 pb-8"
    >
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
        {/* Logo */}
        <div className="quiz-header">
          <img src={logoIcon} alt="Canino Obediente 360°" className="quiz-logo-img" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="question-title">Estamos quase lá! 🎉</h2>
          <p className="question-subtitle">
            Para onde enviamos o plano personalizado de{" "}
            <span style={{ color: "hsl(45 100% 51%)" }}>{dogName}</span>?
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 flex-1">
          {/* Owner name input */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Seu nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="quiz-input"
            />
          </div>

          {/* Email input with autocomplete */}
          <div className="relative">
            <label className="text-sm text-muted-foreground mb-2 block">Seu melhor email</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowSuggestions(e.target.value.length > 0 && !e.target.value.includes("@"));
              }}
              onFocus={() => setShowSuggestions(email.length > 0 && !email.includes("@"))}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="quiz-input"
            />

            {/* Email suggestions dropdown */}
            {showSuggestions && getSuggestions().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 rounded-xl overflow-hidden shadow-lg"
                style={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 13% 91%)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                {getSuggestions().map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setEmail(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Checkbox for tips */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTips}
              onChange={(e) => setAcceptTips(e.target.checked)}
              className="w-5 h-5 rounded mt-0.5"
              style={{ accentColor: "hsl(168 60% 54%)" }}
            />
            <span className="text-sm text-muted-foreground">
              Quero receber dicas exclusivas de adestramento
            </span>
          </label>

          {/* Privacy notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "hsl(210 20% 98%)" }}>
            <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Seus dados estão seguros. Não enviamos spam, apenas informações relevantes sobre o treinamento.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={disabled || !email || !email.includes("@")}
            className="cta-button"
          >
            {disabled ? "Enviando..." : "Ver Meu Resultado"}
            {!disabled && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
