angular.module("painel").directive("fileInput", function ($parse) {
    return{
        link: function ($scope, element, attrs) {
            element.on("change", function (event) {
                var files = event.target.files;
                //console.log(files[0].name);  
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    };
});
angular.module("painel").controller("painelCtrl", function ($scope, $http) {
    $scope.usuarios = [];
    $scope.produtos = [];
    $scope.imagensProd = [];
    $scope.notificacoesFoiAteOPagSeguro = [];
    $scope.notificacoesPago = [];
    $scope.notificacoesEntrege = [];
    $scope.notificacoesEmAnalise = [];
    $scope.notificacoesEnviado = [];
    $scope.notificacoesEmDisputa = [];
    $scope.notificacoesDevolvido = [];
    $scope.notificacoesCancelado = [];
    $scope.registroDeCompras = [];
    $scope.configuracoes = [];
    $scope.carrinhoPdv = [];
    $scope.valorDaCompra = 0;
    $scope.ordemDeBuscaEstoque = "id";
    $scope.criterioDeBuscaEstoque = "id";
    $scope.ordemDeBuscaPdv = "id";
    $scope.ordemDeBuscaRegistro = "ref";
    $scope.criterioDeBuscaPdv = "id";
    $scope.criterioDeBuscaRegistro = "ref";
    $scope.criterioDeBuscaEstoqueModificado = "codigo";
    $scope.criterioDeBuscaEstoqueModificadoRegistro = "Referencia";
    $scope.clienteC = 0;
    var idProdutoCadastrado;
    $scope.statusFotoId = "nao";
    var x = document.cookie;
    if (x) {
        x = x.split(";");
        if (!x[0]) {

            window.location.href = "../";
        }
        if (!x[1]) {

            window.location.href = "../";
        }
        var xx = x[1].split("=");
        var id_usuario = xx[1];

    } else {

        window.location.href = "../";
    }
    
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
    
    buscarUsuarios = function () {
        $http.get("php/resgatarUsuarios.php").then(function (success) {
            $scope.usuarios = success.data;
        });
    };
    $scope.apagarReferencia = function (ref) {
        var dados = [
            {referencia: ref}
        ];
        $http.post("php/apagarReferencia.php", dados).then(function (success) {
            console.log(success.data);
            atualizarRegistroDeCompras();
        });
    };
    $scope.apagarRegistro = function (id_registro) {
        var dados = [
            {id: id_registro}
        ];
        $http.post("php/apagarRegistro.php", dados).then(function (success) {
            alert(success.data);
            atualizarRegistroDeCompras();
        });
    };
    atualizarRegistroDeCompras = function () {
        $http.get("php/resgatarRegistro.php").then(function (success) {
            $scope.registroDeCompras = success.data;
            console.log($scope.registroDeCompras);

            var j = 0;
            while (j < $scope.registroDeCompras.length) {

                $scope.registroDeCompras[j].valorCarrinhoComDesconto = 0;
                $scope.registroDeCompras[j].valorCarrinhoSemDesconto = 0;
                var i = 0;

                while (i < $scope.registroDeCompras[j].produtos.length) {


//                    se o produto vier sem o valor com desconto informado ele vem da web então 
//                    eu atribuo o valor total a ele para zerar o desconto
                    if (!parseFloat($scope.registroDeCompras[j].produtos[i].valorTotalC)) {
                        $scope.registroDeCompras[j].produtos[i].valorTotalC = $scope.registroDeCompras[j].produtos[i].valor;
                    }

                    $scope.registroDeCompras[j].valorCarrinhoComDesconto += parseFloat($scope.registroDeCompras[j].produtos[i].valorTotalC);
                    $scope.registroDeCompras[j].valorCarrinhoSemDesconto += parseFloat($scope.registroDeCompras[j].produtos[i].valor);


                    i++;
                }

                $scope.registroDeCompras[j].valorDoDesconto = parseFloat($scope.registroDeCompras[j].valorCarrinhoSemDesconto) - parseFloat($scope.registroDeCompras[j].valorCarrinhoComDesconto);
                j++;
            }
        });
    };
    $scope.mostrarCarrinho = function () {
        document.querySelector("#dialogPdv").style.display = "block";
        document.querySelector(".ui-dialog").style.display = "block";
    };
    $scope.comprarPdv = function () {
        document.getElementById("naoHaProdutosNoCarrinho").style.display = "block";
        var dados = [
            {produtos: $scope.carrinhoPdv, vendedor: id_usuario, cliente: $scope.clienteC}
        ];
        $http.post("php/comprarPdv.php", dados).then(function (success) {
            $http.get("php/subtrairDoEstoque.php?ref=" + success.data).then(function (s) {
                alert(s.data);
                atualizarRegistroDeCompras();
                atualizarProdutos();
            });
            $scope.carrinhoPdv = [];
            $scope.valorDaCompra = 0;
            $scope.clienteC = 0;
            document.querySelector("#dialogPdv").style.display = "none";
            document.querySelector(".ui-dialog").style.display = "none";

        });

    };
    $scope.atualizarCarrinhoPdv = function (produto, condicao) {
        document.getElementById("naoHaProdutosNoCarrinho").style.display = "none";
        if (!produto.quantidadeProdCarrinho) {
            produto.quantidadeProdCarrinho = 1;
        }
        if (!produto.desconto) {
            produto.desconto = 0;
        }
        if (!produto.valordesconto) {
            produto.valordesconto = 0;
        }
        if (!$scope.pessoaPdv) {
            $scope.pessoaPdv = "fisica";
        }
        if (!produto.desconto) {
            produto.desconto = 0;
        }
        if (produto.desconto < 0) {

            produto.desconto = 0;
        }

        if ($scope.pessoaPdv == "fisica" && produto.desconto > parseFloat(produto.dsPessoaFisica)) {
            produto.desconto = parseFloat(produto.dsPessoaFisica);
            document.getElementById('avisoPainelPdv').innerHTML = "Limite de Desconto para Pessoa Fisica Excedido";
        } else if ($scope.pessoaPdv == "juridica" && produto.desconto > parseFloat(produto.dsPessoaJuridica)) {
            produto.desconto = parseFloat(produto.dsPessoaJuridica);
            document.getElementById('avisoPainelPdv').innerHTML = "Limite de Desconto para Pessoa Juridica Excedido";
        } else {
            document.getElementById('avisoPainelPdv').innerHTML = "";
        }


//       calcula o valor dos produtos em quantidade   
        produto.valorTotalC = produto.quantidadeProdCarrinho * produto.valor;
//        calcula o desconto dos produtos em percentual 
        produto.valordesconto = produto.valorTotalC * produto.desconto / 100;

        produto.valorTotalC -= produto.valordesconto;
        //        adiciona um novo produto caso o intuito de uso da funcao n for editar
        if (condicao !== "editar") {
            var pc = $scope.carrinhoPdv;
            var g = 0;
            var repete = "nao";
            while (g < $scope.carrinhoPdv.length) {

                if (pc[g].id == produto.id) {
                    repete = "sim";
                }
                g++;
            }
            if (repete !== "sim") {
                $scope.carrinhoPdv.push(angular.copy(produto));
            }
        }
// calculo do valor total da compra
        var pc = $scope.carrinhoPdv;
        $scope.valorDaCompra = 0;
        var j = 0;
        while (j < $scope.carrinhoPdv.length) {

            $scope.valorDaCompra += pc[j].valorTotalC;
            j++;
        }
// calculo do valor total sem desconto
        var pc = $scope.carrinhoPdv;
        $scope.valorSemDesconto = 0;
        var j = 0;
        while (j < $scope.carrinhoPdv.length) {

            $scope.valorSemDesconto += pc[j].valor;
            j++;
        }
// calculo do valor total do desconto
        var pc = $scope.carrinhoPdv;
        $scope.valorDoDesconto = 0;
        var j = 0;
        while (j < $scope.carrinhoPdv.length) {

            $scope.valorDoDesconto += pc[j].valordesconto;
            j++;
        }

//        fechar light box
        document.querySelector("#dialogPdv").style.display = "block";
        document.querySelector(".ui-dialog").style.display = "block";
    };
    $scope.changePessoa = function (pc) {
        document.getElementById("descontoPessoaPdv").value = 0;
        $scope.atualizarCarrinhoPdv(pc, 'editar');
    };
    $scope.apagarProdutoC = function (prod) {

        var id = prod.id;
        var pc = $scope.carrinhoPdv;
        var j = 0;
        while (j < pc.length) {

            if (pc[j].id == id) {

                $scope.carrinhoPdv.splice(j, 1);
            }

            j++;
        }
        $scope.atualizarCarrinhoPdv(prod, "editar");
    };
    $scope.oqImprimir = function (parametro) {

        if (parametro == "codigo") {
            var x = document.getElementsByClassName("codigo");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "produto") {
            var x = document.getElementsByClassName("produto");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "valor") {
            var x = document.getElementsByClassName("valor");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "quantidade") {
            var x = document.getElementsByClassName("quantidade");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "cor") {
            var x = document.getElementsByClassName("cor");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "altura") {
            var x = document.getElementsByClassName("altura");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "largura") {
            var x = document.getElementsByClassName("largura");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "comprimento") {
            var x = document.getElementsByClassName("comprimento");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "peso") {
            var x = document.getElementsByClassName("peso");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "dsPessoaFisica") {
            var x = document.getElementsByClassName("dsPessoaFisica");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }
        if (parametro == "dsPessoaJuridica") {
            var x = document.getElementsByClassName("dsPessoaJuridica");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].style.backgroundColor != "red") {
                    x[i].style.backgroundColor = "red";
                    x[i].classList.remove("hideIn");
                } else {
                    x[i].style.backgroundColor = "#fff";
                    x[i].classList.add("hideIn");
                }
            }
        }

    };
    buscarConfiguracoes = function () {
        $http.get("php/buscarConfiguracoes.php").then(function (success) {
            $scope.configuracoes = success.data;
        });
    };
    $scope.mudarTituloDeBusca = function (criterio) {

        if (criterio == "id") {
            $scope.criterioDeBuscaEstoqueModificado = "Codigo";
        }
        if (criterio == "nome") {
            $scope.criterioDeBuscaEstoqueModificado = "Produto";
        }
        if (criterio == "valor") {
            $scope.criterioDeBuscaEstoqueModificado = "Valor";
        }
        if (criterio == "quant") {
            $scope.criterioDeBuscaEstoqueModificado = "Quantidade";
            
        }
        if (criterio == "cor") {
            $scope.criterioDeBuscaEstoqueModificado = "Cor";
            
        }
        if (criterio == "altura") {
            $scope.criterioDeBuscaEstoqueModificado = "Altura";
        }
        if (criterio == "largura") {
            $scope.criterioDeBuscaEstoqueModificado = "Largura";
        }
        if (criterio == "comprimento") {
            $scope.criterioDeBuscaEstoqueModificado = "Comprimento";
        }
        if (criterio == "peso") {
            $scope.criterioDeBuscaEstoqueModificado = "Peso";
        }
    };
    $scope.mudarTituloDeBuscaRegistro = function (criterio) {

        if (criterio == "ref") {
            $scope.criterioDeBuscaEstoqueModificadoRegistro = "Referencia";
        }
        if (criterio == "status") {
            $scope.criterioDeBuscaEstoqueModificadoRegistro = "Status";
        }
        if (criterio == "data_compra") {
            $scope.criterioDeBuscaEstoqueModificadoRegistro = "Data da Compra";
        }

    };
    $scope.notificacoesSucesso = function (ref) {
        document.getElementsByClassName("notificacoesSucesso")[0].style.display = "block";
        document.getElementsByClassName("outrasNotificacoes")[0].style.display = "none";
    };
    $scope.outrasNotificacoes = function (ref) {
        document.getElementsByClassName("notificacoesSucesso")[0].style.display = "none";
        document.getElementsByClassName("outrasNotificacoes")[0].style.display = "block";
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
    $scope.buscarNotificacoes = function () {
        $http.get("php/buscarNotificacoesFoiAteOPagSeguro.php").then(function (success) {
            $scope.notificacoesFoiAteOPagSeguro = success.data;
        });
        $http.get("php/buscarNotificacoesEmAnalise.php").then(function (success) {
            $scope.notificacoesEmAnalise = success.data;
        });
        $http.get("php/buscarNotificacoesPago.php").then(function (success) {

            $scope.notificacoesPago = success.data;
        });
        $http.get("php/buscarNotificacoesEnviado.php").then(function (success) {
            $scope.notificacoesEnviado = success.data;
        });
        $http.get("php/buscarNotificacoesEntrege.php").then(function (success) {
            $scope.notificacoesEntrege = success.data;
        });
        $http.get("php/buscarNotificacoesEmDisputa.php").then(function (success) {
            $scope.notificacoesEmDisputa = success.data;
        });
        $http.get("php/buscarNotificacoesDevolvido.php").then(function (success) {
            $scope.notificacoesDevolvido = success.data;
        });
        $http.get("php/buscarNotificacoesCancelado.php").then(function (success) {
            $scope.notificacoesCancelado = success.data;
        });

    };
    $scope.enviarProdutos = function (ref, rastreamento) {
        if (!rastreamento) {
            rastreamento = "Este Produto Nao Sera Enviado Pelos Correios";
        }


        var dados = [
            {
                ref: ref,
                rastreamento: rastreamento
            }
        ];
        $http.post("php/enviarProdutos.php", dados).then(function (success) {
            $scope.buscarNotificacoes();
        });

    };
    $scope.deslogarAdm = function () {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
        window.location.href = "../";
    };
    atualizarFotos = function () {

        var produto = [
            {id: idProdutoCadastrado}
        ];
        $http.post("php/resgatarFotosProd.php", produto).then(function (success) {

            $scope.imagensProd = success.data;
            console.log($scope.imagensProd);
        });
    };
    atualizarProdutos = function () {
        $http.get("php/resgatarProdutos.php").then(function (success) {

            $scope.produtos = success.data;
            var prods = $scope.produtos;
            var i = 0;
            while (i < prods.length) {

                prods[i].dsPessoaFisicaValorComDesconto = prods[i].valor * prods[i].dsPessoaFisica / 100;
                prods[i].dsPessoaJuridicaValorComDesconto = prods[i].valor * prods[i].dsPessoaJuridica / 100;

                i++;
            }

        });
    };
    $scope.salvarNovoProduto = function (produto) {
        $http.post("php/salvando.php", produto).then(function (success) {
            atualizarProdutos();
            $scope.fecharUmEAbrirOutroLb("fotosProd");
            $scope.imagensProd = [];
        });
        $scope.statusFotoId = "sim";
    };
    $scope.salvarNovaFoto = function () {
        atualizarProdutos();
        var idProd = 0;
        if ($scope.statusFotoId === "sim") {
            for (var i = 0; i < $scope.produtos.length; i++) {
                idProd = $scope.produtos[i].id;
            }
            idProdutoCadastrado = idProd;
        }

        var form_data = new FormData();
        angular.forEach($scope.files, function (file) {
            form_data.append('file', file);
        });
        form_data.append('id', idProdutoCadastrado);
        $http.post('php/addNovaFoto.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function (response) {
            atualizarFotos();
        });

        document.getElementById("submitImg").value = "Salvar Mais Fotos";
    };
    $scope.apagarProduto = function (id) {
        $http.post("php/apagarProdutos.php", id).then(function (success) {
            atualizarProdutos();
        });
    };
    $scope.apagarFoto = function (id) {
        $http.post("php/apagarFotos.php", id).then(function (success) {
            console.log(success);
            atualizarFotos();
        });
    };
    apenasNumeros = function (string)
    {
        var numsStr = string.replace(/[^0-9]/g, '');
        return parseInt(numsStr);
    };
    $scope.editarProduto = function (lugar, id) {

        var elemento = document.querySelector('#' + lugar + 'Prod' + id);
        var valor = elemento.innerHTML;
        if (lugar != "nome" && lugar != "cor") {
            valor = valor.replace(",", ".");
            
            valor = valor.replace("R$", "");
            
            valor = valor.replace("cm", "");
            
            valor = valor.replace("kg", "");
            
            valor = valor.replace(" ", "");
        }
       if(lugar == "dsPessoaFisica" || lugar == "dsPessoaJuridica" ){
            
            valor = valor.split("(");
            valor = apenasNumeros(valor[0]);
        }
        
        
        var dados = [
            {
                lugar: lugar,
                valor: valor,
                id: id
            }
        ];

        $http.post("php/editarProdutos.php", dados).then(function (success) {
         
//         altera o valor no array de produtos para q a informação seja mesma em todo o sistema sem a necessidade de carregar o array novamente   
         var prods = $scope.produtos;
         console.log(prods);
          var i = 0;
          while(i< prods.length){
            if(prods[i].id == id ){
                if(lugar =="nome"){
                    prods[i].nome = valor;
                }
                if(lugar =="altura"){
                    prods[i].altura = valor;
                }
                if(lugar =="comprimento"){
                    prods[i].comprimento = valor;
                }
                if(lugar =="cor"){
                    prods[i].cor = valor;
                }
                if(lugar =="dsPessoaFisica"){
                    prods[i].dsPessoaFisica = valor;
                }
                if(lugar =="dsPessoaJuridica"){
                    prods[i].dsPessoaJuridica = valor;
                }
                if(lugar =="dsPessoaJuridica"){
                    prods[i].dsPessoaJuridica = valor;
                }
                if(lugar =="largura"){
                    prods[i].largura = valor;
                }
                if(lugar =="peso"){
                    prods[i].peso = valor;
                }
                if(lugar =="quant"){
                    prods[i].quant = valor;
                }
                if(lugar =="valor"){
                    prods[i].valor = valor;
                }
            }
                i++;
          }
        });
    };
    $scope.fechardialogGeral = function () {
        document.querySelector("#dialogGeral").style.display = "none";
        document.querySelector(".ui-dialog").style.display = "none";
        document.querySelector(".dados").style.display = "none";
        document.querySelector(".fotos").style.display = "none";
        document.querySelector(".dialogPdv").style.display = "none";
    };
    $scope.editarFotos = function (id) {
        $scope.statusFotoId = "nao";
        idProdutoCadastrado = id;
        atualizarFotos();
        $scope.abrirBox("fotosProd");
        document.querySelector(".dados").style.display = "none";
        document.querySelector(".dialogPdv").style.display = "none";
        document.querySelector(".fotos").style.display = "block";


    };
    $scope.salvarConfiguracoes = function (configuracoes) {

        var form_data = new FormData();
        form_data.append('cepDeOrigem', configuracoes[0].cepDeOrigem);
        form_data.append('limite_do_estoque', configuracoes[0].limite_do_estoque);
        $http.post('php/salvarConfiguracoes.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function (success) {
        });
    };
//    cadastro de usuarios 
    $scope.abrirCadastroUsuario = function (parametro) {
        if (parametro == "cliente") {
            document.querySelector("#cadastrarClienteDiv").style.display = "block";
            document.querySelector("#cadastrarVendedorDiv").style.display = "none";
            document.querySelector("#cadastrarAdmDiv").style.display = "none";
        } else if (parametro == "vendedor") {
            document.querySelector("#cadastrarClienteDiv").style.display = "none";
            document.querySelector("#cadastrarVendedorDiv").style.display = "block";
            document.querySelector("#cadastrarAdmDiv").style.display = "none";
        }
//    adm
        else {
            document.querySelector("#cadastrarClienteDiv").style.display = "none";
            document.querySelector("#cadastrarVendedorDiv").style.display = "none";
            document.querySelector("#cadastrarAdmDiv").style.display = "block";
        }
    };
    verificarSeUsuarioJaExiste = function (usuario) {

        var usuarioArray = [
            {
                usuario: usuario
            }
        ];
        return $http.post("php/verificarUsuario.php", usuarioArray);
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
                        $http.post("php/cadastrarUsuarios.php", dados).then(function (success) {
                            alert("usuario cadastrado com successo");
                        });

                    }
                });

    };
    $scope.cadastrarVendedor = function (novoVendedor) {
        var logadoDados = [
            {
                usuarioCadastre: novoVendedor.usuarioLogado,
                senhaCadastre: novoVendedor.senhaLogado,
                cadastroAdm: "adm"
            }
        ];
        $http.post("php/login.php", logadoDados).then(function (r) {

            var resultado = r.data.split("/");
            alert(resultado[0]);
            if (resultado[0] === "acessoLiberado") {

                var vU = verificarSeUsuarioJaExiste(novoVendedor.novoUsuario);
                vU.then(
                        function (response) {
                            if (response.data == "s") {
                                alert('Este nome de usuario ja esta em uso!');
                            } else {
                                var uS = [
                                    {
                                        usuarioCadastre: novoVendedor.novoUsuario,
                                        senhaCadastre: novoVendedor.novaSenha,
                                        nomeCadastre: "vendedor",
                                        emailCadastre: "vendedor",
                                        telCadastre: "vendedor",
                                        celCadastre: "vendedor",
                                        ufCadastre: "vendedor",
                                        cidadeCadastre: "vendedor",
                                        ruaCadastre: "vendedor",
                                        enderecoCadastre: "vendedor",
                                        cepCadastre: "vendedor",
                                        nivelCadastre: "vendedor"
                                    }
                                ];
                                $http.post("php/cadastrarUsuarios.php", uS).then(function (success) {
                                    alert("cadastro efetuado com sucesso !");
                                });
                            }
                        });
            } else if (resultado[0] === "acessoNegado") {
                alert("Este usuario nao tem permissao para cadastrar outro usuario");
            } else {
                alert("Este usuario nao esta cadastrado");
            }
        });
    };
    $scope.cadastrarAdm = function (novoAdm) {
        var logadoDados = [
            {
                usuarioCadastre: novoAdm.usuarioLogado,
                senhaCadastre: novoAdm.senhaLogado,
                cadastroAdm: "adm"
            }
        ];
        $http.post("php/login.php", logadoDados).then(function (r) {

            var resultado = r.data.split("/");
            alert(resultado[0]);
            if (resultado[0] === "acessoLiberado") {

                var vU = verificarSeUsuarioJaExiste(novoAdm.novoUsuario);
                vU.then(
                        function (response) {
                            if (response.data == "s") {
                                alert('Este nome de usuario ja esta em uso!');
                            } else {
                                var uS = [
                                    {
                                        usuarioCadastre: novoAdm.novoUsuario,
                                        senhaCadastre: novoAdm.novaSenha,
                                        nomeCadastre: "adm",
                                        emailCadastre: "adm",
                                        telCadastre: "adm",
                                        celCadastre: "adm",
                                        ufCadastre: "adm",
                                        ruaCadastre: "adm",
                                        cidadeCadastre: "adm",
                                        enderecoCadastre: "adm",
                                        cepCadastre: "adm",
                                        nivelCadastre: "adm"
                                    }
                                ];
                                $http.post("php/cadastrarUsuarios.php", uS).then(function (success) {
                                    alert("cadastro efetuado com sucesso !");
                                });
                            }
                        });
            } else if (resultado[0] === "acessoNegado") {
                alert("Este usuario nao tem permissao para cadastrar outro usuario");
            } else {
                alert("Este usuario nao esta cadastrado");
            }
        });
    };



//    arrays carregados  assim q a pag é carregada
    buscarUsuarios();
    atualizarProdutos();
    buscarConfiguracoes();
    $scope.buscarNotificacoes();
    atualizarRegistroDeCompras();
});