$(document).on('ready', iniciar1);

function iniciar1(){
    $('#click1').on('click',verificarLogin);
}

function verificarLogin(){
            //FB._https = true;
            FB.init({
                appId : '468416426563099',
                status:true,
                cookie:true,
                xfbml:true,
                oauth:true
            });   


            FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                    if (response.status === "unknown") { 
                        //alert("No est  logueado en Facebook");
                        PedirPermisos();
                    } else if(response.status === "not_authorized") {
                        //alert("Est s conectado a facebook, pero no tiene permisos para usar la App");
                        PedirPermisos();
                    } else {
                         //esta logueado y tiene permisos, redirecciono!
                        
                        console.log("Muy bn"); 
                        compartir();
                        // window.location = "http://www.depor.com";
                    }
                } else {
                    PedirPermisos(); 
                }
            }, true);
        }

  function PedirPermisos() {
            window.location="https://www.facebook.com/dialog/oauth?client_id=468416426563099&redirect_uri=http://localhost/Qaysen-Graphic/index.html?id=<?php echo $id; ?>&scope=publish_actions,publish_stream,email,offline_access";
        }



  function compartir() {
      // FB.init({appId: "468416426563099", status: true, cookie: true});
        // calling the API ...
        var obj = {
          method: 'feed',
          redirect_uri: 'http://www.outlook.com',
          link: 'https://www.videoxd.net',
          picture: 'http://http://1.bp.blogspot.com/-BFEk6OGv8Rg/UMp-td3pzeI/AAAAAAAAXS4/xU3E2jcJT9E/s1600/Im%C3%A1genes+Tiernas+Navide%C3%B1as+con+Fotos+de+Cachorritos++para+Facebook.jpg',
          name: 'Facebook Dialogs',
          caption: 'Reference Documentation',
          description: 'Using Dialogs to interact with users.'
        };

        function callback(response) {
          document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
        }

        FB.ui(obj, callback);
      }