
<?php
     header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
     header("Access-Control-Allow-Methods: GET, POST");
     header("Access-Control-Allow-Headers: Content-Type");
    $username = $_POST['Name'];
    $userPassword = $_POST['Password'];
    $email = $_POST['Email'];
    $mobile = $_POST['Mobile'];
    $usertype = $_POST['usertype'];

    include_once "./config/dbconnect.php";
    echo json_encode($userPassword);
  
        //$catname = $_POST['c_name'];
       
         $insert = mysqli_query($conn,"INSERT INTO `users`( `userName`, `userPassword`, `Mobile`, `email`, `userType`,'userStatus') VALUES ('$username','$userPassword','$mobile','$email','$usertype','Active')");
 
         if(!$insert)
         {
            // echo json_encode(mysqli_error($conn));
           //  header("Location: ../dashboard.php?category=error");
         }
         else
         {
             //echo json_encode("Records added successfully.");
             //header("Location: ../dashboard.php?category=success");
         }
     
    
        
    //echo json_encode('');
?>
