<?php

require_once 'connect.php';
if (isset($_GET['ref'])) {
    $ref = $_GET['ref'];
} else {
    $ref = "REF13032018";
}
$sql = "SELECT limite_do_estoque FROM configuracoes ";
$query = $conexao->query($sql);
while ($dados = $query->fetch_assoc()) {
    $limite_do_estoque = $dados['limite_do_estoque'];
}


mysqli_free_result($query);
$cont = 0;
$sql = "SELECT quant,id_produto FROM registro_de_compras WHERE ref = '$ref' ";
$query = $conexao->query($sql);
while ($dados = $query->fetch_assoc()) {

    $quant = $dados['quant'];
    $id_produto = $dados['id_produto'];
    
    $sql2 = "SELECT quant FROM produtos WHERE id = $id_produto";
    $query2 = $conexao->query($sql2);
    while ($dados = $query2->fetch_assoc()) {

        $quantAtual = $dados['quant'];

        if ($quantAtual >= ($limite_do_estoque + $quant)) {
            $sql3 = "UPDATE produtos SET quant = quant - $quant  WHERE id = $id_produto";
            $conexao->query($sql3);
        }else{
            echo "$id_produto/";
            $cont++;
        }
        
    }
}

if($cont == 0){
    echo 'ok';
}
  