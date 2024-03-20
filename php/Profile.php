<?php
require 'vendor/autoload.php'; 


$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$database = $mongoClient->selectDatabase('registration');
$collection = $database->selectCollection('profiledetails');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $dob =$_POST['dob'];
    $phone = $_POST['phone'];

    
    $insertResult = $collection->insertOne([
        'name' => $name,
        'gender' => $gender,
        'dob' => $dob,
        'phone' => $phone
    ]);

    if ($insertResult->getInsertedCount() > 0) {
        echo "Data inserted successfully!";
    } else {
        echo "Error inserting data!";
    }
}
?>
