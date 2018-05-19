<?php
require_once 'connect.php';
header('Content-Type:'."application/json");

//$sql="SELECT P.*, FP.nome_foto FROM produtos as P join fotosprod as FP on P.id = FP.id_produto order by P.id asc";
$sql="SELECT * FROM produtos order by id asc";
$query= $conexao->query($sql);

$produtos= array();
$i =0;
while ($dados = $query -> fetch_assoc()){
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
//echo $produtoId;
echo json_encode($produtos,JSON_PRETTY_PRINT);


/*  for(i = 0; i < arrayId; i++){
 *   array[i][j] = arrayId[];
 *      for (j = 0; j < arrayFoto; i++){
 *          array[i][j] = arrayFoto
 *          }
 * /}
 */