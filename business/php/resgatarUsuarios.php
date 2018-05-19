<?php
require_once 'connect.php';
header('Content-Type:'."application/json");

$sql="Select * from usuario";
$query= $conexao->query($sql);
$usuarios= array();
while ($dados = $query -> fetch_assoc()){
        $usuarios[]=$dados;
}
echo json_encode($usuarios,JSON_PRETTY_PRINT);
