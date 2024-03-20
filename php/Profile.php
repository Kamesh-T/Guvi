<?php

     $server = "localhost";
     $username = "root";
     $password = "";
     $dbname = "registrationdb";
 
     $conn = new mysqli($server, $username, $password, $dbname);
 
     if($conn->connect_error){
         die("Connection Failed".$conn->connect_error);
     }

?>