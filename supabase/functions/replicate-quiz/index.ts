import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function replicateWithRetry(data: Record<string, unknown>, maxRetries = 3) {
  const externalUrl = Deno.env.get("EXTERNAL_SUPABASE_URL")!;
  const externalKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY")!;
  const externalSupabase = createClient(externalUrl, externalKey);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🔄 Tentativa ${attempt}/${maxRetries} de replicação...`);

    try {
      const { error } = await externalSupabase
        .from("quiz_submissions")
        .insert([data]);

      if (error) {
        console.error(`[${timestamp}] ❌ Erro Supabase externo:`, error);
        throw error;
      }

      console.log(`[${timestamp}] ✅ Replicado com sucesso! ID: ${data.id}`);
      return { success: true };
    } catch (err) {
      console.error(`[${timestamp}] 💥 Falha tentativa ${attempt}:`, err);
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`[${timestamp}] ⏳ Aguardando ${delay}ms antes de retry...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  console.error(`[${new Date().toISOString()}] 🚫 Todas as tentativas falharam para ID: ${data.id}`);
  return { success: false, error: "Max retries exceeded" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();
    
    if (!record) {
      return new Response(JSON.stringify({ error: "No record provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[${new Date().toISOString()}] 📥 Recebido para replicação:`, record.id);

    const result = await replicateWithRetry(record);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] 💥 Erro fatal:`, err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
