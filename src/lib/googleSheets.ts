const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7Nn3PfwDg4N9hEJcg4tm4H-Ca90cQiC0XhErQA5BpWqx0D8Jlui4iX6XLlB4mCQXALA/exec';

export interface QuizData {
  email: string;
  dogName: string;
  dogAge?: string;
  dogGender?: string;
  dogBreed?: string;
  painPulling?: number;
  painBarking?: number;
  painStartles?: number;
  painOtherDogs?: number;
  painUnexplained?: number;
  tensionLevel?: number;
  mainProblems?: string[];
  mainGoal?: string;
  timeAvailable?: string;
  commitment?: string;
  [key: string]: any;
}

export async function enviarParaGoogleSheets(data: QuizData) {
  console.log('📤 Enviando dados para Google Sheets:', data);
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log('✅ Dados enviados! Email será enviado automaticamente.');
    return { success: true };
  } catch (error) {
    console.error('❌ Erro:', error);
    return { success: false, error };
  }
}
