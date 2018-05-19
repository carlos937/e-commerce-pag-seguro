<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
foreach ( $dataObjek as $e )
    {
	$lugar = $e->lugar;
        $valor = $e->valor;
        $id = $e->id;
    }

echo json_encode($lugar);
echo json_encode($valor);
echo json_encode($id);


$sql="UPDATE produtos SET $lugar = '$valor' WHERE id = '$id'";
echo $sql;
$conexao->query($sql);