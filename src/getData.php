<?php
// Database connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mutall_mashamba";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Path to the SQL file
$sqlFile = 'title.sql';

// Read SQL commands from the file
$sqlCommands = file_get_contents($sqlFile);

// Execute SQL commands
if ($conn->multi_query($sqlCommands)) {
    // Fetch data from the products table
    $fetchDataQuery = "
    select
        json_arrayagg(documents) as documents
    from
        result";
    $result = $conn->query($fetchDataQuery);

    $data = array();

    if ($result->num_rows > 0) {
        // Fetch data from the database
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    // Close the connection
    $conn->close();

    // Send data to the client in JSON format
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "Error executing SQL commands: " . $conn->error;
    $conn->close();
}
?>
