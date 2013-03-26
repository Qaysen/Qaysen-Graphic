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

