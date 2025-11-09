import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-dog.jpg";
interface QuizIntroProps {
  onStart: () => void;
}
export default function QuizIntro({
  onStart
}: QuizIntroProps) {
  const benefits = ["Método cientificamente comprovado", "Personalizado para seu cachorro", "Resultados em 21 dias"];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="max-w-4xl w-full space-y-8">
        {/* Logo placeholder */}
        <motion.div initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.2
      }} className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Canino Obediente 360°
        </h2>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.3
      }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
          Descubra o{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Plano Personalizado
          </span>{" "}
          para Transformar o Comportamento do Seu Cachorro
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.4
      }} className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Baseado no revolucionário método de Equilíbrio do Nervo Vago
        </motion.p>

        {/* Hero Image */}
        <motion.div initial={{
        y: 30,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5
      }} className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <img src={heroImage} alt="Cachorro feliz com seu dono" className="w-full h-full object-cover" />
        </motion.div>

        {/* Benefits */}
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.6
      }} className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm md:text-base">
          {benefits.map((benefit, idx) => <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-foreground">{benefit}</span>
            </div>)}
        </motion.div>

        {/* CTA Button */}
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.7
      }} className="flex justify-center pt-4">
          <Button onClick={onStart} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
            Começar Avaliação Gratuita
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Trust badge */}
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.8
      }} className="text-center text-sm text-muted-foreground">
          Junte-se a mais de 250.000 donos de cães que transformaram a vida de seus pets
        </motion.p>
      </div>
    </motion.div>;
}