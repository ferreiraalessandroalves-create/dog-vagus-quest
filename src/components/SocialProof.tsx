import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import awardSeal from "@/assets/award-seal.png";
import vagusNerveDog from "@/assets/vagus-nerve-dog.jpg";
interface SocialProofProps {
  onContinue: () => void;
}
export default function SocialProof({
  onContinue
}: SocialProofProps) {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Hero Image */}
        <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl">
          <img src={vagusNerveDog} alt="Nervo Vago Canino" className="w-full h-auto" />
        </motion.div>

        {/* Main stat */}
        <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.2
      }}>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Mais de{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">25.000</span>{" "}
            donos
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            escolheram o{" "}
            <span className="font-semibold text-foreground">
              Desafio de Equilíbrio do Nervo Vago
            </span>{" "}
            para ajudar seus cães a superar a reatividade!
          </p>
        </motion.div>

        {/* Quote card */}
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.4
      }} className="bg-gradient-to-br from-accent/10 to-primary/10 p-8 rounded-3xl border border-accent/20">
          <div className="text-6xl mb-4 text-accent/30">❝</div>
          <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
            Reatividade não é uma falha — é o nervo vago do seu cachorro pedindo ajuda
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Canino Obediente 360</span>
            <span>• Equipe especializada</span>
          </div>
        </motion.div>

        {/* Academic badge */}
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.6
      }} className="flex items-center justify-center gap-4 p-6 bg-card rounded-2xl border">
          <div className="flex items-center justify-center w-20 h-20">
            <img src={awardSeal} alt="Selo Acadêmico" className="w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">
              Descobertas científicas mais recentes
            </p>
            <p className="text-sm text-muted-foreground">
              Apresentadas em Oxford, Harvard e Cambridge
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.8
      }} className="pt-4">
          <Button onClick={onContinue} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
            Continuar
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>;
}