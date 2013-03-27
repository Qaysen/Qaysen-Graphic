$(document).on('ready', inicio);

function inicio()
{
	canvas = $("#myCanvas");
    fondoCanvas = {};
	$("#explorador img").on('click', imagenFondo);
    $("#dibujarTexto").on("click", dibujarTexto);
    $(".genImagen").on("click", generarImagen);
    colorFondo();
}

function redibujarCanvas()
{
	canvas.drawLayers();
}

function colorFondo()
{
	canvas.addLayer({
        method: "drawImage",
        index: 0,
        name: "imagen",
        source: "",
        fromCenter: false,
        x: 0, y: 0,
        load: function() {
            $(this).drawLayer();
        }
    })
}

function imagenFondo()
{
    fondoCanvas["id"] = $(this).attr("value");
    fondoCanvas.nombre  = $(this).attr("id");
	imagen = new Image();
    var src = $(this).attr("src").replace("_thumbs","");
    imagen.src = src;
    var ancho = canvas.attr('width');
    var altoImagen = imagen.height;

    var porcentaje = ancho/imagen.width;

    var altoCanvas = porcentaje*altoImagen;
    
    canvas.setLayer("imagen",{
                        source: imagen,
                        x:0, y:0,
                        width:ancho, height: altoCanvas,
                        fromCenter: false,
                        onLoad: function(layer){
                            $(this).drawLayers();
                        }
                    });

    var dimensiones = {
        width: ancho,
        height: altoCanvas
    };

    canvas.attr(dimensiones);
    
    $("#resize").css(dimensiones);

    redibujarCanvas();
}

function actualizarLista() 
{
    var filas = "";
    capas = canvas.getLayers();

    for(i=capas.length; i>1;i--)
    {
        filas += "<tr><td>";
        filas += capas.length - i;
        filas += "</td><td>";
        contenido = capas[i-1].data.contenido;
        filas += contenido.substring(0,9);
        if(contenido.length >10)
        {
            filas += "...";     
        }
        
        filas += '</td><td><button class="btn-danger">Eliminar</button></td><td><a class="subir-capa"><i class="icon-chevron-up"></i></a><a class="bajar-capa"><i class="icon-chevron-down"></i></a></td></tr>';
    }

    $(".lista-objetos tbody").html(filas);
    
    $(".lista-objetos .btn-danger").on("click", function(){
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;    

        canvas.removeLayer(indice);
        actualizarLista();
        redibujarCanvas();

    });

    $(".subir-capa").on("click",function(){
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;            
        
        capa = canvas.getLayer(indice);

        if(indice < capas.length && indice > 0)
        { 
            canvas.moveLayer(indice, indice+1);
            actualizarLista();
            redibujarCanvas();
        }
    });

    $(".bajar-capa").on("click",function(){
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;
        
        capa = canvas.getLayer(indice);

        if(indice >1 && indice)
        {  
            canvas.moveLayer(indice, indice - 1);
            actualizarLista();
            redibujarCanvas();
        }
        
    });
}

function dibujarTexto()
{
    var capaActual;
    var texto = 
    {
        draggable: true,
        group: "texto",
        method: "drawText",
        fillStyle: "#9cf",
        strokeStyle: "#25a",
        strokeWidth: 0,
        x: 20, y: 20,
        fromCenter: false,
        font: "36pt Verdana",
        background: "#000",
        click: function(layer) {
            capaActual = layer.index;
            //console.log(capaActual);
        }
    };

    text = $("#texto").val();
    capas = canvas.getLayers().length;
    
    var distinto = {
         data:{
            contenido: text
         },
         text: text,
     };

    var distinto = $.extend(distinto,texto);

    canvas.addLayer(distinto);

    actualizarLista();
    redibujarCanvas();
}

function generarImagen()
{
    var dataURL = '';
    var temp_dataURL = canvas.getCanvasImage("png");
    var id = $(this).attr("id");
    try{
    if(dataURL !== temp_dataURL)
    {
        dataURL = temp_dataURL;
        
        crearImagen(dataURL,function(){

            if(id === "descargar")
            {
                window.location.href =  "download.php?path="+ fondoCanvas["url"];
            }
            else if(id === "publicarImagen")
            {
                publicarImagen(fondoCanvas);
            }
            else if(id === "compartir")
            {
                compartirEnMuro(fondoCanvas);
            }
        });
    }
    else
    {
        if(id === "descargar")
        {
            window.location.href =  "download.php?path="+ imagenActual;
        }
    }
    }
    finally{
        redibujarCanvas();
    }

}

function crearImagen(url,callback) {
    $.ajax({
        type: 'POST',
        url: 'save.php',
        data: {data:url},
        success: function(archivo) {
            $("#url").html(archivo);
            fondoCanvas.url = archivo;
            callback();
        },
        error: function(archivo) {
        }
    });
}