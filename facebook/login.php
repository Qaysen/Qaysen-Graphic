<div id="fb-root"></div>

<button id= "empezar"> Loguearse </button>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="//connect.facebook.net/en_US/all.js"></script>
<script>
 $(document).on("ready", inicio);
      function inicio(){
          $("#empezar").on('click',login);
        }
  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '468416426563099', // App ID
      channelUrl : '//localhost/Qaysen-Graphic/', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    


// Additional init code here
FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        // connected
    } else if (response.status === 'not_authorized') {
        // not_authorized
        login();
    } else {
        // not_logged_in
        login();
    }
});

};


/*  Codigo para comprobar q se ha logueado con face

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}
*/
    // Additional init code here


  function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
       //     testAPI();
        } else {
            // cancelled
        }
    });
}

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>