$(function () {
    var limparCookies = function () {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    };

    var x = document.cookie;
    if (x) {

        x = x.split(";");
        var uS = x[0].split("=");
        var usuario = uS[0];
        var senha = uS[1];


        $.ajax({
            type: "post",
            url: "business/php/login.php",
            data: {
                usuario: usuario,
                senha: senha
            },
            success: function (r) {
                r = r.split("/");
                if (r[0] === "s") {
                    if (r[1] === "adm") {
                        document.cookie = usuario + "=" + senha + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        document.cookie = "id=" + r[2] + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        window.location.href = "business/index.php";
                    } else {
//                               alert("Bem vindo "+usuario);
                        document.cookie = usuario + "=" + senha + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        document.cookie = "id=" + r[2] + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        if (!x[1]) {
                            window.location.reload();
                        }


                        $("#carrinhoBotao").show();
                        $("#login").hide();
                        $("#cadastre-se").hide();
                        $("#deslogar").show();
                        $("#areaDoUsuarioBtn").show();
                    }
                }
            }
        });
    }
    $("#menu").accordion({
        collapsible: true,
        heightStyle: "content"
    });
    
   $('#menu .ui-accordion-content').show();
   
   
    $("#deslogar").click(function () {
        limparCookies();
        window.location.reload();
    });



    $("#entrar").click(function () {
        var usuarioLogin = $("#usuarioLogin").val();
        var senhaLogin = $("#senhaLogin").val();
        $.ajax({
            type: "post",
            url: "business/php/login.php",
            data: {
                usuario: usuarioLogin,
                senha: senhaLogin
            },
            success: function (r) {
                r = r.split("/");
                if (r[0] === "s") {
                    if (r[1] === "adm") {
                        document.cookie = usuarioLogin + "=" + senhaLogin + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        document.cookie = "id=" + r[2] + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        window.location.href = "business/index.php";
                    } else {
                        alert("Bem vindo " + usuarioLogin);
                        document.cookie = usuarioLogin + "=" + senhaLogin + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        document.cookie = "id=" + r[2] + "; expires=Thu, 13 Mai 9999 12:00:00 GMT;path=/";
                        window.location.reload();
                    }
                } else {
                    alert("Usuario e Senha n�o correpondem");
                }
            }
        });
    });



});