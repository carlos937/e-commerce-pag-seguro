<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$id = json_decode($postdata);
$sql="DELETE FROM registro_de_compras WHERE id='$id'";
echo $sql;
$conexao->query($sql);