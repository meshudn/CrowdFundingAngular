<?php
    header("Access-Control-Allow-Origin: *");

     $response = array();

     require_once __DIR__.'/db_connect.php';
      
    $db = new DB_CONNECT();

     $sql = "SELECT * from post";

    $result = mysqli_query($db->connect(),$sql);

     if(!empty($result)){
     
        
         if(mysqli_num_rows($result)>0){
             
             
           $response['posts'] = array();
             
            while($posts = mysqli_fetch_assoc($result)){
                      
             $post = array();
             $post['id'] = $posts['id'];
             $post['title'] = $posts['title'];
             $post['description'] = $posts['description'];

             array_push($response['posts'],$post);
           
            }
            
             $response['success'] = 1;
               echo json_encode($response);
            
             
         }
         else{
            $response['success'] = 0;
            $response['messege'] = "No data found";
             
             echo json_encode($response);
             
         }
     }

?>

