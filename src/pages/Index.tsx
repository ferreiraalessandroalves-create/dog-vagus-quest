import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import QuizIntro from "@/components/QuizIntro";
import QuestionCard from "@/components/QuestionCard";
import MultipleChoice from "@/components/MultipleChoice";
import MultipleChoiceCheckbox from "@/components/MultipleChoiceCheckbox";
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
import ofertaLimitada from "@/assets/oferta-desconto.png";

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

  const resetQuiz = () => {
    setState({
      currentStep: 0,
      answers: {},
      dogName: "",
      userEmail: "",
    });
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

  const totalSteps = 36;
  const progressPercent = (state.currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {state.currentStep > 0 && state.currentStep < 28 && (
        <ProgressBar percent={progressPercent} />
      )}

      <AnimatePresence mode="wait">
        {/* Step 0: Intro */}
        {state.currentStep === 0 && <QuizIntro key="intro" onStart={nextStep} />}
        
        {/* Reset button - visible on all steps except intro */}
        {state.currentStep > 0 && state.currentStep < 28 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Button
              onClick={resetQuiz}
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              Reiniciar Quiz
            </Button>
          </motion.div>
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

        {/* Step 8: Pain question - Other dogs */}
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

        {/* Step 9: Digestion */}
        {state.currentStep === 9 && (
          <QuestionCard
            key="pain_digestion"
            title="Você tem notado a digestão do seu cachorro desbalanceada ultimamente?"
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
            title="Você já notou mudanças físicas no comportamento do seu cachorro, como aumento do tempo de sono?"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "yes", label: "Sim, às vezes", emoji: "😬" },
                { value: "unsure", label: "Não tenho certeza", emoji: "🤔" },
                { value: "no", label: "Não, não notei mudanças", emoji: "🤗" },
              ]}
              selected={state.answers.pain_physical}
              onSelect={(value) => {
                handleAnswer("pain_physical", value);
                setTimeout(nextStep, 300);
              }}
            />
          </QuestionCard>
        )}

        {/* Step 11: Unexplained behavior changes */}
        {state.currentStep === 11 && (
          <QuestionCard
            key="pain_unexplained"
            title="Sinto que o comportamento do meu cachorro muda às vezes sem nenhuma razão clara"
            subtitle="Você se identifica com essa situação?"
            onBack={prevStep}
          >
            <ScaleQuestion
              selected={state.answers.pain_unexplained}
              onSelect={(value) => handleAnswer("pain_unexplained", value)}
            />
            {state.answers.pain_unexplained !== undefined && (
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
            {state.answers.pain_unexplained >= 4 && (
              <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <p className="text-sm">
                  <strong>Sabemos como isso pode parecer...</strong>
                  <br />
                  O estresse e um nervo vago desequilibrado podem afetar o comportamento de um cachorro de várias maneiras. Analisamos mais de 500 estudos científicos para identificar os mais eficazes.
                </p>
              </div>
            )}
          </QuestionCard>
        )}

        {/* Step 12: Coming home reaction */}
        {state.currentStep === 12 && (
          <QuestionCard
            key="pain_coming_home"
            title="Como seu cachorro reage quando você chega em casa?"
            subtitle="Escolha todas que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "scratches", label: "Arranha a porta antes mesmo de eu abrir", emoji: "🚪" },
                { value: "jumps", label: "Extremamente empolgado, pulando e lambendo", emoji: "🚀" },
                { value: "pees", label: "Tão empolgado que faz xixi", emoji: "✨" },
                { value: "barks", label: "Late muito", emoji: "📢" },
                { value: "hides", label: "Se esconde ou fica acuado", emoji: "🙈" },
                { value: "calm", label: "Me cumprimenta calmamente", emoji: "☺️" },
              ]}
              selected={state.answers.pain_coming_home || []}
              onSelect={(value) => handleAnswer("pain_coming_home", value)}
            />
            {state.answers.pain_coming_home?.length > 0 && (
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

        {/* Step 13: Behavioral issues */}
        {state.currentStep === 13 && (
          <QuestionCard
            key="pain_behaviors"
            title="Quais destes problemas comportamentais ou tendências você observa no seu cachorro?"
            subtitle="Escolha todas que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "energy", label: "Energia excessiva e falta de controle", emoji: "⚡" },
                { value: "aggression", label: "Agressividade com pessoas ou outros animais", emoji: "😤" },
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
            title="O que desencadeia o medo ou estresse do seu cachorro?"
            subtitle="Escolha todas que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "other_dogs", label: "Outros cachorros", emoji: "🐶" },
                { value: "new_people", label: "Pessoas novas", emoji: "🙋" },
                { value: "loud_noises", label: "Trovões ou barulhos altos", emoji: "🌪️" },
                { value: "touch", label: "Toque ou manuseio inesperado", emoji: "👋" },
                { value: "alone", label: "Ficar sozinho", emoji: "🏠" },
                { value: "vet", label: "Visitas ao veterinário", emoji: "💉" },
                { value: "grooming", label: "Banho e tosa", emoji: "✂️" },
                { value: "animals", label: "Ver outros animais", emoji: "🦊" },
                { value: "travel", label: "Viagens de carro", emoji: "🚗" },
                { value: "fireworks", label: "Fogos de artifício ou celebrações", emoji: "🎆" },
                { value: "other", label: "Outro", emoji: "➕" },
              ]}
              selected={state.answers.pain_triggers || []}
              onSelect={(value) => handleAnswer("pain_triggers", value)}
            />
            {state.answers.pain_triggers?.length > 0 && (
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

        {/* Step 16: Excitement */}
        {state.currentStep === 16 && (
          <QuestionCard
            key="q16"
            title="Seu cão se excita facilmente?"
            onBack={prevStep}
          >
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
            <div className="mb-8 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop"
                alt="Cachorro animado"
                className="w-48 h-48 rounded-full object-cover border-4 border-accent/20"
              />
            </div>
            <MultipleChoiceCheckbox
              options={[
                { value: "other_dogs", label: "Outros cães", emoji: "🐶" },
                { value: "new_people", label: "Pessoas novas", emoji: "🙋" },
                { value: "toys", label: "Brinquedos", emoji: "🎾" },
                { value: "food", label: "Comida", emoji: "🍖" },
                { value: "walks", label: "Passeios ou atividades ao ar livre", emoji: "🏡" },
                { value: "family", label: "Ver membros da família", emoji: "👨‍👩‍👧" },
                { value: "small_animals", label: "Pequenos animais (como esquilos ou gatos)", emoji: "🐿️" },
                { value: "other", label: "Outro", emoji: "➕" },
              ]}
              selected={state.answers.q17 || []}
              onSelect={(value) => handleAnswer("q17", value)}
            />
            {state.answers.q17?.length > 0 && (
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

        {/* Step 18: Micro Result */}
        {state.currentStep === 18 && <MicroResult key="micro" triggers={getTriggers()} onContinue={nextStep} />}

        {/* Step 19: Vagus nerve knowledge */}
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
            title="Qual é a sua motivação para iniciar a jornada de resetar o nervo vago do seu cachorro??"
            subtitle="Escolha todos que se aplicam:"
            onBack={prevStep}
          >
            <MultipleChoiceCheckbox
              options={[
                { value: "love", label: "Meu amor pelo meu filhote", emoji: "❤️" },
                { value: "longevity", label: "Desejo de tornar a vida do filhote mais longa e feliz", emoji: "🥰" },
                { value: "easier_life", label: "Desejando uma vida mais fácil com meu cão", emoji: "☺️" },
                { value: "other", label: "Outro", emoji: "➕" },
              ]}
              selected={state.answers.q21 || []}
              onSelect={(value) => handleAnswer("q21", value)}
            />
            {state.answers.q21?.length > 0 && (
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

        {/* Step 22: Main goal */}
        {state.currentStep === 22 && (
          <QuestionCard
            key="q22"
            title="Vamos definir seu objetivo principal para iniciar o Desafio de Reset do Nervo Vago!"
            subtitle="Escolha sua prioridade:"
            onBack={prevStep}
          >
            <MultipleChoice
              options={[
                { value: "learn", label: "Conhecer mais sobre o nervo vago", emoji: "🤔" },
                { value: "calmer", label: "Tornar meu cão reativo mais calmo", emoji: "📢" },
                { value: "bond", label: "Construir um vínculo muito mais forte com meu cão", emoji: "❤️" },
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

        {/* Step 25: Diagnosis */}
        {state.currentStep === 25 && (
          <Diagnosis
            key="diagnosis"
            dogName={state.dogName || "seu cachorro"}
            {...calculateResults()}
            onContinue={nextStep}
          />
        )}

        {/* Step 26: Time available */}
        {state.currentStep === 26 && (
          <QuestionCard
            key="time"
            title="Quanto tempo você pode dedicar por dia ao treinamento?"
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

        {/* Step 27: Speed proof */}
        {state.currentStep === 27 && (
          <SpeedProof
            key="speed"
            dogName={state.dogName || "seu cachorro"}
            estimatedDate={getEstimatedDate()}
            onContinue={nextStep}
          />
        )}

        {/* Step 28: Loading with popup 1 */}
        {state.currentStep === 28 && (
          <LoadingScreen
            key="loading-1"
            progress={32}
            text="Analisando as respostas..."
            showPopup={true}
            popupQuestion="Você já tentou treinar seu cão antes?"
            popupOptions={[
              "Sim, mas não funcionou",
              "Não, é minha primeira vez",
            ]}
            onPopupAnswer={(value) => {
              handleAnswer("previousTraining", value);
            }}
            onComplete={nextStep}
          />
        )}

        {/* Step 29: Loading with popup 2 */}
        {state.currentStep === 29 && (
          <LoadingScreen
            key="loading-2"
            progress={82}
            text="Preparando seu plano personalizado..."
            showPopup={true}
            popupQuestion="Pronto para finalizar o que começou? Muitos donos começam mas desistem. Você está comprometido?"
            popupOptions={[
              "Sim, estou comprometido!",
              "Ainda pensando...",
            ]}
            onPopupAnswer={(value) => {
              handleAnswer("commitment", value);
            }}
            onComplete={nextStep}
          />
        )}

        {/* Step 30: Loading 100% with confetti */}
        {state.currentStep === 30 && (
          <LoadingScreen
            key="loading-3"
            progress={100}
            text="Plano pronto! 🎉"
            showConfetti={true}
            onComplete={nextStep}
          />
        )}

        {/* Step 31: Testimonial */}
        {state.currentStep === 31 && <Testimonial key="testimonial" onContinue={nextStep} />}

        {/* Step 32: Email */}
        {state.currentStep === 32 && (
          <EmailCapture
            key="email"
            dogName={state.dogName || "seu cachorro"}
            onSubmit={(email) => {
              setState((p) => ({ ...p, userEmail: email }));
              nextStep();
            }}
          />
        )}

        {/* Step 33: Chart */}
        {state.currentStep === 33 && (
          <ProgressChart
            key="chart"
            dogName={state.dogName || "seu cachorro"}
            onContinue={nextStep}
          />
        )}

        {/* Step 34: Scratch */}
        {state.currentStep === 34 && (
          <ScratchCard
            key="scratch"
            dogName={state.dogName || "seu cachorro"}
            onReveal={nextStep}
          />
        )}

        {/* Step 35: Discount popup (moved to ScratchCard) */}
        
        {/* Step 36: Final offer */}
        {state.currentStep >= 35 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)",
            }}
          >
            <div className="w-full px-2 md:px-8 relative z-10 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl mx-auto"
              >
                <a 
                  href="https://pay.kiwify.com.br/ANFvpl3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img
                    src={ofertaLimitada}
                    alt="Oferta limitada - 61% de desconto"
                    className="w-full rounded-2xl md:rounded-3xl shadow-2xl"
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
