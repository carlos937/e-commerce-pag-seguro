<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$ref = json_decode($postdata);
foreach ($ref as $r) {
   $ref2 = $r->referencia; 
}
$sql="DELETE FROM registro_de_compras WHERE ref = '$ref2'";
echo $sql;
$conexao->query($sql);
