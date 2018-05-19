<?php
require_once 'connect.php';
if(isset($_POST['id'])){
    $id = $_POST['id'];
}
 if(!empty($_FILES))  
 {  
      $path = '../upload/' . $_FILES['file']['name'];  
      if(move_uploaded_file($_FILES['file']['tmp_name'], $path))  
      {  
           $insertQuery = "INSERT INTO `fotosprod`( `nome_foto`,`id_produto`) VALUES ('".$_FILES['file']['name']."','$id')";  
           echo $insertQuery;
           if(mysqli_query($conexao, $insertQuery))  
           {  
                echo 'File Uploaded';  
           }  
           else  
           {  
                echo 'File Uploaded But not Saved';  
           }  
      }  
 }  
 else  
 {  
      echo 'Some Error';  
 }  
           
