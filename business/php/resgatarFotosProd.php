<?php
require_once 'connect.php';
header('Content-Type:'."application/json");


$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
foreach ( $dataObjek as $e )
    {
        $id = $e->id;
    }

$sql="SELECT * FROM fotosprod WHERE id_produto = '$id' order by id_produto asc";
$query= $conexao->query($sql);

$fotos= array();

while ($dados = $query -> fetch_assoc()){

        $fotos[]=$dados;

}

echo json_encode($fotos,JSON_PRETTY_PRINT);


