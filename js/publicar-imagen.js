$(document).on('ready', inicio);

function inicio()
{
  $('#publicarImagen').on('click', publicarImagen);
}

function publicarImagen()
{   
  FB.getLoginStatus(function(response) 
  {
    if(response.status === 'connected') 
    {
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      function descargar() 
      {
          dataURL = $("canvas").getCanvasImage("png");
          console.log(dataURL);
          //document.getElementById('canvasImg').src = dataURL;

          $.ajax({
              type: 'POST',
              url: '/qaysen/save.php',
              data: {data:dataURL},
              success: function(data) {
                  console.log(data);
                  $('#publicarFB').html(data);
                  var body = 'Sube tus imagenes y compartelas en tu muro! Ingresa a Haz tu meme</a>';
                  var imagen = 'http://ver-novelas.com/qaysen/' + document.getElementById('publicarFB').innerHTML;
                  FB.api('/photos', 'post', {
                      message:body,
                      url:imagen        
                  }, function(response){

                      if (!response || response.error) {
                          alert('Error occured' + response.error);
                      } else {
                          alert('Post ID: ' + response.id);
                      }

                  });
                  console.log(imagen);
              },
              error: function(data) {
                  console.log(data);
              }
          });
      }
      descargar();
    }
    else if (response.status === 'not_authorized') 
    {
      console.log("No estas autorizado");
    }
    else 
    {
      console.log("No estas logueado");
    }
  });

};