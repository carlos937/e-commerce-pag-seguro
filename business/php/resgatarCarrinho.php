<?php
require_once 'connect.php';
header('Content-Type:'."application/json");


$postdata = file_get_contents("php://input");
$idUsuario = json_decode($postdata);

//if(isset($idUsuario)){
$i=0;
$sql="Select c.id AS id_registro_compras,c.quant AS quantR,c.id_usuario,c.status, p.*,p.id AS id_tabelaProduto from registro_de_compras c join produtos p on c.id_produto = p.id where c.id_usuario = $idUsuario and (c.status = 'Apenas Clicou Em Comprar' OR c.status = 'Foi Ate O PagSeguro') ";
$query= $conexao->query($sql);
$produtosComprados= array();
while ($dados = $query -> fetch_assoc()){

        $produtosComprados[]=$dados;
        $produtosComprados[$i]["valorTotal"]=$dados["valor"]*$dados["quantR"];
$i++;
}

echo json_encode($produtosComprados,JSON_PRETTY_PRINT);

//}