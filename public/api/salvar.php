<?php
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'Metodo nao permitido'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $config = require_once __DIR__ . '/config.php';

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);

    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'erro' => 'JSON invalido'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $nome     = trim((string)($body['nome'] ?? ''));
    $email    = trim((string)($body['email'] ?? ''));
    $nomeCao  = trim((string)($body['nome_cao'] ?? ''));
    $origem   = trim((string)($body['origem'] ?? 'quiz'));
    $respostas = isset($body['respostas']) && is_array($body['respostas']) ? $body['respostas'] : [];

    if ($nome === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'erro' => 'Nome obrigatorio'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'erro' => 'E-mail invalido'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['host'], $config['db']);
    $pdo = new PDO($dsn, $config['user'], $config['pass'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // Garante a coluna de auditoria de envio de e-mail
    try {
        $pdo->exec('ALTER TABLE leads_quiz ADD COLUMN email_enviado TINYINT NOT NULL DEFAULT 0');
    } catch (Throwable $e) {
        // coluna ja existe
    }

    $stmt = $pdo->prepare(
        'INSERT INTO leads_quiz (nome, email, nome_cao, respostas, origem, ip, email_enviado, criado_em)
         VALUES (:nome, :email, :nome_cao, :respostas, :origem, :ip, 0, NOW())'
    );

    $stmt->execute([
        ':nome'      => $nome,
        ':email'     => $email,
        ':nome_cao'  => $nomeCao,
        ':respostas' => json_encode($respostas, JSON_UNESCAPED_UNICODE),
        ':origem'    => $origem,
        ':ip'        => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $leadId = (int)$pdo->lastInsertId();

    // Envio do e-mail: nunca pode quebrar a resposta
    try {
        require_once __DIR__ . '/enviar-email.php';
        if (co360_enviar_email($config, $nome, $email, $nomeCao, $respostas)) {
            $upd = $pdo->prepare('UPDATE leads_quiz SET email_enviado = 1 WHERE id = :id');
            $upd->execute([':id' => $leadId]);
        }
    } catch (Throwable $e) {
        error_log('[salvar.php][email] ' . $e->getMessage());
    }

    http_response_code(200);
    echo json_encode(['ok' => true, 'id' => $leadId], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    error_log('[salvar.php] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'Erro interno ao salvar'], JSON_UNESCAPED_UNICODE);
}
