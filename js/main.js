$(document).on('ready', inicio);

function inicio()
{
	$('.subir-capa').('click', subirCapa);
	console.log('hola');
}

function subirCapa() {
	$algo = $(this).parent();
}