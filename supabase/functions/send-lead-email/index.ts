import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, dogName } = await req.json();

    if (!email || !dogName) {
      return new Response(
        JSON.stringify({ error: 'email and dogName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Send email using Supabase Auth admin API (invite-like)
    // We'll use a simple approach: call the Lovable email API
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use Lovable's email sending capability
    const emailResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        to: email,
        subject: `Seu protocolo para ${dogName} está chegando 🐕`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a2a3a; text-align: center;">🐕 Boas notícias!</h1>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Olá! O protocolo personalizado para <strong>${dogName}</strong> está sendo preparado com carinho.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Em breve você receberá todas as informações sobre o 
              <strong>Desafio de Reequilíbrio do Nervo Vago</strong> personalizado.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: linear-gradient(135deg, #38b2ac, #2d8f8f); color: white; padding: 15px 30px; border-radius: 12px; display: inline-block; font-size: 18px; font-weight: bold;">
                Plano de ${dogName} em preparação ✨
              </div>
            </div>
            <p style="color: #888; font-size: 14px; text-align: center;">
              Canino Obediente 360° — Transformando comportamentos com ciência
            </p>
          </div>
        `,
      }),
    });

    console.log('Email send response:', emailResponse.status);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
