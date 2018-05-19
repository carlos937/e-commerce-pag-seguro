<?php

require_once 'connect.php';
header('Content-Type:' . "application/json");
    $postdata = file_get_contents("php://input");
    $ref = json_decode($postdata);
    foreach ($ref as $r){
        $referencia = $r->ref;
        $rastreamento = $r->rastreamento;
    }
    $sql = "UPDATE `registro_de_compras` SET `status`= 'Enviado', `rastreamentoCorreios` =  '$rastreamento'  WHERE ref = '$referencia'";
    $query = $conexao->query($sql);
    
//echo json_encode($sql);
