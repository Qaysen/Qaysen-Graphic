$(document).on('ready', inicio1);

function inicio1()
{
    $('#login').on('click',verificarLogin);
}

function verificarLogin()
{
    console.log('hola');
    //FB._https = true;
    FB.init({
        appId : '520023464714856',
        status:true,
        cookie:true,
        xfbml:true,
        oauth:true
    });   

    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            if (response.status === "unknown") { 
                //alert("No esta logueado en Facebook");
                pedirPermisos();
            } else if(response.status === "not_authorized") {
                //alert("Estas conectado a facebook, pero no tiene permisos para usar la App");
                pedirPermisos();
            } else {
                 //esta logueado y tiene permisos, redirecciono!
                 window.location = "http://localhost/Qaysen-Graphic/";
            }
        } else {
            pedirPermisos(); 
        }
    }, true);
}

function pedirPermisos()
{
    window.location="https://www.facebook.com/dialog/oauth?client_id=520023464714856&redirect_uri=http://edwinpgm.com/index.html?id=<?php echo $id; ?>&scope=publish_actions,email,offline_access, publish_stream";
}
