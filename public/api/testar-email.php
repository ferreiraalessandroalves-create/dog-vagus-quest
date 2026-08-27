<?php
header('Content-Type: application/json; charset=utf-8');

$config = require __DIR__ . '/config.php';
require_once __DIR__ . '/enviar-email.php';

$key   = (string) ($_GET['key'] ?? $_POST['key'] ?? '');
$para  = trim((string) ($_GET['email'] ?? $_POST['email'] ?? ''));
$valid = (string) ($config['test_key'] ?? '');

if ($valid === '' || !hash_equals($valid, $key)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'erro' => 'Chave invalida'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($para, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'Informe ?email=destino@dominio.com'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    co360_enviar_email($config, 'Teste', $para, 'Rex', [
        'tension_level'  => 8,
        'pain_behaviors' => ['Late demais', 'Puxa na coleira', 'Reage a outros cachorros'],
    ]);
    echo json_encode(['ok' => true, 'enviado_para' => $para], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    error_log('[testar-email.php] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
