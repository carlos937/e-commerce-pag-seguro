<?phprequire_once 'connect.php';header('Content-Type:' . "application/json");$foiAoPagSeguro = array();$referencias = array();$sql = "SELECT ref FROM registro_de_compras where status= 'Foi Ate O PagSeguro'";$query = $conexao->query($sql);$repetida = "nao";while ($dados = $query->fetch_assoc()) {    foreach ($referencias as $r) {        if ($r == $dados['ref']) {            $repetida = "sim";        }    }    if ($repetida == "nao") {        $referencias[] = $dados['ref'];    } else {        $repetida = "nao";    }}$j = 0;foreach ($referencias as $ref) {//    $sql = "SELECT * FROM registro_de_compras WHERE status= 'Foi Ate O PagSeguro' AND ref = '$ref'";    $sql = "SELECT *,produtos.nome AS nomeprod FROM registro_de_compras INNER JOIN produtos ON registro_de_compras.id_produto = produtos.id "            . " WHERE  registro_de_compras.ref = '$ref'";    $query = $conexao->query($sql);    $i = 0;    while ($dados = $query->fetch_assoc()) {        $id_usuario = $dados['id_usuario'];        $data_compra = $dados['data_compra'];        $foiAoPagSeguro[$j]['produtos'][$i]['id_produto'] = $dados['id_produto'];        $foiAoPagSeguro[$j]['produtos'][$i]['quantidade_produto'] = $dados['quant'];        $foiAoPagSeguro[$j]['produtos'][$i]['id_registro'] = $dados['id'];        $foiAoPagSeguro[$j]['produtos'][$i]['nome_produto'] = $dados['nomeprod'];        $foiAoPagSeguro[$j]['produtos'][$i]['altura_produto'] = $dados['altura'];        $foiAoPagSeguro[$j]['produtos'][$i]['largura_produto'] = $dados['largura'];                $foiAoPagSeguro[$j]['produtos'][$i]['cor_produto'] = $dados['cor'];                        $foiAoPagSeguro[$j]['produtos'][$i]['comprimento_produto'] = $dados['comprimento'];                $i++;    }    $sql2 = "SELECT * FROM usuario WHERE id = $id_usuario";    $query2 = $conexao->query($sql2);    while ($dadosUsuario = $query2->fetch_assoc()) {        $nomeUsuario = $dadosUsuario['nome'];        $emailUsuario = $dadosUsuario['email'];        $loginUsuario = $dadosUsuario['login'];        $cepUsuario = $dadosUsuario['cep'];        $telUsuario = $dadosUsuario['tel'];        $celUsuario = $dadosUsuario['cell'];        $ruaUsuario = $dadosUsuario['rua'];        $numeroUsuario = $dadosUsuario['numero'];        $complementoUsuario = $dadosUsuario['complemento'];        $bairroUsuario = $dadosUsuario['bairro'];        $cidadeUsuario = $dadosUsuario['cidade'];        $ufUsuario = $dadosUsuario['uf'];    }    $foiAoPagSeguro[$j]['celUsuario'] = $celUsuario;    $foiAoPagSeguro[$j]['cidadeUsuario'] = $cidadeUsuario;    $foiAoPagSeguro[$j]['ufUsuario'] = $ufUsuario;    $foiAoPagSeguro[$j]['numeroUsuario'] = $numeroUsuario;    $foiAoPagSeguro[$j]['complementoUsuario'] = $complementoUsuario;    $foiAoPagSeguro[$j]['bairroUsuario'] = $bairroUsuario;    $foiAoPagSeguro[$j]['cepUsuario'] = $cepUsuario;    $foiAoPagSeguro[$j]['ruaUsuario'] = $ruaUsuario;    $foiAoPagSeguro[$j]['nomeUsuario'] = $nomeUsuario;    $foiAoPagSeguro[$j]['telUsuario'] = $telUsuario;    $foiAoPagSeguro[$j]['loginUsuario'] = $loginUsuario;    $foiAoPagSeguro[$j]['emailUsuario'] = $emailUsuario;    $foiAoPagSeguro[$j]['id_usuario'] = $id_usuario;    $foiAoPagSeguro[$j]['ref'] = $ref;    $foiAoPagSeguro[$j]['data_compra'] = $data_compra;    $j++;}echo json_encode($foiAoPagSeguro, JSON_PRETTY_PRINT);