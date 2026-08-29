/**
 * Helper central de rastreamento de eventos do funil.
 * Dispara para Microsoft Clarity e Meta Pixel, sem quebrar a aplicação
 * caso algum deles não esteja carregado.
 */
export function rastrear(nomeEvento: string, dados?: Record<string, unknown>) {
  try {
    const w = window as any;
    if (typeof w.clarity === "function") {
      w.clarity("event", nomeEvento);
    }
    if (typeof w.fbq === "function") {
      w.fbq("trackCustom", nomeEvento, dados || {});
    }
  } catch {
    // silencioso — tracking nunca pode quebrar o app
  }
}
