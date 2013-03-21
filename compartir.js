$(document).on('ready', iniciar1);

function iniciar1(){
    $('#click1').on('click',verificarLoguin);
}

function verificarLoguin(){
            //FB._https = true;
            FB.init({
                appId : '468416426563099',
                status:true,
                cookie:true,
                xfbml:true,
                oauth:true
            });   


            FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                    if (response.status === "unknown") { 
                        //alert("No est  logueado en Facebook");
                        PedirPermisos();
                    } else if(response.status === "not_authorized") {
                        //alert("Est s conectado a facebook, pero no tiene permisos para usar la App");
                        PedirPermisos();
                    } else {
                         //esta logueado y tiene permisos, redirecciono!
                         window.location = "http://localhost/Qaysen-Graphic/index.html";
                    }
                } else {
                    PedirPermisos(); 
                }
            }, true);
        }

        function PedirPermisos() {
            window.location="https://www.facebook.com/dialog/oauth?client_id=468416426563099&redirect_uri=http://localhost/Qaysen-Graphic/index.html?id=<?php echo $id; ?>&scope=publish_actions,email,offline_access";
        }
