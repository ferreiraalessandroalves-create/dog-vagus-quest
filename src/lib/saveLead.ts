export interface SaveLeadPayload {
  nome: string;
  email: string;
  nome_cao: string;
  respostas: Record<string, unknown>;
  origem: string;
}

export async function salvarLead(payload: SaveLeadPayload) {
  const response = await fetch("/api/salvar.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: { ok?: boolean; id?: number; erro?: string } | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    throw new Error(data?.erro || `Falha ao salvar (HTTP ${response.status})`);
  }

  return data;
}
