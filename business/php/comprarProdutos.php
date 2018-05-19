<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
$dataCompra = date('d/m/Y  h:i');
foreach ( $dataObjek as $e )
    {
	$idUsuario = $e->idUsuario;
        $idProd = $e->idProd;
        $quant = $e->quant;
    }
$sql="INSERT INTO `registro_de_compras`(`id_usuario`, `id_produto`, `quant`, `status`,`data_compra`) VALUES ('$idUsuario','$idProd','$quant','Apenas Clicou Em Comprar','$dataCompra')";
echo $sql;
$conexao->query($sql);