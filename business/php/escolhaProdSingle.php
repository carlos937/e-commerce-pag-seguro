<?php
require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);

$escolha =$dataObjek[0] -> escolha;
$produtoAntigo =$dataObjek[0] -> produtoAntigo;


if(isset($escolha->cor)){
    $cor = $escolha->cor[0]->tonalidade;
}else{
    $cor = $produtoAntigo[0]->cor;
}


if(isset($escolha->tamanho)){
    $tamanho = $escolha->tamanho[0]->medida;
}else{
    $tamanho = $produtoAntigo[0]->comprimento;
}

$sql="SELECT * FROM produtos WHERE cor = '$cor' and comprimento = '$tamanho'";
$query= $conexao->query($sql);
//echo $sql;
$produtos= array();
$i =0;
while ($dados = $query -> fetch_assoc()){
if($i == 0){
    $produtos[]=$dados;
    
    $produtoId=$dados['id'];
    
 $j= 0;   
$sql2="SELECT * FROM fotosprod WHERE id_produto = '$produtoId'";
$query2= $conexao->query($sql2);
while ($fotos = $query2 -> fetch_assoc()){
        
        $produtos[$i]["foto"][$j] = array($fotos);
        $j++;
}

$i++;
}
}
if(empty($produtos)){
    echo "vazio";
}
else{
echo json_encode($produtos,JSON_PRETTY_PRINT);
}