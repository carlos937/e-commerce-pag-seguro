<?php

require_once 'connect.php';
if(isset($_POST['cepDeOrigem'])){
    $cepDeOrigem = $_POST['cepDeOrigem'];
}else{
    $cepDeOrigem = "nenhum cep informado";
}
if(isset($_POST['limite_do_estoque'])){
    $limite_do_estoque = $_POST['limite_do_estoque'];
}else{
    $limite_do_estoque = 0;
}
$sql = "UPDATE configuracoes SET `cepDeOrigem` = '$cepDeOrigem',`limite_do_estoque` = '$limite_do_estoque'";
$conexao -> query($sql);
//echo $sql;