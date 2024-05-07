<?php
// MySQL server configuration
$servername = "booksdb:3308"; // Change this to your MySQL server hostname
$username = "library"; // Change this to your MySQL username
$password = "library"; // Change this to your MySQL password
$database = "book"; // Change this to your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

// Close connection
$conn->close();
?>