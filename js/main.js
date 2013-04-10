$(document).on('ready', inicio);
$(window).on('resize', inicio); // Cada vez que se cambia el tamaño del navegador se cambia el tamaño del canvas

function inicio()
{
	ancho = $('.span8').width(); //Capturamos el ancho de span8
	$('#resize').width(ancho); //cambiamos el ancho de resize al ancho que tiene span8
	$('#myCanvas').attr('width', ancho); // cambiamos el ancho de resize al ancho que tiene span8
	redibujarCanvas();
}

$('.atras').on('click',cambioCSS);
$('.adelante').on('click',adelanteA);
$('.boton').on('click','a',ocultarMostrar);

var i=0;
function cambioCSS()
{
    i = i + 1;
    var izquierda = (100*i).toString();
    cambios = {
        "-webkit-transform" : "translateX("+ izquierda +"px)",
        "-moz-transform" : "translateX("+ izquierda +"px)"
    }
    $('.listasImagenes').css(cambios);
}
function adelanteA()
{
    i = i - 1;
    var izquierda = (100*i).toString();
    cambios = {
        "-webkit-transform" : "translateX("+ izquierda +"px)",
        "-moz-transform" : "translateX("+ izquierda +"px)"
    }
    $('.listasImagenes').css(cambios);
}

function ocultarMostrar()
{
    $('.mImagenes').toggle();
}