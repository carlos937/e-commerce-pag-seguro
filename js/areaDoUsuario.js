$(function () {
   
    $('#areaDoUsuario').hide();

    $("#areaDoUsuario").css('padding', 0);
    $("#tabs").tabs({
        width: "100%",
        height: "100%"
    });
    $("#dadosDoUsuario").css('heigth', "100%");

    $("#areaDoUsuario input ").attr('disabled', true);
    $("#areaDoUsuario select ").attr('disabled', true);
    $("#areaDoUsuario .concluido").hide();
    $("#areaDoUsuario .editarUsuario").click(function () {
        $("#areaDoUsuario input").attr('disabled', false);
        $("#areaDoUsuario select").attr('disabled', false);
        $("#areaDoUsuario .editarUsuario").hide();
        $("#areaDoUsuario .concluido").show();
    });
    $("#areaDoUsuario .concluido").click(function () {
        $("#areaDoUsuario input").attr('disabled', true);
        $("#areaDoUsuario select").attr('disabled', true);
        $("#areaDoUsuario .editarUsuario").show();
        $("#areaDoUsuario .concluido").hide();
    });
    $("#fecharAreaDoUsuario").click(function(){
      $("#areaDoUsuario").dialog('close');
    });
});