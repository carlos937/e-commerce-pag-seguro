<?php
require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
$nome = $dataObjek->nome;
$valor = $dataObjek->valor;
$valor = str_replace(",", ".", $valor);
$quantidade = $dataObjek->quantidade;
$altura =$dataObjek->altura;
$largura =$dataObjek->largura;
$comprimento =$dataObjek->comprimento;
$peso =$dataObjek->peso;
$cor =$dataObjek->cor;
$cor =$dataObjek->cor;
$dsPessoaJuridica =$dataObjek->dsPessoaJuridica;
$dsPessoaFisica =$dataObjek->dsPessoaFisica;
echo $valor;

$sql="INSERT INTO produtos(`nome`,`valor`,`quant`,`altura`,`largura`,`comprimento`,`peso`,`cor`,`dsPessoaJuridica`,`dsPessoaFisica`)"
        . " values('$nome','$valor','$quantidade','$altura','$largura','$comprimento','$peso','$cor','$dsPessoaJuridica','$dsPessoaFisica');";
$conexao->query($sql);
