<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
$id = $dataObjek->id;
echo json_encode($id,JSON_PRETTY_PRINT);
$sql="DELETE FROM produtos WHERE id='$id'";
$sql2="DELETE FROM fotosprod WHERE id_produto='$id'";
$conexao->query($sql);
$conexao->query($sql2);