const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CHECKOUT_URL = "https://pay.kiwify.com.br/ANFvpl3";
const FROM = "suporte@caninoobediente360.lat";

const esc = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function classificacao(nivel: number): [string, string] {
  if (nivel >= 8) return ["ALTO", "#dc2626"];
  if (nivel >= 5) return ["MODERADO", "#d97706"];
  return ["BAIXO", "#16a34a"];
}

function calcularTensao(r: Record<string, unknown>): number {
  const t = Number(r.tension_level);
  if (Number.isFinite(t)) return Math.max(0, Math.min(10, Math.round(t)));

  const painKeys = [
    "pain_pulling",
    "pain_startles",
    "pain_barking",
    "pain_other_dogs",
    "pain_unexplained",
  ];
  let soma = 0;
  let qtd = 0;
  for (const k of painKeys) {
    const v = Number(r[k]);
    if (Number.isFinite(v)) {
      soma += v;
      qtd++;
    }
  }

  let extras = 0;
  for (const k of ["pain_behaviors", "pain_triggers", "main_problems", "pain_coming_home"]) {
    if (Array.isArray(r[k])) extras += (r[k] as unknown[]).length;
  }

  if (qtd === 0) return extras > 0 ? Math.max(5, Math.min(10, 5 + extras)) : 7;

  const media = soma / qtd;
  const nivel = Math.round((media / 5) * 10) + Math.min(2, Math.floor(extras / 3));
  return Math.max(1, Math.min(10, nivel));
}

function desafios(r: Record<string, unknown>): string[] {
  const itens: string[] = [];
  for (const k of [
    "pain_behaviors",
    "main_problems",
    "pain_triggers",
    "pain_coming_home",
    "excitement_triggers",
  ]) {
    const v = r[k];
    if (Array.isArray(v)) {
      for (const i of v) {
        const s = String(i).trim();
        if (s) itens.push(s);
      }
    } else if (typeof v === "string" && v.trim()) {
      itens.push(v.trim());
    }
  }
  const unicos = [...new Set(itens)];
  if (unicos.length === 0) {
    return [
      "Ansiedade e agitação no dia a dia",
      "Dificuldade de obediência em momentos de estresse",
    ];
  }
  return unicos.slice(0, 8);
}

function template(dogName: string, nivel: number, classe: string, cor: string, lista: string[]) {
  const cao = esc(dogName || "seu cachorro");
  const itens = lista
    .map(
      (d) =>
        `<tr><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;">• ${esc(d)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Plano Personalizado</title></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:24px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">
    <tr><td style="background-color:#4c1d95;padding:32px 24px;text-align:center;">
      <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;color:#ffffff;">Plano Personalizado</h1>
      <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#e0e7ff;">Reset do Nervo Vago para ${cao}</p>
    </td></tr>
    <tr><td style="padding:28px 24px 8px;">
      <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#0f172a;font-weight:bold;">Olá! 👋</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#475569;">
        Analisamos com atenção todas as suas respostas sobre ${cao} e preparamos um plano personalizado para os próximos 21 dias.
      </p>
    </td></tr>
    <tr><td style="padding:20px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border-radius:10px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#0f172a;font-weight:bold;">📊 Resultado da Análise</p>
          <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;">Nível de Tensão do Nervo Vago: <strong>${nivel}/10</strong></p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${cor};font-weight:bold;">Classificação: ${classe}</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff7ed;border-radius:10px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#0f172a;font-weight:bold;">🎯 Principais Desafios Identificados</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${itens}</table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4;border-radius:10px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#0f172a;font-weight:bold;">📋 Próximos Passos</p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;"><strong>1) Desafio de 21 Dias</strong> — um protocolo progressivo para reequilibrar o sistema nervoso de ${cao}.</p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;"><strong>2) Técnicas Diárias de 5-10 minutos</strong> — exercícios curtos que cabem na sua rotina.</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;"><strong>3) Acompanhamento</strong> — evolução guiada passo a passo até o dia 21.</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td align="center" style="padding:28px 24px;">
      <a href="${CHECKOUT_URL}" style="display:inline-block;background-color:#16a34a;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;text-decoration:none;padding:16px 28px;border-radius:10px;">🚀 COMEÇAR O DESAFIO AGORA</a>
    </td></tr>
    <tr><td style="background-color:#f8fafc;padding:20px 24px;text-align:center;">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#64748b;">Este plano foi criado especialmente para ${cao} baseado nas suas respostas.</p>
      <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Canino Obediente 360° • ${FROM}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function b64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function buildRaw(to: string, subject: string, html: string): string {
  const enc = new TextEncoder();
  const subjectEncoded = `=?UTF-8?B?${btoa(String.fromCharCode(...enc.encode(subject)))}?=`;
  const message = [
    `To: ${to}`,
    `Subject: ${subjectEncoded}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
  ].join("\r\n");
  return b64url(enc.encode(message));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const email: string = body.email ?? body.to ?? "";
    const dogName: string = body.dogName ?? body.dog_name ?? "";
    const respostas: Record<string, unknown> = body.respostas ?? body.record ?? {};

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "email inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const gmailKey = Deno.env.get("GOOGLE_MAIL_API_KEY");
    if (!lovableKey || !gmailKey) {
      console.error("Credenciais do Gmail ausentes");
      return new Response(JSON.stringify({ error: "Gmail não configurado" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const nivel = calcularTensao(respostas);
    const [classe, cor] = classificacao(nivel);
    const html = template(dogName, nivel, classe, cor, desafios(respostas));
    const subject = `🐕 Plano Personalizado para ${dogName || "seu cachorro"} - Reset do Nervo Vago`;

    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: buildRaw(email, subject, html) }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`Falha ao enviar via Gmail [${res.status}]: ${details}`);
      return new Response(JSON.stringify({ error: "Falha no envio", status: res.status, details }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("E-mail de diagnóstico enviado para", email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response(JSON.stringify({ error: String((error as Error)?.message ?? error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

