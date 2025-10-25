import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import QuizIntro from "@/components/QuizIntro";
import QuestionCard from "@/components/QuestionCard";
import MultipleChoice from "@/components/MultipleChoice";
import ScaleQuestion from "@/components/ScaleQuestion";
import SocialProof from "@/components/SocialProof";
import LoadingScreen from "@/components/LoadingScreen";
import MicroResult from "@/components/MicroResult";
import Education from "@/components/Education";
import Authority from "@/components/Authority";
import Diagnosis from "@/components/Diagnosis";
import SpeedProof from "@/components/SpeedProof";
import Testimonial from "@/components/Testimonial";
import EmailCapture from "@/components/EmailCapture";
import ProgressChart from "@/components/ProgressChart";
import ScratchCard from "@/components/ScratchCard";
import InputQuestion from "@/components/InputQuestion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import puppyImg from "@/assets/puppy.png";
import adolescentImg from "@/assets/adolescent.png";
import adultImg from "@/assets/adult.png";
import seniorImg from "@/assets/senior.png";

interface QuizState {
  currentStep: number;
  answers: Record<string, any>;
  dogName: string;
  userEmail: string;
}

const Index = () => {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: {},
    dogName: "",
    userEmail: "",
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
        const timeDiff = Date.now() - (data.timestamp || 0);
        // Only load if less than 24 hours old
        if (timeDiff < 86400000) {
          setState(data);
        }
      } catch (e) {
        console.error("Error loading saved progress", e);
      }
    }
  }, []);

  const handleAnswer = (questionId: string, value: any) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
      timestamp: Date.now(),
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

  const calculateResults = () => {
    const painScores = Object.keys(state.answers)
      .filter((k) => k.startsWith("pain_") && typeof state.answers[k] === "number")
      .map((k) => state.answers[k]);

    const avgScore = painScores.length > 0 
      ? painScores.reduce((a, b) => a + b, 0) / painScores.length 
      : 5;
    
    const tensionLevel = Math.min(11.5, (avgScore / 5) * 11.5);

    const problems: string[] = [];
    if (state.answers.pain_pulling >= 4) problems.push("Puxar a coleira");
    if (state.answers.pain_barking >= 4) problems.push("Latidos excessivos");
    if (state.answers.pain_startles >= 4) problems.push("Assustar-se facilmente");
    if (state.answers.pain_other_dogs >= 4) problems.push("Reatividade com outros cães");
    if (state.answers.pain_ignores >= 4) problems.push("Ignorar comandos");

    return { tensionLevel, problems };
  };

  const getEstimatedDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 21);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getTriggers = () => {
    const triggers: string[] = [];
    const answers = state.answers;
    
    if (answers.pain_pulling >= 4) triggers.push("Puxar a coleira durante passeios");
    if (answers.pain_barking >= 4) triggers.push("Latidos excessivos para estímulos externos");
    if (answers.pain_startles >= 4) triggers.push("Reações de medo a sons e movimentos");
    if (triggers.length === 0) triggers.push("Comportamentos de ansiedade geral");
    
    return triggers;
  };

  const totalSteps = 37;
  const progressPercent = (state.currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {state.currentStep > 0 && state.currentStep < 27 && (
        <ProgressBar percent={progressPercent} />
      )}

      <AnimatePresence mode="wait">
        {/* Step 0: Intro */}
        {state.currentStep === 0 && <QuizIntro key="intro" onStart={nextStep} />}

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

        {/* Steps 8-16: More pain questions */}
        {state.currentStep === 8 && (
          <QuestionCard key="pain4" title="Meu cachorro fica louco ao ver outros cães" subtitle="Você se identifica com essa situação?" onBack={prevStep}>
            <ScaleQuestion selected={state.answers.pain_other_dogs} onSelect={(v) => handleAnswer("pain_other_dogs", v)} />
            {state.answers.pain_other_dogs !== undefined && <div className="flex justify-center pt-6"><Button onClick={nextStep} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">Próximo</Button></div>}
          </QuestionCard>
        )}

        {[9, 10, 11, 12, 13, 14, 15, 16].map((step) => state.currentStep === step && (
          <QuestionCard key={`step${step}`} title={`Pergunta ${step}`} onBack={prevStep}>
            <Button onClick={nextStep} size="lg" className="bg-accent hover:bg-accent/90">Próximo</Button>
          </QuestionCard>
        ))}

        {/* Step 17: Micro Result */}
        {state.currentStep === 17 && <MicroResult key="micro" triggers={getTriggers()} onContinue={nextStep} />}

        {/* Step 18: Education */}
        {state.currentStep === 18 && <Education key="education" onContinue={nextStep} />}

        {/* Step 19-21: More questions */}
        {[19, 20, 21].map((step) => state.currentStep === step && (
          <QuestionCard key={`step${step}`} title={`Pergunta ${step}`} onBack={prevStep}>
            <Button onClick={nextStep}>Próximo</Button>
          </QuestionCard>
        ))}

        {/* Step 22: Authority */}
        {state.currentStep === 22 && <Authority key="authority" onContinue={nextStep} />}

        {/* Step 23: Dog Name */}
        {state.currentStep === 23 && <InputQuestion key="name" title="Qual o nome do seu cachorro?" placeholder="Nome" value={state.dogName} onChange={(v) => setState((p) => ({ ...p, dogName: v }))} onNext={nextStep} onBack={prevStep} />}

        {/* Step 24: Diagnosis */}
        {state.currentStep === 24 && <Diagnosis key="diagnosis" dogName={state.dogName || "seu cachorro"} {...calculateResults()} onContinue={nextStep} />}

        {/* Step 25-26 */}
        {state.currentStep === 25 && <QuestionCard key="time" title="Tempo disponível" onBack={prevStep}><Button onClick={nextStep}>Próximo</Button></QuestionCard>}
        {state.currentStep === 26 && <SpeedProof key="speed" dogName={state.dogName || "seu cachorro"} estimatedDate={getEstimatedDate()} onContinue={nextStep} />}

        {/* Steps 27-31: Loading & Popups */}
        {state.currentStep === 27 && <LoadingScreen key="load1" progress={32} text="Preparando..." showPopup popupQuestion="Treino anterior?" popupOptions={["Não", "Sim"]} onPopupAnswer={() => {}} onComplete={nextStep} />}
        {[28, 29, 30].map((step) => state.currentStep === step && <LoadingScreen key={`load${step}`} progress={step === 28 ? 32 : step === 29 ? 82 : 100} text="Carregando..." showConfetti={step === 30} onComplete={nextStep} />)}
        {state.currentStep === 31 && <LoadingScreen key="load31" progress={100} text="Plano pronto!" showConfetti onComplete={nextStep} />}

        {/* Step 32: Testimonial */}
        {state.currentStep === 32 && <Testimonial key="testimonial" onContinue={nextStep} />}

        {/* Step 33: Email */}
        {state.currentStep === 33 && <EmailCapture key="email" dogName={state.dogName || "seu cachorro"} onSubmit={(email) => { setState((p) => ({ ...p, userEmail: email })); nextStep(); }} />}

        {/* Step 34: Chart */}
        {state.currentStep === 34 && <ProgressChart key="chart" dogName={state.dogName || "seu cachorro"} onContinue={nextStep} />}

        {/* Step 35: Scratch */}
        {state.currentStep === 35 && <ScratchCard key="scratch" dogName={state.dogName || "seu cachorro"} onReveal={() => setTimeout(() => window.location.href = "/checkout", 2000)} />}

        {/* Step 36-37: Final redirect */}
        {state.currentStep >= 36 && <div className="min-h-screen flex items-center justify-center"><p>Redirecionando para checkout...</p></div>}
      </AnimatePresence>
    </div>
  );
};

export default Index;
