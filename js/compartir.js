$(document).on("ready", inicio);
function inicio(){
  $('#compartir').on('click',CompartirEnMiMuro);
}

function CompartirEnMiMuro() {
  FB.init({appId: "520023464714856", status: true, cookie: true});
  // calling the API ...
  var obj = {
    method: 'feed',
    link: 'localhost/Qaysen-Graphic/',
    picture: 'http://www.veomemes.com/wp-content/uploads/2012/08/agua-en-el-oido.jpg',
    name: 'Qaysen-Graphic',
    caption: 'La ultima  ',
    description: 'Herramienta que permite crear tus propios memes'
  };

  FB.ui(obj);
}