import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enviarParaGoogleSheets } from "@/lib/googleSheets";
import QuizIntro from "@/components/QuizIntro";
import QuestionCard from "@/components/QuestionCard";
import MultipleChoice from "@/components/MultipleChoice";
import MultipleChoiceCheckbox from "@/components/MultipleChoiceCheckbox";
import ScaleQuestion from "@/components/ScaleQuestion";
import SocialProof from "@/components/SocialProof";
import LoadingScreen from "@/components/LoadingScreen";
import LoadingAnalise from "@/components/LoadingAnalise";
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
import ExitModalBefore from "@/components/ExitModalBefore";
import ExitModalAfter from "@/components/ExitModalAfter";
import VSLPage from "@/components/VSLPage";
import { ArrowRight } from "lucide-react";
import { useQuizSubmission } from "@/hooks/useQuizSubmission";
import puppyImg from "@/assets/puppy.png";
import adolescentImg from "@/assets/adolescent.png";
import adultImg from "@/assets/adult.png";
import seniorImg from "@/assets/senior.png";
import ofertaLimitada from "@/assets/oferta-desconto.png";
import ofertaMobile from "@/assets/imagem_final.png";

interface QuizState {
  currentStep: number;
  answers: Record<string, any>;
  dogName: string;
  ownerName: string;
  userEmail: string;
}

