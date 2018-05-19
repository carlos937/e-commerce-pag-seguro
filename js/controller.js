
//             diretiva para chamar fun�oes
//           angular.module("loja").directive('executaFuncao', function () {
//                return {
//                    restrict: 'AE',
//                    scope: {
//                        chamadaCallback: '&' // <- Define uma refer�ncia de fun��o externa
//                    },
//                    link: function (scope, element, attrs) {
//                        scope.chamadaCallback();;
//                    }
//                };
//            });

angular.module("loja").controller("lojaCtrl", function ($scope, $http) {

    var x = document.cookie;
    var idUsuario;
    var loginUsuario;
    if (x) {
        x = x.split(";");
        if (x[0]) {
            loginUsuario = x[0].split("=");
            loginUsuario = loginUsuario[0];
        }
        if (x[1]) {
            idUsuario = x[1].split("=");
            idUsuario = idUsuario[1];
        }
    }
//    alert(idUsuario);
    $scope.produtos = [];
    $scope.idUs = idUsuario;
    $scope.produtoSingle = [];
    $scope.carrinho = [];
    $scope.novoUsuario = [];
    $scope.todasAsImagens = [];
    $scope.tamanhos = [];
    $scope.cores = [];
    $scope.usuarioController = [];
    $scope.informacoesSobreTransacoesAreaUsuario = [];
    $scope.medidaImplicita;
    $scope.corImplicita;
    $scope.corFiltrada;
    $scope.tamanhoFiltrado;
    $scope.valorDoFrete = "frete nao calculado";
    $scope.valorDaCompra;
    $scope.valorDaCompraMaisFrete = "frete nao calculado";
    $scope.larguraDaCompra;
    $scope.pesoDaCompra;
    $scope.alturaDaCompra;
    $scope.comprimentoDaCompra;
    $scope.quantidadeCompra = 1;
    $scope.tipoDeFrete = "";
    $scope.idsDeRegistrosDeCompras;






//    abrir ligth box    
    $scope.abrirBox = function (id) {
        document.getElementsByClassName("fundolb")[0].style.display = "block";
        document.getElementById(id).style.display = "block";
    };
    $scope.fecharTudoBox = function () {
        var a = document.getElementsByClassName("lb");
        var i = 0;
        while (i < a.length) {
            a[i].style.display = "none";
            i++;
        }


        document.getElementsByClassName("fundolb")[0].style.display = "none";
    };


    $scope.fecharUmEAbrirOutroLb = function (id) {
        $scope.fecharTudoBox();
        $scope.abrirBox(id);
    };


    $scope.accordion = function (ref) {
        var div = document.getElementById("accordionDiv" + ref);
        if (div.style.display === 'none') {
            var x = document.getElementsByClassName("accordionDiv");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            div.style.display = 'block';

        } else {
            div.style.display = 'none';
        }

    };
    informacoesSobreTransacoesAreaUsuario = function () {
        if (idUsuario) {
            $http.post('business/php/informacoesSobreTransacoesAreaUsuario.php', idUsuario).then(function (success) {
                $scope.informacoesSobreTransacoesAreaUsuario = success.data;

                if ($scope.informacoesSobreTransacoesAreaUsuario == "") {
                    document.getElementById("mensagemDados").innerHTML = "Não foi feita nenhuma transação ultimamente.";
                }

            });
        }
    };
    $scope.iniciarPagSeguro = function () {

        if (!$scope.tipoDeFrete) {
            alert("Calcule o frete!!");
        } else {
            var idDoUsuario = idUsuario;
            var form_data = new FormData();
            form_data.append('id', idDoUsuario);
            form_data.append('valorFrete', $scope.valorDoFrete);

            $http.post('pagseguro/pagseguro.php', form_data,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then(function (success) {
                document.getElementById("code").value = success.data;
                window.location.href = "https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + success.data;
//             document.getElementById("comprar").submit();
            });
        }
    };
    buscarUsuario = function () {
        if (idUsuario) {
            $http.post("business/php/buscarUsuario.php", idUsuario).then(function (success) {
                $scope.usuarioController = success.data;
            });
        }
    };
    valorDaCompra = function () {

        $scope.valorDaCompra = 0;
        for (var i = 0; i < $scope.carrinho.length; i++) {
            $scope.valorDaCompra += parseFloat($scope.carrinho[i].valorTotal);

//                   alert($scope.valorDaCompra);
        }
    };
    larguraDaCompra = function () {
        $scope.larguraDaCompra = 0;
        for (var i = 0; i < $scope.carrinho.length; i++) {
            $scope.larguraDaCompra += parseFloat($scope.carrinho[i].largura);
//                   alert($scope.larguraDaCompra);
        }
    };
    pesoDaCompra = function () {
        $scope.pesoDaCompra = 0;
        for (var i = 0; i < $scope.carrinho.length; i++) {
            $scope.pesoDaCompra += parseFloat($scope.carrinho[i].peso);
        }
    };
    alturaDaCompra = function () {
        $scope.alturaDaCompra = 0;
        for (var i = 0; i < $scope.carrinho.length; i++) {
            $scope.alturaDaCompra += parseFloat($scope.carrinho[i].altura);
        }
    };
    comprimentoDaCompra = function () {
        $scope.comprimentoDaCompra = 0;
        for (var i = 0; i < $scope.carrinho.length; i++) {
            var comprimento = parseFloat($scope.carrinho[i].comprimento);
            if ($scope.comprimentoDaCompra < comprimento) {
                $scope.comprimentoDaCompra = comprimento;
            }
        }
    };
    $scope.calcularFrete = function () {



        if ($scope.tipoDeFrete) {
            $scope.valorDoFrete = "calculando ...";
            $scope.valorDaCompraMaisFrete = "calculando ...";
//                   $scope.valorDoFrete =25;
            var dadosFrete = [
                {
                    cepDeDestino: $scope.usuarioController[0].cep,
                    tipoDeFrete: $scope.tipoDeFrete,
                    valorDeclarado: $scope.valorDaCompra,
                    larguraDaCompra: $scope.larguraDaCompra,
                    pesoDaCompra: $scope.pesoDaCompra,
                    alturaDaCompra: $scope.alturaDaCompra,
                    comprimentoDaCompra: $scope.comprimentoDaCompra
                }
            ];
            $http.post("business/php/calcularFrete.php", dadosFrete).then(function (success) {
                $scope.valorDoFrete = success.data;
                $scope.valorDaCompraMaisFrete = $scope.valorDaCompra + parseFloat($scope.valorDoFrete);

            });
        } else {
            alert("Selecione uma opcao !!");
        }

    };
    $scope.aparecerCalculoDeFrete = function () {
        document.getElementById("calculoFrete").style.display = "block";
        document.getElementById("informacoesUsuarioCarrinho").style.display = "none";

    };
    $scope.voltarInformacoesUsuario = function () {
        document.getElementById("calculoFrete").style.display = "none";
        document.getElementById("informacoesUsuarioCarrinho").style.display = "block";

    };
    $scope.filtrarCor = function (cor) {
        $scope.corFiltrada = cor.tonalidade;
//                  console.log($scope.corFiltrada);
    };
    $scope.filtrarTamanho = function (tamanho) {
        $scope.tamanhoFiltrado = tamanho.medida;
//                  console.log($scope.tamanhoFiltrado);
    };
    atualizarProdutos = function () {
        $http.get("business/php/resgatarProdutos.php").then(function (success) {
            $scope.produtos = success.data;
//                        console.log($scope.produtos);
//                        $scope.tamanhos = .tamanho;

//                       pegar tamanhos 
            var tamanhoRepetido = "nao";
            for (var i = 0; i < $scope.produtos.length; i++) {
                var tamanho = $scope.produtos[i].comprimento;

                for (var o = 0; o < $scope.tamanhos.length; o++) {

                    if (tamanho == $scope.tamanhos[o][0].medida) {
                        tamanhoRepetido = "sim";
                    }
//                                alert($scope.tamanhos[o][0].medida);
                }

                if (tamanhoRepetido == "nao") {
                    var t = [
                        {medida: tamanho}
                    ];


                    $scope.tamanhos.push(t);
                }

                tamanhoRepetido = "nao";
            }

//                        pegar cores
            var corRepetida = "nao";
            for (var i = 0; i < $scope.produtos.length; i++) {
                var cor = $scope.produtos[i].cor;

                for (var o = 0; o < $scope.cores.length; o++) {

                    if (cor == $scope.cores[o][0].tonalidade) {
                        corRepetida = "sim";
                    }
                }

                if (corRepetida == "nao") {
                    var t = [
                        {tonalidade: cor}
                    ];


                    $scope.cores.push(t);
                }

                corRepetida = "nao";
            }
//                        console.log($scope.tamanhos);
        });
    };
    atualizarTodasAsFotos = function () {

        $http.get("business/php/resgatarTodasAsFotos.php").then(function (success) {

            $scope.todasAsImagens = success.data;
        });
    };
    atualizarCarrinho = function () {
        if (idUsuario) {
            $http.post("business/php/resgatarCarrinho.php", idUsuario).then(function (success) {
                $scope.carrinho = success.data;
                valorDaCompra();
                larguraDaCompra();
                pesoDaCompra();
                alturaDaCompra();
                comprimentoDaCompra();

            });
        }
    };
    $scope.apagarDoCarrinho = function (id) {
        $http.post("business/php/apagarDoCarrinho.php", id).then(function (success) {
//                   console.log(success);    
            atualizarCarrinho();
        });
    };
    verificarSeUsuarioJaExiste = function (usuario) {

        var usuarioArray = [
            {
                usuario: usuario
            }
        ];
        return $http.post("business/php/verificarUsuario.php", usuarioArray);
    };
    $scope.cadastrarNovoUsuario = function (novoUsuario) {

        var vU = verificarSeUsuarioJaExiste(novoUsuario.usuarioCadastre);

        vU.then(
                function (response) {

                    if (response.data == "s") {
                        alert('Este nome de usuario ja esta em uso!');
                    } else {
                        var dados = [
                            {
                                usuarioCadastre: novoUsuario.usuarioCadastre,
                                senhaCadastre: novoUsuario.senhaCadastre,
                                nomeCadastre: novoUsuario.nomeCadastre,
                                emailCadastre: novoUsuario.emailCadastre,
                                telCadastre: novoUsuario.telCadastre,
                                dddCadastre: novoUsuario.dddCadastre,
                                bairroCadastre: novoUsuario.bairroCadastre,
                                complementoCadastre: novoUsuario.complementoCadastre,
                                celCadastre: novoUsuario.celCadastre,
                                ufCadastre: novoUsuario.ufCadastre,
                                cidadeCadastre: novoUsuario.cidadeCadastre,
                                ruaCadastre: novoUsuario.ruaCadastre,
                                numeroCadastre: novoUsuario.numeroCadastre,
                                cepCadastre: novoUsuario.cepCadastre,
                                nivelCadastre: "cliente"
                            }
                        ];
                        $http.post("business/php/cadastrarUsuarios.php", dados).then(function (success) {
                            document.cookie = novoUsuario.usuarioCadastre + "=" + novoUsuario.senhaCadastre + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                            window.location.reload();
                        });

                    }
                });

    };
    $scope.editarUsuario = function (u) {

        var vU = verificarSeUsuarioJaExiste(u.login);

        vU.then(
                function (response) {
                    if (response.data == "s" && loginUsuario != u.login) {
                        alert('Este nome de usuario ja esta em uso!');
                    } else {
                        var dados = [
                            {
                                id: idUsuario,
                                login: u.login,
                                senha: u.senha,
                                nome: u.nome,
                                email: u.email,
                                tel: u.tel,
                                ddd: u.ddd,
                                bairro: u.bairro,
                                complemento: u.complemento,
                                cell: u.cell,
                                uf: u.uf,
                                cidade: u.cidade,
                                rua: u.rua,
                                numero: u.numero,
                                cep: u.cep,
                                nivel: "cliente"
                            }
                        ];
                        $http.post("business/php/editarUsuarios.php", dados).then(function (success) {
                            alert("Editado Com Sucesso");
                            document.cookie = loginUsuario + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            document.cookie = u.login + "=" + u.senha + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                            window.location.reload();
                        });

                    }
                });

    };
    $scope.irParaOSingle = function (produto) {
        document.getElementsByClassName("filtro")[0].style.display = "none";
        document.getElementsByClassName("single")[0].style.display = "block";
        $scope.produtoSingle = [{nome: produto.nome, valor: produto.valor, id: produto.id, foto: produto.foto, cor: produto.cor, comprimento: produto.comprimento}];
        $scope.medidaImplicita = $scope.produtoSingle[0].comprimento;
        $scope.corImplicita = $scope.produtoSingle[0].cor;
    };
    $scope.voltarParaOFiltro = function () {
        document.getElementsByClassName("filtro")[0].style.display = "block";
        document.getElementsByClassName("single")[0].style.display = "none";
    };
    $scope.escolhaProdSingle = function (escolha) {
        console.log(escolha);
        var dadosS = [
            {
                escolha: escolha,
                produtoAntigo: $scope.produtoSingle
            }
        ];

        $http.post("business/php/escolhaProdSingle.php", dadosS).then(function (success) {

            var s = success.data;
//            console.log(s);
            if (success.data !== "vazio") {
                $scope.produtoSingle = s;
                $scope.medidaImplicita = $scope.produtoSingle[0].comprimento;
                $scope.corImplicita = $scope.produtoSingle[0].cor;
            } else {

                alert("nao temos o produto em estoque !");
            }
        });
    };
    $scope.comprarProduto = function (idProd, quant) {
//se o usuario n estiver logado ele mostra o login
        if (!idUsuario) {
            $scope.abrirBox("dialogLogin");
            window.location.href = "#subirPag";
        } else {
//          muda a div do single para a do filtro e passa o id do usuario e do produto para serem salvos pelo php
            document.getElementsByClassName("filtro")[0].style.display = "block";
            document.getElementsByClassName("single")[0].style.display = "none";
//            abre o dialog do carrinho 
            $scope.abrirBox("dialogCarrinho");

            window.location.href = "#subirPag";
//            alert(quant);
            var dados = [
                {
                    idUsuario: idUsuario,
                    idProd: idProd,
                    quant: quant
                }
            ];
            $http.post("business/php/comprarProdutos.php", dados).then(function (success) {
                console.log(success);
                atualizarProdutos();
                atualizarCarrinho();
            });

        }
    };


    atualizarProdutos();
    atualizarCarrinho();
    atualizarTodasAsFotos();
    buscarUsuario();
    informacoesSobreTransacoesAreaUsuario();

});