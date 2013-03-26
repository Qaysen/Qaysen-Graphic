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

      descargar();
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

function descargar() 
{
    dataURL = $("canvas").getCanvasImage("png");
    //console.log(dataURL);
    //document.getElementById('canvasImg').src = dataURL;

    $.ajax({
        type: 'POST',
        //url: '/qaysen/save.php',
        url: 'save.php',
        data: {data:dataURL},
        success: function(data) {
            //console.log(data);
            $('#publicarFB').html(data);
            var mensaje = 'Sube tus imagenes y compartelas en tu muro! Ingresa a Haz tu meme</a>';
            //var imagen = 'http://ver-novelas.com/qaysen/' + document.getElementById('publicarFB').innerHTML;
            var imagen = 'http://localhost/Qaysen-Graphic/' + document.getElementById('publicarFB').innerHTML;
            
            publicarMuro(mensaje, imagen);

        },
        error: function(data) {
            console.log(data);
        }
    });
}

function publicarMuro(mensaje, imagen)
{
    FB.api('/photos', 'post', {
        message:mensaje,
        url:imagen        
    }, function(response){

        if (!response || response.error) {
          console.log(response.error);
        } else {
          console.log(response.id);
        }

    });
}

function CompartirEnMiMuro() {
	var obj = {
		method: 'feed',
		link: 'http://localhost/Qaysen-Graphic/',
		picture: 'http://www.veomemes.com/wp-content/uploads/2012/08/agua-en-el-oido.jpg',
		name: 'Qaysen-Graphic',
		caption: 'La ultima  ',
		description: 'Herramienta que permite crear tus propios memes'
	};

	FB.ui(obj);
}