<?php
// Your connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mutall_mashamba";

// Create a connection
$db = mysqli_connect($servername, $username, $password, $dbname);

// Test if connection succeeded
if (mysqli_connect_errno()) {
  $msg = "Database connection failed: ";
  $msg .= mysqli_connect_error();
  $msg .= " (" . mysqli_connect_errno() . ")";
  exit($msg);
}

// Get data with a query
// $sql = 'SELECT JSON_ARRAYAGG(JSON_OBJECT("document", document, "id", id, "category", category, "folder", folder, "regno", regno, "area", area, "person", person)) AS aggregated_data FROM document';

// 
// If you want to get query from sql file
$sql_query = file_get_contents('test.sql');

$result = mysqli_query($db, $sql_query);

// Test if query succeeded
if (!$result) {
  exit("Database query failed.");
}

// Fetch the aggregated data into an array
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
}
// Encode the data as JSON
$data_json = json_encode($data);
?>