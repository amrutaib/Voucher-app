<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../DbConnect.php';
//$objDb = new DbConnect;
//$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        
    $sql = "SELECT * FROM add_payment";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($path[3]) && is_numeric($path[3])) {
        $id=$path[3];
       
        $sql .= " WHERE UserId = $id";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
                
        $resultSet = $stmt->get_result();
        $users = $resultSet->fetch_all(MYSQLI_ASSOC);
       // $users = $stmt->fetch();
    } else {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $resultSet = $stmt->get_result();
        $users = $resultSet->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode($users);
    break;
case "POST":
    $payment = json_decode( file_get_contents('php://input') );  
    $amount=$payment->amount;
   $userId=$payment->userId;
   $paymentAdddate=$payment->paymentAdddate;
   $paymentMode=get_object_vars($payment)['paymentMode']->name;
 
  
   //echo $usertype;
        $query= $conn->prepare("INSERT INTO add_payment (amount,PaymentMode,PaymentDate,UserId) VALUES (?, ?, ?, ?)");
        # Bind parameters and spell "password" correctly
         $query->bind_param('ssss',$amount,$paymentMode,$paymentAdddate,$userId);
        
        
      // print_r($query);
     if($query->execute()) {
         $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
         $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
     echo json_encode($response);
    break;


}