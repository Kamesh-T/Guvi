 <?php

    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "registrationdb";

    $conn = new mysqli($server, $username, $password, $dbname);

    if($conn->connect_error){
        die("Connection Failed".$conn->connect_error);
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $pswd = $_POST['password'];

    $sql = "SELECT email FROM registrationtable";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->get_result();
    while($data = $result->fetch_assoc()){
        if($data['email']==$email){
            echo false;
            exit;
        }
    }
    
    $sql = "INSERT INTO registrationtable(email, pswd) VALUES(?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss",$email, $pswd);
    $stmt->execute();
    echo true;
?> 





