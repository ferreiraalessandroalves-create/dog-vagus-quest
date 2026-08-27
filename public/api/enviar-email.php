<?php

require_once __DIR__ . '/lib/PHPMailer/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

if (!defined('CO360_CHECKOUT_URL')) {
    define('CO360_CHECKOUT_URL', 'https://pay.kiwify.com.br/ANFvpl3');
}

/**
 * Calcula o nivel de tensao do nervo vago (0-10) a partir das respostas do quiz.
 * Mesma logica usada na pagina de resultado.
 */
function co360_calcular_tensao(array $respostas): int
{
    if (isset($respostas['tension_level']) && is_numeric($respostas['tension_level'])) {
        $n = (int) round((float) $respostas['tension_level']);
        return max(0, min(10, $n));
    }

    $painKeys = ['pain_pulling', 'pain_startles', 'pain_barking', 'pain_other_dogs', 'pain_unexplained'];
    $soma = 0;
    $qtd  = 0;
    foreach ($painKeys as $k) {
        if (isset($respostas[$k]) && is_numeric($respostas[$k])) {
            $soma += (float) $respostas[$k];
            $qtd++;
        }
    }

    $extras = 0;
    foreach (['pain_behaviors', 'pain_triggers', 'main_problems', 'pain_coming_home'] as $k) {
        if (isset($respostas[$k]) && is_array($respostas[$k])) {
            $extras += count($respostas[$k]);
        }
    }

    if ($qtd === 0) {
        return $extras > 0 ? max(5, min(10, 5 + $extras)) : 7;
    }

    $media = $soma / $qtd; // escala 1-5
    $nivel = (int) round(($media / 5) * 10) + (int) min(2, floor($extras / 3));

    return max(1, min(10, $nivel));
}

function co360_classificacao(int $nivel): array
{
    if ($nivel >= 8) {
        return ['ALTO', '#dc2626'];
    }
    if ($nivel >= 5) {
        return ['MODERADO', '#d97706'];
    }
    return ['BAIXO', '#16a34a'];
}

/**
 * Extrai a lista de desafios marcados no quiz.
 */
function co360_desafios(array $respostas): array
{
    $labels = [
        'pain_behaviors'      => null,
        'main_problems'       => null,
        'pain_triggers'       => null,
        'pain_coming_home'    => null,
        'excitement_triggers' => null,
    ];

    $itens = [];
    foreach (array_keys($labels) as $k) {
        if (!isset($respostas[$k])) {
            continue;
        }
        $v = $respostas[$k];
        if (is_array($v)) {
            foreach ($v as $item) {
                $s = trim((string) $item);
                if ($s !== '') {
                    $itens[] = $s;
                }
            }
        } elseif (trim((string) $v) !== '') {
            $itens[] = trim((string) $v);
        }
    }

    $itens = array_values(array_unique($itens));

    if (empty($itens)) {
        $itens = [
            'Ansiedade e agitacao no dia a dia',
            'Dificuldade de obediencia em momentos de estresse',
        ];
    }

    return array_slice($itens, 0, 8);
}

function co360_template_email(string $nomeCao, int $nivel, string $classe, string $cor, array $desafios): string
{
    $cao = htmlspecialchars($nomeCao !== '' ? $nomeCao : 'seu cachorro', ENT_QUOTES, 'UTF-8');

    $listaDesafios = '';
    foreach ($desafios as $d) {
        $listaDesafios .= '<tr><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;">• '
            . htmlspecialchars($d, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    }

    $checkout = CO360_CHECKOUT_URL;

    return <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Plano Personalizado</title></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:24px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">

    <tr><td style="background:linear-gradient(135deg,#6d28d9 0%,#2563eb 100%);background-color:#4c1d95;padding:32px 24px;text-align:center;">
      <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;color:#ffffff;">Plano Personalizado</h1>
      <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#e0e7ff;">Reset do Nervo Vago para {$cao}</p>
    </td></tr>

    <tr><td style="padding:28px 24px 8px;">
      <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#0f172a;font-weight:bold;">Olá! 👋</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#475569;">
        Analisamos com atenção todas as suas respostas sobre {$cao} e preparamos um plano personalizado para os próximos 21 dias.
      </p>
    </td></tr>

    <tr><td style="padding:20px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border-radius:10px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#0f172a;font-weight:bold;">📊 Resultado da Análise</p>
          <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;">Nível de Tensão do Nervo Vago: <strong>{$nivel}/10</strong></p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:{$cor};font-weight:bold;">Classificação: {$classe}</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:20px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff7ed;border-radius:10px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#0f172a;font-weight:bold;">🎯 Principais Desafios Identificados</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{$listaDesafios}</table>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:20px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4;border-radius:10px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#0f172a;font-weight:bold;">📋 Próximos Passos</p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;"><strong>1) Desafio de 21 Dias</strong> — um protocolo progressivo para reequilibrar o sistema nervoso de {$cao}.</p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;"><strong>2) Técnicas Diárias de 5-10 minutos</strong> — exercícios curtos que cabem na sua rotina.</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;"><strong>3) Acompanhamento</strong> — evolução guiada passo a passo até o dia 21.</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:28px 24px;">
      <a href="{$checkout}" style="display:inline-block;background-color:#16a34a;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;text-decoration:none;padding:16px 28px;border-radius:10px;">🚀 COMEÇAR O DESAFIO AGORA</a>
    </td></tr>

    <tr><td style="background-color:#f8fafc;padding:20px 24px;text-align:center;">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#64748b;">Este plano foi criado especialmente para {$cao} baseado nas suas respostas.</p>
      <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Canino Obediente 360° • suporte@caninoobediente360.lat</p>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>
HTML;
}

/**
 * Envia o e-mail de diagnostico. Retorna true em caso de sucesso.
 *
 * @throws PHPMailerException
 */
function co360_enviar_email(array $config, string $nome, string $email, string $nomeCao, array $respostas): bool
{
    $nivel = co360_calcular_tensao($respostas);
    [$classe, $cor] = co360_classificacao($nivel);
    $desafios = co360_desafios($respostas);
    $html = co360_template_email($nomeCao, $nivel, $classe, $cor, $desafios);

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = (string) ($config['smtp_user'] ?? '');
    $mail->Password   = (string) ($config['smtp_pass'] ?? '');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';

    $mail->setFrom('suporte@caninoobediente360.lat', 'Canino Obediente 360°');
    $mail->addReplyTo('suporte@caninoobediente360.lat', 'Canino Obediente 360°');
    $mail->addAddress($email, $nome !== '' ? $nome : $email);

    $cao = $nomeCao !== '' ? $nomeCao : 'seu cachorro';
    $mail->isHTML(true);
    $mail->Subject = "🐕 Plano Personalizado para {$cao} - Reset do Nervo Vago";
    $mail->Body    = $html;
    $mail->AltBody = "Plano Personalizado para {$cao}. Nivel de Tensao do Nervo Vago: {$nivel}/10 ({$classe}). Comece o desafio: " . CO360_CHECKOUT_URL;

    return $mail->send();
}
