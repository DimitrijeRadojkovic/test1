<?php
    require "connect.php";
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $text = $_POST["text"];
        $sql = "INSERT INTO beleske (text) VALUES ('$text')";
        if(mysqli_query($conn, $sql)){
            echo json_encode(array("ok" => true));
        } else {
            echo json_encode(array("ok" => false));
        }       
    }
?>