const Index = () => {
  const { submitQuiz, isLoading } = useQuizSubmission();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: {},
    dogName: "",
    ownerName: "",
    userEmail: "",
  });

  // Exit Intent States
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [showExitModal, setShowExitModal] = useState<"before" | "after" | null>(null);

  // Exit Intent - Mouse leaving viewport
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered) {
        setExitIntentTriggered(true);
        setShowExitModal(emailCaptured ? "after" : "before");
      }
    };
    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, [emailCaptured, exitIntentTriggered]);

  // Exit Intent - Page close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!exitIntentTriggered) {
        const message = emailCaptured
          ? "⚠️ ESPERE! Garantir 61% de desconto antes de sair?"
          : "Não saia antes de receber seu plano personalizado de GRAÇA!";
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [emailCaptured, exitIntentTriggered]);

  const closeExitModal = () => {
    setShowExitModal(null);
    setExitIntentTriggered(false);
  };

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

  const calculateResults = () => {
    const painScores = Object.keys(state.answers)
      .filter((k) => k.startsWith("pain_") && typeof state.answers[k] === "number")
      .map((k) => state.answers[k]);

    const avgScore =
      painScores.length > 0 ? painScores.reduce((a, b) => a + b, 0) / painScores.length : 5;
    const tensionLevel = Math.min(11.5, (avgScore / 5) * 11.5);

    const problems: string[] = [];
    if (state.answers.pain_pulling >= 4) problems.push("Puxar a coleira");
    if (state.answers.pain_barking >= 4) problems.push("Latidos excessivos");
    if (state.answers.pain_startles >= 4) problems.push("Assustar-se facilmente");
    if (state.answers.pain_other_dogs >= 4) problems.push("Reatividade com outros cães");
    if (state.answers.pain_ignores >= 4) problems.push("Ignorar comandos");

    return { tensionLevel, mainProblems: problems };
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

  /*
   * NOVO FLUXO REORGANIZADO:
   * 0: Intro
   * 1-3: Qualificação (idade, gênero, raça)
   * 4: Social Proof
   * 5-17: Perguntas SPIN (dores)
   * 18: Micro Result
   * 19-20: Educação (nervo vago)
   * 21: Motivação
   * 22: Objetivo principal
   * 23: Authority
   * 24: Nome do cachorro
   * 25: ⭐ EMAIL CAPTURE (ANTES DA OFERTA!)
   * 26: Diagnosis
   * 27: Tempo disponível
   * 28: Speed Proof
   * 29: LoadingAnalise (depoimentos + análise 5s)
   * 30: Testimonial
   * 31: Chart
   * 32: Scratch/Reveal
   * 33+: Oferta final
   */

  const totalSteps = 34;
  const progressPercent = (state.currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen">

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
                { value: "puppy", label: "Filhote (< 6 meses)", image: puppyImg },
                { value: "adolescent", label: "Adolescente (6-18 meses)", image: adolescentImg },
                { value: "adult", label: "Adulto (1,5-7 anos)", image: adultImg },
                { value: "senior", label: "Idoso (7+ anos)", image: seniorImg },
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
          <QuestionCard key="gender" title="Seu cachorro é..." onBack={prevStep}>
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
            subtitle="Isso ajuda a personalizar o desafio"
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
        {state.currentStep === 4 && <SocialProof key="social" onContinue={nextStep} />}

        {/* Step 5: Pain - Pulling */}
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
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
            {state.answers.pain_pulling >= 4 && (
              <div className="info-box mt-4">
                <strong>Você sabia?</strong> 86% dos donos com esse problema também notam sinais de tensão no nervo vago.
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 6: Pain - Startles */}
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
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 7: Pain - Barking */}
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
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
            {state.answers.pain_barking >= 4 && (
              <div className="info-box mt-4">
                <strong>Importante:</strong> Até pequenas hiper-reações podem ser sinais de alerta de problema no nervo vago.
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 8: Pain - Other dogs */}
        {state.currentStep === 8 && (
          <QuestionCard
            key="pain_other_dogs"
            title="Meu cachorro fica louco ao ver outros cães"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <ScaleQuestion
              selected={state.answers.pain_other_dogs}
              onSelect={(value) => handleAnswer("pain_other_dogs", value)}
            />
            {state.answers.pain_other_dogs !== undefined && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 9: Digestion */}
        {state.currentStep === 9 && (
          <QuestionCard
            key="pain_digestion"
            title="Você tem notado a digestão do seu cachorro desbalanceada?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "yes", label: "Sim, às vezes", emoji: "😔" },
                { value: "unsure", label: "Não tenho certeza", emoji: "🤔" },
                { value: "no", label: "Não, não notei", emoji: "😊" },
              ]}
              selected={state.answers.pain_digestion}
              onSelect={(value) => {
                handleAnswer("pain_digestion", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 10: Physical changes */}
        {state.currentStep === 10 && (
          <QuestionCard
            key="pain_physical"
            title="Você notou mudanças físicas, como aumento do tempo de sono?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "yes", label: "Sim, às vezes", emoji: "😬" },
                { value: "unsure", label: "Não tenho certeza", emoji: "🤔" },
                { value: "no", label: "Não, não notei", emoji: "🤗" },
              ]}
              selected={state.answers.pain_physical}
              onSelect={(value) => {
                handleAnswer("pain_physical", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 11: Unexplained behavior */}
        {state.currentStep === 11 && (
          <QuestionCard
            key="pain_unexplained"
            title="O comportamento do meu cachorro muda sem razão clara"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <ScaleQuestion
              selected={state.answers.pain_unexplained}
              onSelect={(value) => handleAnswer("pain_unexplained", value)}
            />
            {state.answers.pain_unexplained !== undefined && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 12: Coming home */}
        {state.currentStep === 12 && (
          <QuestionCard
            key="pain_coming_home"
            title="Como seu cachorro reage quando você chega em casa?"
            subtitle="Escolha todas que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "scratches", label: "Arranha a porta antes de eu abrir", emoji: "🚪" },
                { value: "jumps", label: "Extremamente empolgado, pulando", emoji: "🚀" },
                { value: "pees", label: "Tão empolgado que faz xixi", emoji: "✨" },
                { value: "barks", label: "Late muito", emoji: "📢" },
                { value: "hides", label: "Se esconde ou fica acuado", emoji: "🙈" },
                { value: "calm", label: "Me cumprimenta calmamente", emoji: "☺️" },
              ]}
              selected={state.answers.pain_coming_home || []}
              onSelect={(value) => handleAnswer("pain_coming_home", value)}
            />
            {state.answers.pain_coming_home?.length > 0 && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 13: Behavioral issues */}
        {state.currentStep === 13 && (
          <QuestionCard
            key="pain_behaviors"
            title="Quais problemas comportamentais você observa?"
            subtitle="Escolha todas que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "energy", label: "Energia excessiva", emoji: "⚡" },
                { value: "aggression", label: "Agressividade", emoji: "😤" },
                { value: "pulling", label: "Puxar a coleira", emoji: "🐕" },
                { value: "separation", label: "Ansiedade de separação", emoji: "😰" },
                { value: "barking", label: "Latidos excessivos", emoji: "🔊" },
                { value: "destructive", label: "Comportamento destrutivo", emoji: "💥" },
                { value: "soiling", label: "Fazer xixi/cocô em casa", emoji: "🏠" },
              ]}
              selected={state.answers.pain_behaviors || []}
              onSelect={(value) => handleAnswer("pain_behaviors", value)}
            />
            {state.answers.pain_behaviors?.length > 0 && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 14: Stress */}
        {state.currentStep === 14 && (
          <QuestionCard
            key="pain_stress"
            title="Seu cachorro fica estressado ou assustado facilmente?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "yes", label: "Sim", emoji: "✅" },
                { value: "sometimes", label: "Nem sempre", emoji: "🤔" },
                { value: "no", label: "Não", emoji: "❌" },
              ]}
              selected={state.answers.pain_stress}
              onSelect={(value) => {
                handleAnswer("pain_stress", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 15: Stress triggers */}
        {state.currentStep === 15 && (
          <QuestionCard
            key="pain_triggers"
            title="O que desencadeia o medo ou estresse?"
            subtitle="Escolha todas que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "other_dogs", label: "Outros cachorros", emoji: "🐶" },
                { value: "new_people", label: "Pessoas novas", emoji: "🙋" },
                { value: "loud_noises", label: "Trovões ou barulhos", emoji: "🌪️" },
                { value: "alone", label: "Ficar sozinho", emoji: "🏠" },
                { value: "vet", label: "Visitas ao veterinário", emoji: "💉" },
                { value: "travel", label: "Viagens de carro", emoji: "🚗" },
                { value: "fireworks", label: "Fogos de artifício", emoji: "🎆" },
              ]}
              selected={state.answers.pain_triggers || []}
              onSelect={(value) => handleAnswer("pain_triggers", value)}
            />
            {state.answers.pain_triggers?.length > 0 && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 16: Excitement */}
        {state.currentStep === 16 && (
          <QuestionCard key="q16" title="Seu cão se excita facilmente?" onBack={prevStep}>
            <MultipleChoice
              options={[
                { value: "yes", label: "Sim", emoji: "😬" },
                { value: "not_always", label: "Nem sempre", emoji: "🤔" },
                { value: "no", label: "Não", emoji: "😐" },
              ]}
              selected={state.answers.q16}
              onSelect={(value) => {
                handleAnswer("q16", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 17: Excitement triggers */}
        {state.currentStep === 17 && (
          <QuestionCard
            key="q17"
            title="O que desencadeia a excitação do seu cão?"
            subtitle="Escolha todos que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "other_dogs", label: "Outros cães", emoji: "🐶" },
                { value: "new_people", label: "Pessoas novas", emoji: "🙋" },
                { value: "toys", label: "Brinquedos", emoji: "🎾" },
                { value: "food", label: "Comida", emoji: "🍖" },
                { value: "walks", label: "Passeios", emoji: "🏡" },
                { value: "family", label: "Membros da família", emoji: "👨‍👩‍👧" },
              ]}
              selected={state.answers.q17 || []}
              onSelect={(value) => handleAnswer("q17", value)}
            />
            {state.answers.q17?.length > 0 && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 18: Micro Result */}
        {state.currentStep === 18 && (
          <MicroResult key="micro" triggers={getTriggers()} onContinue={nextStep} />
        )}

        {/* Step 19: Vagus knowledge */}
        {state.currentStep === 19 && (
          <QuestionCard
            key="q19"
            title="Você já ouviu falar sobre o nervo vago de um cão?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "nothing", label: "Nada mesmo", emoji: "😬" },
                { value: "maybe", label: "Talvez uma ou duas coisas", emoji: "🤔" },
                { value: "expert", label: "Sou um especialista", emoji: "😎" },
              ]}
              selected={state.answers.q19}
              onSelect={(value) => {
                handleAnswer("q19", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 20: Education */}
        {state.currentStep === 20 && <Education key="education" onContinue={nextStep} />}

        {/* Step 21: Motivation */}
        {state.currentStep === 21 && (
          <QuestionCard
            key="q21"
            title="Qual é a sua motivação para iniciar a jornada?"
            subtitle="Escolha todos que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "amor", label: "Meu amor pelo meu cachorro", emoji: "❤️" },
                { value: "longevidade", label: "Vida mais longa e saudável", emoji: "💪" },
                { value: "harmonia", label: "Convivência mais tranquila", emoji: "🏡" },
                { value: "outro", label: "Outro", emoji: "💭" },
              ]}
              selected={state.answers.q21 || []}
              onSelect={(value) => handleAnswer("q21", value)}
            />
            {state.answers.q21?.length > 0 && (
              <div className="mt-6">
                <button onClick={nextStep} className="cta-button group">
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 22: Main goal */}
        {state.currentStep === 22 && (
          <QuestionCard
            key="q22"
            title="Vamos definir seu objetivo principal!"
            subtitle="Escolha sua prioridade:"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "learn", label: "Conhecer mais sobre o nervo vago", emoji: "🤔" },
                { value: "calmer", label: "Tornar meu cão mais calmo", emoji: "📢" },
                { value: "bond", label: "Construir um vínculo mais forte", emoji: "❤️" },
              ]}
              selected={state.answers.q22}
              onSelect={(value) => {
                handleAnswer("q22", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 23: Authority */}
        {state.currentStep === 23 && <Authority key="authority" onContinue={nextStep} />}

        {/* Step 24: Dog Name */}
        {state.currentStep === 24 && (
          <InputQuestion
            key="name"
            title="Qual é o nome do seu cachorro?"
            placeholder="Digite o nome aqui..."
            value={state.dogName}
            onChange={(value) => setState((p) => ({ ...p, dogName: value }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {/* Step 25: ⭐ EMAIL CAPTURE - ANTES DA OFERTA! */}
        {state.currentStep === 25 && (
          <EmailCapture
            key="email"
            dogName={state.dogName || "seu cachorro"}
            disabled={isSubmitting}
            onSubmit={async (email) => {
              if (isSubmitting) return;

              setIsSubmitting(true);
              setEmailCaptured(true);

              setState((p) => ({ ...p, userEmail: email }));
              const results = calculateResults();

              // Send to Google Sheets
              const dadosQuiz = {
                email,
                dogName: state.dogName || "",
                dogAge: state.answers.dog_age,
                dogGender: state.answers.dog_gender,
                dogBreed: state.answers.dog_breed,
                painPulling: state.answers.pain_pulling,
                painBarking: state.answers.pain_barking,
                painStartles: state.answers.pain_startles,
                painOtherDogs: state.answers.pain_other_dogs,
                painUnexplained: state.answers.pain_unexplained,
                tensionLevel: results.tensionLevel,
                mainProblems: results.mainProblems,
                mainGoal: state.answers.q22,
                timeAvailable: state.answers.time,
                commitment: state.answers.commitment,
              };

              try {
                await enviarParaGoogleSheets(dadosQuiz);
              } catch (error) {
                console.error("Erro ao enviar:", error);
              } finally {
                setIsSubmitting(false);
              }

              // Save to database
              const quizData = {
                user_email: email,
                dog_name: state.dogName,
                dog_age: state.answers.dog_age,
                dog_gender: state.answers.dog_gender,
                dog_breed: state.answers.dog_breed,
                pain_pulling: state.answers.pain_pulling,
                pain_startles: state.answers.pain_startles,
                pain_barking: state.answers.pain_barking,
                pain_other_dogs: state.answers.pain_other_dogs,
                pain_unexplained: state.answers.pain_unexplained,
                pain_digestion: state.answers.pain_digestion,
                pain_physical: state.answers.pain_physical,
                pain_coming_home: state.answers.pain_coming_home,
                pain_behaviors: state.answers.pain_behaviors,
                pain_stress: state.answers.pain_stress,
                pain_triggers: state.answers.pain_triggers,
                excitement_triggers: state.answers.q17,
                motivations: state.answers.q21,
                main_goal: state.answers.q22,
                time_available: state.answers.time,
                previous_training: state.answers.previousTraining,
                commitment: state.answers.commitment,
                vagus_knowledge: state.answers.q19,
                tension_level: results.tensionLevel,
                main_problems: results.mainProblems,
              };

              await submitQuiz(quizData);
              nextStep();
            }}
          />
        )}

        {/* Step 26: Diagnosis */}
        {state.currentStep === 26 && (
          <Diagnosis
            key="diagnosis"
            dogName={state.dogName || "seu cachorro"}
            {...calculateResults()}
            onContinue={nextStep}
          />
        )}

        {/* Step 27: Time available */}
        {state.currentStep === 27 && (
          <QuestionCard
            key="time"
            title="Quanto tempo você pode dedicar por dia?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "5-10", label: "5-10 minutos", emoji: "⏱️" },
                { value: "10-20", label: "10-20 minutos", emoji: "⏰" },
                { value: "20+", label: "Mais de 20 minutos", emoji: "🕐" },
              ]}
              selected={state.answers.time}
              onSelect={(value) => {
                handleAnswer("time", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 28: Speed proof */}
        {state.currentStep === 28 && (
          <SpeedProof
            key="speed"
            dogName={state.dogName || "seu cachorro"}
            estimatedDate={getEstimatedDate()}
            onContinue={nextStep}
          />
        )}

        {/* Step 29: Loading Análise com depoimentos */}
        {state.currentStep === 29 && (
          <LoadingAnalise
            key="loading-analise"
            nomeDoCao={state.dogName || "seu cachorro"}
            onComplete={nextStep}
          />
        )}

        {/* Step 30: Testimonial */}
        {state.currentStep === 30 && <Testimonial key="testimonial" onContinue={nextStep} />}

        {/* Step 31: Chart */}
        {state.currentStep === 31 && (
          <ProgressChart
            key="chart"
            dogName={state.dogName || "seu cachorro"}
            onContinue={nextStep}
          />
        )}

        {/* Step 32: Discount reveal */}
        {state.currentStep === 32 && (
          <ScratchCard key="scratch" dogName={state.dogName || "seu cachorro"} onReveal={nextStep} />
        )}

        {/* Step 33+: VSL Sales Page */}
        {state.currentStep >= 33 && (
          <VSLPage key="vsl" />
        )}
      </AnimatePresence>

      {/* Exit Intent Modals */}
      <ExitModalBefore isOpen={showExitModal === "before"} onClose={closeExitModal} />
      <ExitModalAfter isOpen={showExitModal === "after"} onClose={closeExitModal} />
    </div>
  );
};

export default Index;
