$(document).on('ready', inicio);

function inicio()
{
  $('#compartir').on('click', compartir);
}

function compartir()
{
  /*window.fbAsyncInit = function() {

    
    FB.init({
    appId : '468416426563099',
      status : true,
      cookie : true,
      xfbml : true
    });*/
    
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
        var imagen = 'http://edwinpgm.com/' + $('#publicarFB').val();
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
/*}*/

(function(d, debug){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/es_LA/all" + (debug ? "/debug" : "") + ".js";
   ref.parentNode.insertBefore(js, ref);
 }(document, /*debug*/ false));
/* 
function face_login() {
 FB.login(function(response) {
   if(response.authResponse) {
      location.reload();
   }
 }, {scope: 'publish_actions,user_actions.video'});
}
function face_logout() {
 if(confirm("Â¿Seguro que deseas cerrar sesiÃ³n?")) {
   FB.logout(function(response) {
     location.reload();
   });
 }
}
function video_rate(note) {
  FB.getLoginStatus(function(response) {
   if(response.status === 'connected') {
	 $.post("ajax/ratings.php", { points: note, video: id_web },
	  function(data){
		if(data == "success"){
		 alert("Gracias por evaluar este video.");	
		}
		else if (data == "error05") {
		 alert("Ya haz evaluado antes este video.");
		} else {
		 alert("Ha ocurrido un error al intentar evaluar este video.");
		}
	  }, "text");
   } else if (response.status === 'not_authorized') {
	  alert("Para evaluar un video, necesitas autorizar nuestra aplicaciÃ³n de Facebook.");
   } else {
	  alert("Para evaluar un video, necesitas ingresar con tu cuenta de Facebook.");
   }
 }, true);
}*/