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
	$usuario = $e->usuarioCadastre;
    }   
   
    }else{
    $usuario = 0;   
    }

}
if(isset($_POST['senha'])){
$senha = $_POST['senha'];    
}else{

  $postdata = file_get_contents("php://input");
    $dataObjek = json_decode($postdata);
     if(isset($dataObjek)){
     foreach ( $dataObjek as $e )
    {
	$senha = $e->senhaCadastre;
	$cadastroAdm = $e->cadastroAdm;
    }   
   
    }else{
    $senha = 0;   
    }
    
}
$sql="SELECT login,senha,nivel,id FROM usuario";
$query= $conexao->query($sql);
while ($dados = $query -> fetch_assoc()){
       
    $idBd = $dados['id'];
    $usuarioBd = $dados['login'];
    $senhaBd = $dados['senha'];
    $nivelBd = $dados['nivel'];

    if($usuarioBd === $usuario and $senhaBd === $senha){
        if(isset($cadastroAdm)){
            
            if($cadastroAdm === $nivelBd) {
                    echo 'acessoLiberado/'.$idBd;
            }else{
                echo 'acessoNegado';
            }
            
            
        }else{
        echo 's';
        echo '/';
        echo $nivelBd; 
        echo '/';
        echo $idBd;
        }
    }
    
}