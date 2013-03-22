$(document).on('ready', inicio);
$(window).on('resize', inicio); // Cada vez que se cambia el tamaño del navegador se cambia el tamaño del canvas

function inicio()
{
	ancho = $('.span8').width(); //Capturamos el ancho de span8
	$('#resize').width(ancho); //cambiamos el ancho de resize al ancho que tiene span8
	$('#myCanvas').attr('width', ancho); // cambiamos el ancho de resize al ancho que tiene span8
}