import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface QuizSubmission {
  user_email: string;
  dog_name?: string;
  dog_age?: string;
  dog_gender?: string;
  dog_breed?: string;
  pain_pulling?: number;
  pain_startles?: number;
  pain_barking?: number;
  pain_other_dogs?: number;
  pain_unexplained?: number;
  pain_digestion?: string;
  pain_physical?: string;
  pain_coming_home?: string[];
  pain_behaviors?: string[];
  pain_stress?: string;
  pain_triggers?: string[];
  excitement_triggers?: string[];
  motivations?: string[];
  main_goal?: string;
  time_available?: string;
  previous_training?: string;
  commitment?: string;
  vagus_knowledge?: string;
  tension_level?: number;
  main_problems?: string[];
}

export function useQuizSubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submitQuiz = async (quizData: QuizSubmission) => {
    setIsLoading(true);
    
    try {
      const { data: result, error } = await supabase
        .from('quiz_submissions')
        .insert([quizData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar no banco:', error);
        throw error;
      }

      console.log('✅ Dados salvos com sucesso:', result);
      toast({
        title: "✅ Sucesso!",
        description: "Seus dados foram salvos com sucesso.",
      });
      return { success: true, data: result };
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "❌ Erro",
        description: "Não foi possível salvar seus dados.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { submitQuiz, isLoading };
}
