<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
//$objDb = new DbConnect;
//$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $id=$path[3];
            $sql .= " WHERE userId = $id";
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
            $user = json_decode( file_get_contents('php://input') );  
            $username=$user->userName;
            $userpassword=$user->userPassword;
            $email=$user->email;
            $mobile=$user->Mobile;
            $usertype=get_object_vars($user)['userType']->name;
            $userstatus='Active';
           // $userstatus='Active';
            $created_at = date('Y-m-d');
           //echo $usertype;
                $query= $conn->prepare("INSERT INTO users (userName,userPassword,email,Mobile,userType,userStatus,registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
                # Bind parameters and spell "password" correctly
                 $query->bind_param('sssssss',$username,$userpassword,$email,$mobile,$usertype,$userstatus,$created_at);
                
                
          // print_r($query);
         if($query->execute()) {
             $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
             $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
         echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
       //print_r($user);
        
       // echo $user->inputs->userName;;
        $id=$user->id;
        $username=$user->userName;
        $userpassword=$user->userPassword;
        $email=$user->email;
        $mobile=$user->Mobile;
        $usertype=get_object_vars($user)['userType']->name;
        $userstatus='active';
        $stmt = "UPDATE users SET userName= ?,userPassword=?, email =?, Mobile =?, userType =? ,updated_at=? WHERE userId = ?";
        $stmt = $conn->prepare($stmt);
        $updated_at = date('Y-m-d');
       
        $stmt->bind_param('sssssss',$username,$userpassword,$email,$mobile,$usertype,$updated_at,$id);
 //print_r($stmt);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE userId = ?";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $id=$path[3];
        $stmt->bind_param('s', $id);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
