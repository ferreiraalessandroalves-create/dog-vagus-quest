import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enviarParaGoogleSheets } from "@/lib/googleSheets";
import QuizIntro from "@/components/QuizIntro";
import QuestionCard from "@/components/QuestionCard";
import MultipleChoice from "@/components/MultipleChoice";
import MultipleChoiceCheckbox from "@/components/MultipleChoiceCheckbox";

import SocialProof from "@/components/SocialProof";
import LoadingScreen from "@/components/LoadingScreen";
import LoadingAnalise from "@/components/LoadingAnalise";
import MicroResult from "@/components/MicroResult";
import Education from "@/components/Education";
import Authority from "@/components/Authority";
import Diagnosis from "@/components/Diagnosis";
import SpeedProof from "@/components/SpeedProof";
import MiniVSLGate from "@/components/MiniVSLGate";
import EmailCapture from "@/components/EmailCapture";
import ProgressChart from "@/components/ProgressChart";

import InputQuestion from "@/components/InputQuestion";
import ExitModalBefore from "@/components/ExitModalBefore";
import ExitModalAfter from "@/components/ExitModalAfter";
import VSLPage from "@/components/VSLPage";
import QuizHeader from "@/components/QuizHeader";
import { ArrowRight } from "lucide-react";
import { useQuizSubmission } from "@/hooks/useQuizSubmission";
import { supabase } from "@/integrations/supabase/client";
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
  const [showExitModal, setShowExitModal] = useState<"after" | null>(null);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered && emailCaptured) {
        setExitIntentTriggered(true);
        setShowExitModal("after");
      }
    };
    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, [emailCaptured, exitIntentTriggered]);

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
   * FLUXO REORGANIZADO:
   * 0: Intro
   * 1-3: Qualificação (idade, gênero, raça)
   * 4: Social Proof
   * 5-8: Perguntas de dor (pulling, startles, barking, other dogs)
   * 9: Comportamento muda sem razão
   * 10: Coming home
   * 11: Behavioral issues
   * 12: Stress
   * 13: Stress triggers
   * 14: Micro Result
   * 15: Vagus knowledge
   * 16: Education
   * 17: Motivation
   * 18: Main goal
   * 19: Authority
   * 20: Dog name
   * 21: Diagnosis
   * 22: Time available
   * 23: Speed Proof
   * 24: LoadingAnalise
   * 25: MiniVSLGate
   * 26: EmailCapture
   * 27: ProgressChart
   * 28+: VSLPage
   */

  const totalSteps = 29;

  return (
    <div className="min-h-screen">
      {state.currentStep > 0 && state.currentStep < 28 && (
        <QuizHeader currentStep={state.currentStep} totalSteps={27} />
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
            <MultipleChoice
              options={[
                { value: "5", label: "Sim, ele puxa forte e fico sem controle", emoji: "🐕" },
                { value: "4", label: "Às vezes, dependendo do que ele vê", emoji: "😬" },
                { value: "3", label: "Puxa bastante, mas consigo segurar", emoji: "😓" },
              ]}
              selected={state.answers.pain_pulling?.toString()}
              onSelect={(value) => {
                handleAnswer("pain_pulling", Number(value));
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 6: Pain - Startles */}
        {state.currentStep === 6 && (
          <QuestionCard
            key="startles"
            title="Meu cachorro se assusta com qualquer barulho"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "5", label: "Sim, qualquer som já deixa ele em pânico", emoji: "😱" },
                { value: "4", label: "Às vezes, especialmente sons mais altos", emoji: "😰" },
                { value: "3", label: "Fica agitado mas passa rápido", emoji: "😬" },
              ]}
              selected={state.answers.pain_startles?.toString()}
              onSelect={(value) => {
                handleAnswer("pain_startles", Number(value));
                setTimeout(nextStep, 300);
              }}
            />
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
            <MultipleChoice
              options={[
                { value: "5", label: "Sim, late o tempo todo sem parar", emoji: "📢" },
                { value: "4", label: "Late bastante, especialmente para estranhos", emoji: "🔊" },
                { value: "3", label: "Late menos que antes, mas ainda é muito", emoji: "😤" },
              ]}
              selected={state.answers.pain_barking?.toString()}
              onSelect={(value) => {
                handleAnswer("pain_barking", Number(value));
                setTimeout(nextStep, 300);
              }}
            />
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
            <MultipleChoice
              options={[
                { value: "5", label: "Fica completamente descontrolado", emoji: "🤯" },
                { value: "4", label: "Fica muito agitado e difícil de controlar", emoji: "😬" },
                { value: "3", label: "Se empolga demais mas dá pra segurar", emoji: "😓" },
              ]}
              selected={state.answers.pain_other_dogs?.toString()}
              onSelect={(value) => {
                handleAnswer("pain_other_dogs", Number(value));
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 9: Unexplained behavior */}
        {state.currentStep === 9 && (
          <QuestionCard
            key="pain_unexplained"
            title="O comportamento do meu cachorro muda sem razão clara"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "5", label: "Sim, de repente fica agitado do nada", emoji: "🤔" },
                { value: "4", label: "Às vezes age estranhamente sem motivo", emoji: "😕" },
                { value: "3", label: "Tem dias bons e dias ruins sem explicação", emoji: "🤷" },
              ]}
              selected={state.answers.pain_unexplained?.toString()}
              onSelect={(value) => {
                handleAnswer("pain_unexplained", Number(value));
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 10: Coming home */}
        {state.currentStep === 10 && (
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

        {/* Step 11: Behavioral issues */}
        {state.currentStep === 11 && (
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

        {/* Step 12: Stress */}
        {state.currentStep === 12 && (
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

        {/* Step 13: Stress triggers */}
        {state.currentStep === 13 && (
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

        {/* Step 14: Micro Result */}
        {state.currentStep === 14 && (
          <MicroResult key="micro" triggers={getTriggers()} onContinue={nextStep} />
        )}

        {/* Step 15: Vagus knowledge */}
        {state.currentStep === 15 && (
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

        {/* Step 16: Education */}
        {state.currentStep === 16 && <Education key="education" onContinue={nextStep} />}

        {/* Step 17: Motivation */}
        {state.currentStep === 17 && (
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

        {/* Step 18: Main goal */}
        {state.currentStep === 18 && (
          <QuestionCard
            key="q22"
            title="Vamos definir seu objetivo principal!"
            subtitle="Escolha sua prioridade:"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "walk", label: "Quero passear sem vergonha com meu cão", emoji: "🚶" },
                { value: "calmer", label: "Quero um cão calmo e obediente em casa", emoji: "🏡" },
                { value: "bond", label: "Quero construir um vínculo mais forte com ele", emoji: "❤️" },
              ]}
              selected={state.answers.q22}
              onSelect={(value) => {
                handleAnswer("q22", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 19: Authority */}
        {state.currentStep === 19 && <Authority key="authority" onContinue={nextStep} />}

        {/* Step 20: Dog Name */}
        {state.currentStep === 20 && (
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

        {/* Step 21: Diagnosis */}
        {state.currentStep === 21 && (
          <Diagnosis
            key="diagnosis"
            dogName={state.dogName || "seu cachorro"}
            {...calculateResults()}
            onContinue={nextStep}
          />
        )}

        {/* Step 22: Time available */}
        {state.currentStep === 22 && (
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

        {/* Step 23: Speed proof */}
        {state.currentStep === 23 && (
          <SpeedProof
            key="speed"
            dogName={state.dogName || "seu cachorro"}
            estimatedDate={getEstimatedDate()}
            onContinue={nextStep}
          />
        )}

        {/* Step 24: Loading Análise */}
        {state.currentStep === 24 && (
          <LoadingAnalise
            key="loading-analise"
            nomeDoCao={state.dogName || "seu cachorro"}
            onComplete={nextStep}
          />
        )}

        {/* Step 25: MiniVSLGate */}
        {state.currentStep === 25 && (
          <MiniVSLGate
            key="mini-vsl-gate"
            dogName={state.dogName || "seu cachorro"}
            onContinue={nextStep}
          />
        )}

        {/* Step 26: ⭐ EMAIL CAPTURE */}
        {state.currentStep === 26 && (
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

              // Dispara email para o lead (assíncrono, não bloqueia)
              try {
                supabase.functions.invoke('send-lead-email', {
                  body: { email, dogName: state.dogName || "seu cachorro" },
                }).then(({ error }) => {
                  if (error) console.error('⚠️ Erro ao enviar email (não crítico):', error);
                  else console.log('📧 Email enviado ao lead');
                }).catch((err) => {
                  console.error('⚠️ Falha ao chamar send-lead-email:', err);
                });
              } catch (e) {
                console.error('⚠️ Erro ao iniciar envio de email:', e);
              }

              nextStep();
            }}
          />
        )}

        {/* Step 27: Chart */}
        {state.currentStep === 27 && (
          <ProgressChart
            key="chart"
            dogName={state.dogName || "seu cachorro"}
            onContinue={nextStep}
          />
        )}

        {/* Step 28+: VSL Sales Page */}
        {state.currentStep >= 28 && (
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
