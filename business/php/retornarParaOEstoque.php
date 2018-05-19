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
$sql = "SELECT quant,id_produto FROM registro_de_compras WHERE ref = '$ref' ";
$query = $conexao->query($sql);
while ($dados = $query->fetch_assoc()) {
    $quant = $dados['quant'];
    $id_produto = $dados['id_produto'];
    $sql2 = "UPDATE produtos SET quant = quant + $quant  WHERE id = $id_produto ";
    $conexao->query($sql2);
}