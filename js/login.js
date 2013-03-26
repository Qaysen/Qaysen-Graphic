$(document).on("ready", inicio);

function inicio(){
  $("#login").on('click',login);
}

window.fbAsyncInit = function() {
    FB.init({
      appId      : '520023464714856', // App ID
      channelUrl : '//localhost/Qaysen-Graphic/', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // connected
        } else if (response.status === 'not_authorized') {
            // not_authorized
            login();
        } else {
            // not_logged_in
            login();
        }
    });
};

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
       //     testAPI();
        } else {
            // cancelled
        }
    }, {scope: 'publish_actions,email, publish_stream'});
}





/*
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
                 window.location = "http://ver-novelas.com/qaysen";
            }
        } else {
            pedirPermisos(); 
        }
    }, true);
}

function pedirPermisos()
{
    window.location="https://www.facebook.com/dialog/oauth?client_id=520023464714856&redirect_uri=http://ver-novelas.com/qaysen/index.html?id=<?php echo $id; ?>&scope=publish_actions,email,offline_access, publish_stream";
}*/
