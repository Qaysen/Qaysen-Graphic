$(document).on('ready',inicio);

function inicio()
{
	$('#login').on('click',comprobarLogin);

	//Inicializamos la APP con FB
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '520023464714856', // App ID
	      channelUrl : '//localhost/Qaysen-Graphic/', // Channel File
	      status     : true, // check login status
	      cookie     : true, // enable cookies to allow the server to access the session
	      xfbml      : true  // parse XFBML
	    });
	};
}

function comprobarLogin()
{
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
	FB.login(function(response) {
        if (response.authResponse) {
            // Conectado con la app
			// testAPI();
        } else {
            // Cancelas el login
        }
    }, {scope: 'publish_actions,email, publish_stream'});
}

function verificarLogin(funcion)
{
    return function(){
        FB.getLoginStatus(function(response){
            if(response.status === 'connected') 
            {
                console.log("verificado");
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                funcion();
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
}

publicarImagen = verificarLogin(publicarImagen(arguments));
function publicarImagen(imagen)
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
          url:imagen.url        
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
    $.ajax({
        type: 'POST',
        url: 'nuevaimagen.php',
        data: imagen,
        success: function(respuesta) {
            
            respuesta = respuesta.replace(/(\r\n|\n|\r)/gm,"");

            var obj = {
              method: 'feed',
              link: 'http://localhost/appFaceGraf/post.php?id='+respuesta,
              picture: 'http://localhost/appFaceGraf/'+imagen.url,
              name: imagen.nombre,
              caption: 'Imagen creada por ... ',
              description: 'Herramienta que permite crear tus propios memes'
            };

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
