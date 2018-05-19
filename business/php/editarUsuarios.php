<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
foreach ($dataObjek as $e) {
    $id = $e->id;
    $login = $e->login;
    $senha = $e->senha;
    $nome = $e->nome;
    $email = $e->email;
    $tel = $e->tel;
    $ddd = $e->ddd;
    $cell = $e->cell;
    $uf = $e->uf;
    $cidade = $e->cidade;
    $rua = $e->rua;
    $numero = $e->numero;
    $cep = $e->cep;
    $nivel = $e->nivel;
    $bairro = $e->bairro;
    $complemento = $e->complemento;
}
echo $bairro;
$sql = "UPDATE `usuario` SET `nome`= '$nome' , `nivel`='$nivel' , `senha`= '$senha' , `login`= '$login' ,`email`= '$email' , `tel` = '$tel',"
       . "`cell`='$cell',`rua`='$rua',`uf`='$uf',`cidade`='$cidade',`cep`='$cep',`numero`='$numero',`ddd`='$ddd',`bairro`='$bairro',`complemento`='$complemento' WHERE id = $id";

echo $sql;
$conexao->query($sql);

header("Location: login.php?");
