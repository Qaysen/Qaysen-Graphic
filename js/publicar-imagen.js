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
      FB.api('/me', function(response) 
      {
         console.log('Estas registrado');
      });

      //Compartir imagen en el muro
      var body = 'Mi primera iamgen subida';
      var imagen = 'http://3.bp.blogspot.com/-X0YlNcwvF2U/UMjNtzNy__I/AAAAAAAAXJ0/HH6N-sUJVGA/s1600/Im%C3%A1genes+Preciosas+Navide%C3%B1as+con+Fotos+de+Winnie+Pooh+para+Facebook.jpg';
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

(function(d, debug){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/es_LA/all" + (debug ? "/debug" : "") + ".js";
   ref.parentNode.insertBefore(js, ref);
 }(document, /*debug*/ false));