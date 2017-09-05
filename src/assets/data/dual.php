<?php
    if(isset($_REQUEST['title'])){
         $title = $_REQUEST['title'];
    }
    else{
    $title ="dummy";
    }
    if(isset($_REQUEST['desciption'])){
       $description = $_REQUEST['description'];
    } 
 else{
    $description = "dummy";
    }
    if(isset($_REQUEST['price'])){
         $price = $_REQUEST['price'];
    }
 else{
    $price = "dummy";
    }

 
  
     require_once __DIR__ . '/db_connect.php';
    $db = new DB_CONNECT();

     $sql = "UPDATE book SET title='".$title."',price='".$price."' WHERE 1";

     $query = mysqli_query($db->connect(),$sql);



     $response = array();


     $sql = "SELECT * from book";

    $result = mysqli_query($db->connect(),$sql);

     if(!empty($result)){
     
        
         if(mysqli_num_rows($result)>0){
             
             
           $response['books'] = array();
             
            while($books = mysqli_fetch_array($result)){
                      
             $book = array();
             $book['id'] = $books['id'];
             $book['title'] = $books['title'];
             $book['price'] = $books['price'];
             $book['description'] = $books['description'];
                     
             array_push($response['books'],$book);
           
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