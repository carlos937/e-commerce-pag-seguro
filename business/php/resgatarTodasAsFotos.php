<?php
require_once 'connect.php';
header('Content-Type:'."application/json");




$sql="SELECT * FROM fotosprod  ORDER BY rand()  LIMIT 10";
$query= $conexao->query($sql);

$fotos= array();

while ($dados = $query -> fetch_assoc()){

        $fotos[]=$dados;

}

echo json_encode($fotos,JSON_PRETTY_PRINT);


