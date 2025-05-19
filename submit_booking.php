<?php
// --- Database Connection ---
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "arr_prima_db";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// --- Form Data Retrieval ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs to prevent SQL injection (basic example, consider more robust methods for production)
    $service = isset($_POST['service']) ? $conn->real_escape_string($_POST['service']) : '';
    $date1 = isset($_POST['date1']) ? $conn->real_escape_string($_POST['date1']) : '';
    $time1 = isset($_POST['time1']) ? $conn->real_escape_string($_POST['time1']) : '';
    $date2 = isset($_POST['date2']) && !empty($_POST['date2']) ? $conn->real_escape_string($_POST['date2']) : NULL; // Allow NULL if empty
    $time2 = isset($_POST['time2']) && !empty($_POST['time2']) ? $conn->real_escape_string($_POST['time2']) : NULL; // Allow NULL if empty
    $clientName = isset($_POST['clientName']) ? $conn->real_escape_string($_POST['clientName']) : '';
    $clientEmail = isset($_POST['clientEmail']) ? $conn->real_escape_string($_POST['clientEmail']) : '';
    $clientPhone = isset($_POST['clientPhone']) ? $conn->real_escape_string($_POST['clientPhone']) : '';
    $installAddress = isset($_POST['installAddress']) ? $conn->real_escape_string($_POST['installAddress']) : '';
    $projectDetails = isset($_POST['projectDetails']) ? $conn->real_escape_string($_POST['projectDetails']) : '';

    // --- File Upload Handling (Basic Example) ---
    $uploadedPhotoNames = [];
    $targetDir = "uploads/"; // Create an 'uploads' directory in the same location as your PHP script
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true); // Create the directory if it doesn't exist
    }

    if (isset($_FILES['projectPhotos'])) {
        $totalFiles = count($_FILES['projectPhotos']['name']);
        for ($i = 0; $i < $totalFiles; $i++) {
            $fileName = basename($_FILES['projectPhotos']['name'][$i]);
            if (!empty($fileName)) { // Check if a file was actually uploaded
                $targetFilePath = $targetDir . $fileName;
                // You might want to add more validation here (file type, size, unique names, etc.)
                if (move_uploaded_file($_FILES['projectPhotos']['tmp_name'][$i], $targetFilePath)) {
                    $uploadedPhotoNames[] = $conn->real_escape_string($fileName);
                } else {
                    // Handle file upload error (optional)
                    // echo "Error uploading file: " . htmlspecialchars($fileName) . "<br>";
                }
            }
        }
    }
    $projectPhotoNamesStr = implode(", ", $uploadedPhotoNames); // Store as comma-separated string

    // --- SQL Insertion ---
    // Note: If date2 or time2 are NULL, they should be inserted as NULL, not empty strings.
    $sql = "INSERT INTO bookings (service, date1, time1, date2, time2, clientName, clientEmail, clientPhone, installAddress, projectDetails, projectPhotoNames)
            VALUES (
                '$service',
                '$date1',
                '$time1',
                " . ($date2 ? "'$date2'" : "NULL") . ",
                " . ($time2 ? "'$time2'" : "NULL") . ",
                '$clientName',
                '$clientEmail',
                '$clientPhone',
                '$installAddress',
                '$projectDetails',
                '$projectPhotoNamesStr'
            )";

    if ($conn->query($sql) === TRUE) {
        // If successful, you can redirect to a success page or send a success message back.
        // For now, we'll just echo success.
        // The JavaScript in ArrTest.js will handle showing the confirmation message.
        // So, we don't strictly need to output anything here for that part to work,
        // but it's good for debugging or if you want the server to confirm.
        // echo "New booking created successfully";
        // header("Location: ArrTest.html#booking-confirmation"); // Or a dedicated thank you page
        // exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    // Not a POST request, redirect to form or show an error
    // echo "Invalid request method.";
    // header("Location: ArrTest.html");
    // exit();
}
?>