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
        $userstatus='Active';
        echo $conn;
        $sql = "INSERT INTO users( `userName`, `userPassword`, `Mobile`, `email`, `userType`, `userStattus`,'registration_date') VALUES(:username, :userpassword,:email, :mobile, :usertype,:userstatus,:created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':username', $user->username);
        $stmt->bindParam(':userpassword', $user->userpassword);

        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':usertype', $user->usertype);
        $stmt->bindParam(':userstatus', $user->userstatus);

        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE users SET name= :username,userPassword=:userpassword, email =:email, Mobile =:mobile, userType =:usertype WHERE userId = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE userId = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
