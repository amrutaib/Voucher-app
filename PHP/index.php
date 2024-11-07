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
       
       $username=$_POST['userName'];
       $userpassword=$_POST['userPassword'];
       $email=$_POST['email'];
       $mobile=$_POST['Mobile'];
       $usertype=$_POST['userType'];
       $userstatus='active';
       // $userstatus='Active';
       $created_at = date('Y-m-d');

          $query  =   $conn->prepare("INSERT INTO users (userName,userPassword,email,Mobile,userType,userStatus,registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
            # Bind parameters and spell "password" correctly
           $query->bind_param('sssssss',$username,$userpassword,$email,$mobile,$usertype,$userstatus,$created_at);
            # Execute
          // $query->execute();
            # See if the row was created and echo success
            //echo ($query->affected_rows > 0)? 'Success!' : 'Failed';
        //$stmt=$conn->query($sql);
 //  echo $stmt;
       
        // $stmt->bindParam(':username', $user->username);
        // $stmt->bindParam(':userpassword', $user->userpassword);

        // $stmt->bindParam(':email', $user->email);
        // $stmt->bindParam(':mobile', $user->mobile);
        // $stmt->bindParam(':usertype', $user->usertype);
        // $stmt->bindParam(':userstatus', $user->userstatus);

        // $stmt->bindParam(':created_at', $created_at);

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
        $id=$user->inputs->userId;
        $username=$user->inputs->userName;
        $userpassword=$user->inputs->userPassword;
        $email=$user->inputs->email;
        $mobile=$user->inputs->Mobile;
        $usertype=$user->inputs->userType;
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
