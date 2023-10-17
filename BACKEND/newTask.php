<?php
    require "connect.php";
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $text = $_POST["text"];
        $sql = "INSERT INTO beleske (text) VALUES ('$text')";
        $result = mysqli_query($conn, $sql);
        if($result){
            echo json_encode(array("ok" => true, "result" => $result));
        } else {
            echo json_encode(array("ok" => false));
        }       
    }
?>