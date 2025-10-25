import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import QuizIntro from "@/components/QuizIntro";
import QuestionCard from "@/components/QuestionCard";
import MultipleChoice from "@/components/MultipleChoice";
import ScaleQuestion from "@/components/ScaleQuestion";
import SocialProof from "@/components/SocialProof";
import { Button } from "@/components/ui/button";
import puppyImg from "@/assets/puppy.png";
import adolescentImg from "@/assets/adolescent.png";
import adultImg from "@/assets/adult.png";
import seniorImg from "@/assets/senior.png";

interface QuizState {
  currentStep: number;
  answers: Record<string, any>;
}

const Index = () => {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: {},
  });

  // Save progress to localStorage
  useEffect(() => {
    if (state.currentStep > 0) {
      localStorage.setItem("quiz_progress", JSON.stringify(state));
    }
  }, [state]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("quiz_progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setState(data);
      } catch (e) {
        console.error("Error loading saved progress", e);
      }
    }
  }, []);

  const handleAnswer = (questionId: string, value: any) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalSteps = 8; // Total number of quiz steps
  const progressPercent = (state.currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {state.currentStep > 0 && state.currentStep < totalSteps && (
        <ProgressBar percent={progressPercent} />
      )}

      <AnimatePresence mode="wait">
        {/* Step 0: Intro */}
        {state.currentStep === 0 && (
          <QuizIntro key="intro" onStart={nextStep} />
        )}

        {/* Step 1: Dog age */}
        {state.currentStep === 1 && (
          <QuestionCard
            key="age"
            title="Para começar, qual a idade do seu cachorro?"
            subtitle="Isso nos ajuda a personalizar seu plano"
            onBack={prevStep}
          >
            <MultipleChoice
              variant="card"
              options={[
                {
                  value: "puppy",
                  label: "Filhote (Menos de 6 meses)",
                  image: puppyImg,
                },
                {
                  value: "adolescent",
                  label: "Adolescente (6-18 meses)",
                  image: adolescentImg,
                },
                {
                  value: "adult",
                  label: "Adulto (1,5-7 anos)",
                  image: adultImg,
                },
                {
                  value: "senior",
                  label: "Idoso (Acima de 7 anos)",
                  image: seniorImg,
                },
              ]}
              selected={state.answers.dog_age}
              onSelect={(value) => {
                handleAnswer("dog_age", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 2: Gender */}
        {state.currentStep === 2 && (
          <QuestionCard
            key="gender"
            title="Seu cachorro é..."
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "male", label: "Macho", emoji: "♂️" },
                { value: "female", label: "Fêmea", emoji: "♀️" },
              ]}
              selected={state.answers.dog_gender}
              onSelect={(value) => {
                handleAnswer("dog_gender", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 3: Breed */}
        {state.currentStep === 3 && (
          <QuestionCard
            key="breed"
            title="Escolha a raça do seu cachorro"
            subtitle="Isso ajuda a personalizar o desafio de acordo com as tendências comportamentais"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "mixed", label: "Vira-lata/SRD", emoji: "🐕" },
                { value: "labrador", label: "Labrador", emoji: "🦮" },
                { value: "pitbull", label: "Pitbull", emoji: "🐕‍🦺" },
                { value: "german", label: "Pastor Alemão", emoji: "🐕" },
                { value: "bulldog", label: "Bulldog", emoji: "🐶" },
                { value: "poodle", label: "Poodle", emoji: "🐩" },
                { value: "other", label: "Outra raça", emoji: "🐾" },
              ]}
              selected={state.answers.dog_breed}
              onSelect={(value) => {
                handleAnswer("dog_breed", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 4: Social Proof */}
        {state.currentStep === 4 && (
          <SocialProof key="social" onContinue={nextStep} />
        )}

        {/* Step 5: Pain question - Pulling */}
        {state.currentStep === 5 && (
          <QuestionCard
            key="pulling"
            title="Meu cachorro me arrasta pela rua"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <ScaleQuestion
              selected={state.answers.pain_pulling}
              onSelect={(value) => handleAnswer("pain_pulling", value)}
            />
            {state.answers.pain_pulling !== undefined && (
              <div className="flex justify-center pt-6">
                <Button
                  onClick={nextStep}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
                >
                  Próximo
                </Button>
              </div>
            )}
            {state.answers.pain_pulling >= 4 && (
              <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <p className="text-sm">
                  <strong>Você sabia que...</strong>
                  <br />
                  86% dos donos de cães que lidam com puxões na coleira também
                  notam sinais de tensão no nervo vago em seus cachorros. As
                  próximas perguntas ajudarão a determinar se o problema está
                  ligado à tensão do nervo vago.
                </p>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 6: Pain question - Startles */}
        {state.currentStep === 6 && (
          <QuestionCard
            key="startles"
            title="Meu cachorro se assusta com qualquer barulhinho"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <ScaleQuestion
              selected={state.answers.pain_startles}
              onSelect={(value) => handleAnswer("pain_startles", value)}
            />
            {state.answers.pain_startles !== undefined && (
              <div className="flex justify-center pt-6">
                <Button
                  onClick={nextStep}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
                >
                  Próximo
                </Button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 7: Pain question - Barking */}
        {state.currentStep === 7 && (
          <QuestionCard
            key="barking"
            title="Meu cachorro late para tudo que vê"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <ScaleQuestion
              selected={state.answers.pain_barking}
              onSelect={(value) => handleAnswer("pain_barking", value)}
            />
            {state.answers.pain_barking !== undefined && (
              <div className="flex justify-center pt-6">
                <Button
                  onClick={nextStep}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
                >
                  Próximo
                </Button>
              </div>
            )}
            {state.answers.pain_barking >= 4 && (
              <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <p className="text-sm">
                  <strong>Você precisa saber que...</strong>
                  <br />
                  Até pequenas hiper-reações do seu cachorro, como latir para
                  tudo, podem ser os primeiros sinais de alerta de que seu cão
                  tem um problema no nervo vago.
                </p>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 8: Final message */}
        {state.currentStep === 8 && (
          <QuestionCard
            key="final"
            title="Obrigado por completar a avaliação!"
            subtitle="Estamos preparando seu plano personalizado..."
          >
            <div className="text-center space-y-6 py-8">
              <div className="inline-block p-6 bg-success/10 rounded-full">
                <svg
                  className="w-16 h-16 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-muted-foreground">
                Em um projeto real, aqui você seria direcionado para o
                checkout ou para receber seu plano por email.
              </p>
              <Button
                onClick={() => setState({ currentStep: 0, answers: {} })}
                variant="outline"
              >
                Recomeçar Quiz
              </Button>
            </div>
          </QuestionCard>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
