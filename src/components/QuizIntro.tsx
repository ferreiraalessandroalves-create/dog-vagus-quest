import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import logoIcon from "@/assets/canino-logo-icon.webp";
import puppyImg from "@/assets/puppy.webp";
import adolescentImg from "@/assets/adolescent.webp";
import adultImg from "@/assets/adult.webp";
import seniorImg from "@/assets/senior.webp";
import { cn } from "@/lib/utils";

interface QuizIntroProps {
  selected?: string;
  onAnswer: (value: string) => void;
}

export default function QuizIntro({ selected, onAnswer }: QuizIntroProps) {
  const benefits = [
    "Método cientificamente comprovado",
    "Personalizado para seu cachorro",
    "Resultados em 21 dias",
  ];

  const options = [
    { value: "puppy", label: "Filhote (< 6 meses)", image: puppyImg },
    { value: "adolescent", label: "Adolescente (6-18 meses)", image: adolescentImg },
    { value: "adult", label: "Adulto (1,5-7 anos)", image: adultImg },
    { value: "senior", label: "Idoso (7+ anos)", image: seniorImg },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col items-center px-4 py-4 md:py-8"
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-3 flex w-full items-center gap-3"
        >
          <img
            src={logoIcon}
            alt="Canino Obediente 360°"
            width={40}
            height={40}
            loading="eager"
            decoding="async"
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
          />
          <div className="flex-1" aria-label="Progresso: pergunta 1 de 6">
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>Avaliação rápida</span>
              <span>1 de 6</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/6 rounded-full bg-primary" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-[29px] font-extrabold leading-[1.08] text-foreground md:text-5xl md:leading-[1.08]"
        >
          <span className="block">Por que ele obedece o adestrador</span>
          <span className="mt-1 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            e ignora VOCÊ?
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Não é falta de autoridade. É o estado do sistema nervoso dele. Responda 6 perguntas e descubra o nível de tensão do seu cão.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 w-full"
        >
          <p className="mb-2 text-center text-sm font-bold text-foreground">
            Para começar, qual a idade do seu cachorro?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant="outline"
                onClick={() => onAnswer(option.value)}
                className={cn(
                  "h-[68px] justify-start gap-2 whitespace-normal rounded-lg px-3 py-2 text-left text-xs font-semibold leading-tight shadow-sm",
                  selected === option.value && "border-primary bg-primary/10 text-foreground ring-1 ring-primary",
                )}
              >
                <img
                  src={option.image}
                  alt=""
                  width={44}
                  height={44}
                  loading="eager"
                  decoding="async"
                  className="h-11 w-11 shrink-0 object-contain"
                />
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex w-full flex-col items-center gap-2"
        >
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success" />
              <span className="text-xs md:text-sm">{benefit}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center text-xs text-muted-foreground"
        >
          Junte-se a mais de 25.000 donos de cães que transformaram a vida de seus pets
        </motion.p>
      </div>
    </motion.div>
  );
}
