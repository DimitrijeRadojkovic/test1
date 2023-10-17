<?php
    require "connect.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id = $_POST["id"];
        $text = $_POST["text"];
        $sql = "UPDATE beleske SET text =" . $text . " WHERE id=" . $id;
        $result = mysqli_query($conn, $sql);
        echo json_encode(array("result" => $result));
    }
    /*$sql = "SELECT * FROM beleske";
    $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            $arr = array();
            while($row = mysqli_fetch_assoc($result)) {
                $temp = array("id" => $row["id"], "text" => $row["text"]);
                array_push($arr, $temp);
            }
            echo json_encode($arr);
          } else {
            echo "0 results";
          }*/
      mysqli_close($conn);
?>