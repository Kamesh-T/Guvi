<?php
require 'vendor/autoload.php'; 


$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$database_name = $mongoClient->selectDatabase('registration');
$collection_name = $database_name->selectCollection('profiledetails');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $dob =$_POST['dob'];
    $phone = $_POST['phone'];

    
    $insertResult = $collection_name->insertOne([
        'name' => $name,
        'gender' => $gender,
        'dob' => $dob,
        'phone' => $phone
    ]);

    if ($insertResult->getInsertedCount() > 0) {
        $cursor = $collection_name->find();

        
        echo '<div class="container">';
        echo '<div id="profile-container">';
        echo '<h4>Profile Details</h4>';

        
            echo '<div class="profile-details">';
            echo '<p><strong>Name:</strong> '. $name .'</p>';
            echo '<p><strong>Gender:</strong>'. $gender.'</p>';
            echo '<p><strong>Birthday:</strong>'. $dob.'</p>';
            echo '<p><strong>Phone Number:</strong> ' . $phone. '</p>';
            echo '</div>';
        

        echo '</div>';
        echo '</div>';
    }
    else{
        echo 'Error in inserting the data';
    }

}
?>
