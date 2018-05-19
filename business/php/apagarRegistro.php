<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);
foreach ($data as $i) {
   $id2 = $i->id; 
}
$sql="DELETE FROM registro_de_compras WHERE id = '$id2'";
echo $sql;
$conexao->query($sql);
