<?php
// 
// Creating variables of my connection to the databse
$servername = "localhost";
$username = "mutall";
$password = "";
$dbname = "mutall_mashamba";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read the SQL query 
$sqlQuery = file_get_contents('./documents_data.sql');

// Execute the entire SQL query
$result = $conn->multi_query($sqlQuery);

if ($result === false) {
    echo "Error executing the query: " . $conn->error;
} else {
    // Fetch and display the result
    $result = $conn->store_result();
    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        echo "No data found";
    }
}

$conn->close();
?>
