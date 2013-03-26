$(document).on('ready', inicio);

function inicio()
{
  $('#compartir').on('click', compartir);
}

function compartir()
{
    
    FB.getLoginStatus(function(response) 
    {
      if(response.status === 'connected') 
      {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        FB.api('/me', function(response) 
        {
           console.log('Estas registrado');
        });

        //Compartir imagen en el muro
        var body = 'Mi primera iamgen subida';
        var imagen = 'http://edwinpgm.com/' + document.getElementById('publicarFB').innerHTML;
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