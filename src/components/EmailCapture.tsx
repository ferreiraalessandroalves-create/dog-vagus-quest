import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lock } from "lucide-react";
interface EmailCaptureProps {
  dogName: string;
  onSubmit: (email: string) => void;
}
export default function EmailCapture({
  dogName,
  onSubmit
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const emailDomains = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@aol.com", "@outlook.com"];
  const getEmailUsername = (email: string) => {
    return email.split("@")[0];
  };
  const getSuggestions = () => {
    if (!email || email.includes("@")) return [];
    return emailDomains.map(domain => email + domain);
  };
  const handleSubmit = () => {
    if (email && email.includes("@")) {
      onSubmit(email);
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-primary">​Canino Obediente 360°</h2>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold">
            Digite seu email para receber o Plano Personalizado de Equilíbrio do
            Nervo Vago de <span className="text-accent">{dogName}</span>
          </h1>
          
          <p className="text-muted-foreground">Digite seu email:</p>
        </div>

        <div className="space-y-4 relative">
          <Input type="email" placeholder="Digite seu email para obter seu plano" value={email} onChange={e => {
          setEmail(e.target.value);
          setShowSuggestions(e.target.value.length > 0 && !e.target.value.includes("@"));
        }} onFocus={() => setShowSuggestions(email.length > 0 && !email.includes("@"))} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} className="h-14 text-lg" />

          {showSuggestions && getSuggestions().length > 0 && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="absolute z-10 w-full bg-card border-2 border-border rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {getSuggestions().map((suggestion, idx) => <button key={idx} onClick={() => {
            setEmail(suggestion);
            setShowSuggestions(false);
          }} className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors border-b border-border last:border-b-0">
                  {suggestion}
                </button>)}
            </motion.div>}

          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
            <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Protegemos sua privacidade e estamos comprometidos em proteger seus
              dados pessoais. Nunca enviamos emails de spam, apenas informações
              relevantes.
            </p>
          </div>

          <Button onClick={handleSubmit} disabled={!email || !email.includes("@")} size="lg" className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
            Continuar
          </Button>
        </div>
      </div>
    </motion.div>;
}