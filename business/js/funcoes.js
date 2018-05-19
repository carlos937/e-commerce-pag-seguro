$(function () {
    $("#tabs").tabs({
        active: 2
    });
    $("#dialogPdv").dialog({
        width: "75%",
        buttons: [
            {
                text: "Fechar",
                click: function () {
                    $("#cadastroLb").hide();
                    $(".ui-dialog").hide();
                }
            }
        ]
    });

    $("#gerarImpressao").click(function () {
        $(".checkIn").prop('checked', false);
        $("#lbImprimir").hide();
        $(".fundolb").hide();
                window.print();

        $("#pEs table th,td").css("backgroundColor", "#fff");
        $("#tabelaEstoqueVendas td").removeClass("hideIn");
        $("#tabelaEstoqueVendas th").removeClass("hideIn");
        $("#tabelaEstoqueVendas td").addClass("hideIn");
        $("#tabelaEstoqueVendas th").addClass("hideIn");
    });
    $("#cadastroLb").hide();
    $(".ui-dialog").hide();
    $(".dados").hide();
    $(".fotos").hide();
    $(".dialogPdv").hide();
});

           