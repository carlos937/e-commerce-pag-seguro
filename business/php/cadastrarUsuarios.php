<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
foreach ($dataObjek as $e) {
    $usuarioCadastre = $e->usuarioCadastre;
    $senhaCadastre = $e->senhaCadastre;
    $nomeCadastre = $e->nomeCadastre;
    $emailCadastre = $e->emailCadastre;
    $telCadastre = $e->telCadastre;
    $dddCadastre = $e->dddCadastre;
    $celCadastre = $e->celCadastre;
    $ufCadastre = $e->ufCadastre;
    $cidadeCadastre = $e->cidadeCadastre;
    $ruaCadastre = $e->ruaCadastre;
    $numeroCadastre = $e->numeroCadastre;
    $cepCadastre = $e->cepCadastre;
    $nivel = $e->nivelCadastre;
    $bairroCadastre = $e->bairroCadastre;
    $complementoCadastre = $e->complementoCadastre;
}
$sql = "INSERT INTO `usuario`(`nome`, `nivel`, `senha`, `login`, `email`, `tel`, `cell`, `rua`, `uf`, `cidade`, `cep`, `numero`, `ddd`, `bairro`, `complemento`)"
        . " VALUES ('$nomeCadastre','$nivel','$senhaCadastre','$usuarioCadastre','$emailCadastre','$telCadastre',"
        . "'$celCadastre','$ruaCadastre','$ufCadastre','$cidadeCadastre','$cepCadastre','$numeroCadastre','$dddCadastre','$bairroCadastre','$complementoCadastre')";
echo $sql;
$conexao->query($sql);

header("Location: login.php?");
