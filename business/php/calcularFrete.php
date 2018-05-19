<?php


function calcular_frete($cep_origemF,
    $cep_destinoF,
    $pesoF,
    $valorF,
    $tipo_do_freteF,
    $alturaF,
    $larguraF,
    $comprimentoF){
 
 
    $url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?";
    $url .= "nCdEmpresa=";
    $url .= "&sDsSenha=";
    $url .= "&sCepOrigem=" . $cep_origemF;
    $url .= "&sCepDestino=" . $cep_destinoF;
    $url .= "&nVlPeso=" . $pesoF;
    $url .= "&nVlLargura=" . $larguraF;
    $url .= "&nVlAltura=" . $alturaF;
    $url .= "&nCdFormato=1";
    $url .= "&nVlComprimento=" . $comprimentoF;
    $url .= "&sCdMaoProria=n";
    $url .= "&nVlValorDeclarado=" . $valorF;
    $url .= "&sCdAvisoRecebimento=n";
    $url .= "&nCdServico=" . $tipo_do_freteF;
    $url .= "&nVlDiametro=0";
    $url .= "&StrRetorno=xml";
 
    //Sedex: 40010
    //Pac: 41106
 
    $xml = simplexml_load_file($url);
    return $xml->cServico;
 
}

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$dataObjek = json_decode($postdata);
foreach ( $dataObjek as $e )
    {
	$cepDeDestino =$e->cepDeDestino;
        $tipoDeFrete = $e->tipoDeFrete;
        $valorDeclarado = $e->valorDeclarado;
        $largura = $e->larguraDaCompra;
        $peso = $e->pesoDaCompra;
        $altura = $e->alturaDaCompra;
        $comprimento = $e->comprimentoDaCompra;
    }
////
////    echo $cepDeDestino."///";
////    echo $tipoDeFrete."///";
////    echo $valorDeclarado."///";
////    echo $largura."///";
////    echo $peso."///";
//    echo $altura;
    $sql2="SELECT cepDeOrigem FROM configuracoes";
    $query2= $conexao->query($sql2);
    while ($dados = $query2 -> fetch_assoc()){
     $cepDeOrigem = $dados['cepDeOrigem'];
           
    }
$val = (calcular_frete($cepDeOrigem,
    $cepDeDestino,
    $peso,
    $valorDeclarado,
    $tipoDeFrete,
    $altura,
    $largura,
    $comprimento));
 

$valorDoFrete = $val->Valor;

echo str_replace(",",".",$valorDoFrete);