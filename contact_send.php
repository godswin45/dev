<?php
// Set your recipient email here
$recipient = "arrprima@gmail.com"; // CHANGE to your actual email

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST['contactName']) ? strip_tags(trim($_POST['contactName'])) : '';
    $email = isset($_POST['contactEmail']) ? filter_var(trim($_POST['contactEmail']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['contactMessage']) ? strip_tags(trim($_POST['contactMessage'])) : '';

    // Basic validation
    if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill in all fields correctly.";
        exit;
    }

    $subject = "New Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $name <$email>\r\nReply-To: $email\r\n";

    if (mail($recipient, $subject, $body, $headers)) {
        echo "success";
    } else {
        http_response_code(500);
        echo "Failed to send message. Please try again later.";
    }
    exit;
}

http_response_code(403);
echo "There was a problem with your submission.";
