$(document).on('ready',inicio);

function inicio()
{
	$('#compartir').on('click',CompartirEnMiMuro);
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

function publicarImagen(rutaImagen)
{   
  FB.getLoginStatus(function(response) 
  {
    if(response.status === 'connected') 
    {
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      publicarMuro(rutaImagen);
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

};

function publicarMuro(imagen)
{
	var mensaje = 'Sube tus imagenes y compartelas en tu muro! Ingresa a Haz tu meme</a>';
  $.post("nuevaimagen.php",{ruta:imagen, cat:fondo.id}).
    success(
    function () {
      FB.api('/photos', 'post', {
        message:mensaje,
        url:imagen        
      }, function(response){

          if (!response || response.error) {
            console.log(response.error);
          } else {
            console.log(response.id);
            $.post("agregarid.php",{id:respuesta, faceid:response.id});
          }

      });  
    });
}

function CompartirEnMiMuro(fondo,imagen) {

console.log(fondo);
  $.post("nuevaimagen.php",{ruta:imagen, cat:fondo.id}).
  success(
  function (respuesta) {

    var obj = {
      method: 'feed',
      link: 'http://localhost/Qaysen-Graphic/vista.php?id='+respuesta,
      picture: 'http://localhost/Qaysen-Graphic/img/'+imagen,
      name: fondo.nombre,
      caption: 'Imagen creada por ... ',
      description: 'Herramienta que permite crear tus propios memes'
    };

    FB.ui(obj,function(response) {
        if (!response || response.error)
        {
          console.log(response.error);
        } else 
        {
          console.log(response.id);

          $.post("agregarid.php",{id:respuesta, faceid:response.id});
        }
    });  

  });
	
}
