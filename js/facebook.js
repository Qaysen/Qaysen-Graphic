$(document).on('ready',inicio);

var dominio = "http://ver-novelas.com/qaysen/"

function inicio()
{
	$('#login').on('click',comprobarLogin);
  $('#prueba1').on('click',prueba1);
}

function iniciarFb()
{
  //Inicializamos la APP con FB
  // window.fbAsyncInit = function() {
      FB.init({
        appId      : '520023464714856', // App ID
        channelUrl : dominio, // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });
  // };
}

function comprobarLogin()
{
  iniciarFb();
	FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // Estas conectado con la app
        } else if (response.status === 'not_authorized') {
            // No tienes los permisos
            login();
        } else {
            // No estas logueado
            login();
        }
    });
}

function login()
{
  iniciarFb();
	FB.login(function(response) {
        if (response.authResponse) {
            // Conectado con la app
			// testAPI();
        } else {
            // Cancelas el login
        }
    }, {scope: 'publish_actions,email, publish_stream'});
}

function verificarLogin(imagen)
{
      FB.init({appId: "520023464714856", status: true, cookie: true});
  
        FB.getLoginStatus(function(response){
            if(response.status === 'connected') 
            {
                console.log("verificado");
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                publicarImagen(imagen, accessToken);
            }
            else if (response.status === 'not_authorized') 
            {
                alert("Haz click en Login");
            }
            else 
            {
            alert("Haz click en Login");
            }
            });
}

function publicarImagen(imagen, accessToken)
{
	var mensaje = 'Sube tus imagenes y compartelas en tu muro! Ingresa a Haz tu meme</a>';
  $.ajax({
    type: 'POST',
    url: 'nuevaimagen.php',
    data: imagen,
    success: function(respuesta) {
        console.log(respuesta);
        FB.api('/photos', 'post', {
          message:mensaje,
          url:dominio+imagen.url,
          accessToken: accessToken   
        }, function(response){

            if (!response || response.error) {
              console.log(response.error);
            } else {
              console.log(response.id);
              $.post("agregarid.php",{id:respuesta, faceid:response.id});
            }

        }); 
    },
    error: function(archivo) {
        console.log("error");
    }
});
}

function compartirEnMuro(imagen) {
  FB.init({appId: "520023464714856", status: true, cookie: true});
    $.ajax({
        type: 'POST',
        url: 'nuevaimagen.php',
        data: imagen,
        success: function(respuesta) {
            console.log(imagen);
            respuesta = respuesta.replace(/(\r\n|\n|\r)/gm,"");

            var obj = {
              method: 'feed',
              link: dominio + 'post.php?id='+respuesta,
              picture: dominio + imagen.url,
              name: imagen.nombre,
              caption: 'Imagen creada por ... ',
              description: 'Herramienta que permite crear tus propios memes'
            };

            console.log(obj.picture);

            FB.ui(obj,function(response) {
                console.log(response);
                if (!response || response.error)
                {
                  return false;
                } else 
                {
                    console.log(typeof(respuesta));
                    respuesta = parseInt(respuesta);
                    console.log(typeof(respuesta));
                  console.log(response.id);

                  $.post("agregarid.php",{id:parseInt(respuesta), faceid:response.post_id});
                  return true;
                }
            });  
        },
        error: function(archivo) {
            console.log("error");
        }
    });
}


function prueba1()
{
  alert('pasa');
  FB.init({appId: "520023464714856", status: true, cookie: true});

  FB.ui(
  {
    method: 'feed',
    name: 'Loco',
    link: 'https://ver-novelas.com/qaysen/',
    picture: 'http://fbrell.com/f8.jpg',
    caption: 'Reference Documentation',
    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
  },
  function(response) {
    if (response && response.post_id) {
      alert('Post was published.');
    } else {
      alert('Post was not published.');
    }
  }
);
}