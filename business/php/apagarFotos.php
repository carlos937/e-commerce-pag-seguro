<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
$sql="DELETE FROM fotosprod WHERE id='$dataObjek'";
$conexao->query($sql);