<?php

require_once 'dbconnection.php';
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method === 'POST'){
    $output = [];
    parse_str($item, $output);
    $query = "INSERT INTO `profile`(`name`, `email`, `location`, `bio`, `image`, `isGuide`) 
    VALUES ({$output['name']}, {$output['email']}, {$output['location']}, {$output['bio']}, {$output['image']}, {$output['isGuide']})";
    $result = mysqli_query($conn, $query); 
}
elseif ($method === 'GET'){
    readfile('dummy-profile.json');
}
?>
