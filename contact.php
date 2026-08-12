<?php
declare(strict_types=1);

/**
 * Toran Digital lead endpoint.
 *
 * Configure CONTACT_RECIPIENT as an environment variable in hosting whenever
 * possible. The fallback address keeps the static site functional on standard
 * PHP hosting, but mailbox delivery must be verified on staging before launch.
 */
$recipient = getenv('CONTACT_RECIPIENT') ?: 'sales@torandigital.co.za';
$allowedMethods = ['POST'];

function respond(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store, max-age=0');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_value(string $value, int $maxLength = 3000): string
{
    $value = trim($value);
    $value = preg_replace('/[\r\n]+/', ' ', $value) ?? '';
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
}

if (!in_array($_SERVER['REQUEST_METHOD'] ?? '', $allowedMethods, true)) {
    respond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

// Honeypot: bots that complete this hidden field are silently rejected.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, ['ok' => true, 'message' => 'Thank you. We will be in touch shortly.']);
}

$name = clean_value((string) ($_POST['name'] ?? ''), 120);
$email = clean_value((string) ($_POST['email'] ?? ''), 254);
$phone = clean_value((string) ($_POST['phone'] ?? ''), 80);
$service = clean_value((string) ($_POST['service'] ?? 'General enquiry'), 160);
$message = clean_value((string) ($_POST['message'] ?? ''), 4000);
$source = clean_value((string) ($_POST['source_url'] ?? ''), 500);

if ($name === '' || $email === '') {
    respond(422, ['ok' => false, 'message' => 'Please provide your name and a valid email address.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'message' => 'Please provide a valid email address.']);
}

$subject = 'New website enquiry: ' . $service;
$bodyLines = [
    'New enquiry from the Toran Digital website',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone / WhatsApp: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Service: ' . $service,
    'Source page: ' . ($source !== '' ? $source : 'Not provided'),
    '',
    'Project details:',
    $message !== '' ? $message : 'Not provided',
];
$body = implode("\n", $bodyLines);

$host = preg_replace('/[^A-Za-z0-9.-]/', '', $_SERVER['HTTP_HOST'] ?? 'torandigital.co.za');
$fromDomain = $host !== '' ? $host : 'torandigital.co.za';
$headers = [
    'From: Toran Digital Website <noreply@' . $fromDomain . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    error_log('Toran Digital contact form delivery failed for service: ' . $service);
    respond(500, ['ok' => false, 'message' => 'We could not send your enquiry right now. Please contact us on WhatsApp or call us directly.']);
}

respond(200, [
    'ok' => true,
    'message' => 'Thank you. Your enquiry has been sent and the Toran Digital team will respond shortly.',
]);
