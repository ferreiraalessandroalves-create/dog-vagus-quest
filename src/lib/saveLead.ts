import { supabase } from "@/integrations/supabase/client";

export interface SaveLeadPayload {
  nome: string;
  email: string;
  nome_cao: string;
  respostas: Record<string, unknown>;
  origem: string;
}

const toInt = (v: unknown): number | null => {
  const n = typeof v === "string" ? parseInt(v, 10) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : null;
};

const toArr = (v: unknown): string[] | null =>
  Array.isArray(v) ? v.map(String) : v == null ? null : [String(v)];

const toStr = (v: unknown): string | null =>
  v == null || v === "" ? null : String(v);

export async function salvarLead(payload: SaveLeadPayload) {
  const r = payload.respostas ?? {};

  const row = {
    id: crypto.randomUUID(),
    user_email: payload.email,
    dog_name: payload.nome_cao || toStr(r.dog_name),
    dog_age: toStr(r.dog_age),
    dog_gender: toStr(r.dog_gender),
    dog_breed: toStr(r.dog_breed),
    pain_pulling: toInt(r.pain_pulling),
    pain_startles: toInt(r.pain_startles),
    pain_barking: toInt(r.pain_barking),
    pain_other_dogs: toInt(r.pain_other_dogs),
    pain_unexplained: toInt(r.pain_unexplained),
    pain_digestion: toStr(r.pain_digestion),
    pain_physical: toStr(r.pain_physical),
    pain_coming_home: toArr(r.pain_coming_home),
    pain_behaviors: toArr(r.pain_behaviors),
    pain_stress: toStr(r.pain_stress),
    pain_triggers: toArr(r.pain_triggers),
    excitement_triggers: toArr(r.excitement_triggers),
    motivations: toArr(r.motivations),
    main_goal: toStr(r.main_goal),
    time_available: toStr(r.time_available),
    previous_training: toStr(r.previous_training),
    commitment: toStr(r.commitment),
    vagus_knowledge: toStr(r.vagus_knowledge),
    tension_level: typeof r.tension_level === "number" ? r.tension_level : toInt(r.tension_level),
    main_problems: toArr(r.main_problems),
  };

  const { error } = await supabase.from("quiz_submissions").insert(row);

  if (error) {
    throw new Error(error.message);
  }

  // Replica para o banco externo (não bloqueia o fluxo do usuário)
  try {
    void supabase.functions.invoke("replicate-quiz", {
      body: { record: row },
    });
  } catch {
    // silencioso
  }

  // E-mail de diagnóstico (não bloqueia o fluxo do usuário)
  try {
    void supabase.functions.invoke("send-lead-email", {
      body: {
        email: payload.email,
        dogName: payload.nome_cao || row.dog_name || "",
        respostas: { ...r, ...row },
      },
    });
  } catch {
    // silencioso
  }

  return { ok: true as const };
}
