<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
$dataCompra = date('d/m/Y  h:i');

$produtos = array();
foreach ($dataObjek as $e) {
    $produtos = $e->produtos;
    $vendedor = $e->vendedor;
    $cliente = $e->cliente;
}
$referencia = "REF" . date('dmYhis') . $vendedor;
echo $referencia;
foreach ($produtos as $prod) {
    $idProd = $prod->id;
    $quant = $prod->quantidadeProdCarrinho;
    $valorTotalC = $prod->valorTotalC;
    $desconto = $prod->desconto;
    $sql = "INSERT INTO `registro_de_compras`(`id_usuario`, `id_produto`, `quant`, `status`,`data_compra`,`vendedor`,`ref`,`valorTotalC`,`desconto`) VALUES ('$cliente','$idProd','$quant','Compra De Balcao','$dataCompra','$vendedor','$referencia','$valorTotalC','$desconto')";

    $conexao->query($sql);
}


