<?php
require_once 'connect.php';
if(isset($_POST['usuario'])){
$usuario = $_POST['usuario'];    
}else{
    
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);

if(isset($dataObjek)){
 foreach ( $dataObjek as $e )
    {
	$usuario = $e->usuario;
    }
}else{
    $usuario = 0;
}    
}

$sql="SELECT login,senha,nivel,id FROM usuario";
$query= $conexao->query($sql);
while ($dados = $query -> fetch_assoc()){
    $usuarioBd = $dados['login'];
    if($usuarioBd === $usuario ){
        echo 's';
    }
}