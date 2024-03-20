
<?php
    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "registrationdb";

    $conn = new mysqli($server, $username, $password, $dbname);

    if($conn->connect_error){
        die("Connection Failed".$conn->connect_error);
    }


    $email = $_POST['email'];
    $pswd = $_POST['password'];

    $sql = "SELECT $pswd FROM registrationtable where email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    $ret_pswd = $data['pswd'];

    if($pswd==$ret_pswd){
        echo true;
    }
    
?>
