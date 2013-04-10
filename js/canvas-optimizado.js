$(document).on('ready', inicio);
canvas = $("#myCanvas");
function inicio()
{
    
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
    fondoCanvas['id'] = $(this).attr('value');
    fondoCanvas['nombre'] = $(this).attr('id');
    imagen = new Image();
    var src = $(this).attr("src").replace("_thumbs","");
    imagen.src = src;
    imagen.onload = function(){
        ancho = canvas.attr('width');
        alto = imagen.height;
        
        var porcentaje = ancho/imagen.width;
        var altoCanvas = porcentaje*alto;
        
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
        //$("#resize").css(dimensiones);

        redibujarCanvas();
    };
    
}
[

]
function actualizarLista() 
{
    var filas = "";
    capas = canvas.getLayers();

    for(i=capas.length; i>1;i--)
    {
        filas += "<tr>";
        filas+='<td><div class="input-prepend inpur-append"><button class="btn btn-danger"><i class="icon-white icon-remove-sign"></i></button>';
        filas += "<input type='text' class='capainput input-medium' value='";
        contenido = capas[i-1].text;
        filas += contenido.substring(0,9);
        if(contenido.length >10)
        {
            filas += "...";     
        }
        filas+="'/><img src='img/bn.jpg' class='bn img-polaroid' width='20'/></div></td>";
        filas+='<td><a class="mas-tam"><i class="icon-chevron-up"></i></a><a class="menos-tam"><i class="icon-chevron-down"></i>';
        filas += '<td><a class="subir-capa"><i class="icon-chevron-up"></i></a><a class="bajar-capa"><i class="icon-chevron-down"></i></a></td></tr>';
    }

    $(".lista-objetos tbody").html(filas);
    
    $(".lista-objetos .btn-danger").on("click", function(){
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;    

        canvas.removeLayer(indice);
        actualizarLista();
        redibujarCanvas();

    });

    $(".bn").on("click",function () {
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;  
        capa = canvas.getLayer(indice);      
        blanco = "#fff";
        negro = "#000";
        if(capa.fillStyle == blanco)
        {
            canvas.setLayer(indice,
                {
                    fillStyle: negro,
                    strokeStyle: "transparent",
                    strokeWidth: 1
                });
        }
        else
        {
            canvas.setLayer(indice,
                {
                    fillStyle: blanco,
                    strokeStyle: negro,
                    strokeWidth: 2
                });
        }
        redibujarCanvas();

    })

    $(".capainput").on("focus",function () {
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;  
        $(this).val(canvas.getLayer(indice).text);      
        $(this).on("keyup",function() {
            canvas.setLayer(indice,
                {
                    text:$(this).val()
                }
            )
            redibujarCanvas();
        })
    })

    $(".mas-tam").on("click",function () {
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;  
        fuente = canvas.getLayer(indice).font.substring(2); 
        tam = canvas.getLayer(indice).font.match(/\d+/g);
        tam = parseInt(tam)+1;
        canvas.setLayer(indice,
            {
                font: tam+fuente
            });
        console.log(canvas.getLayer(indice));
        redibujarCanvas();
    })

        $(".menos-tam").on("click",function () {
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;  

        fuente = canvas.getLayer(indice).font.substring(2); 
        tam = canvas.getLayer(indice).font.match(/\d+/g);
        tam = parseInt(tam)-1;
        canvas.setLayer(indice,
            {
                font: tam+fuente
            });
        redibujarCanvas();
    })

    $(".capainput").on("blur",function () {
        fila = $(this).parents("tr:first");
        indice = capas.length - fila.index()-1;  

        contenido = canvas.getLayer(indice).text;
        if(contenido.length >10)
        {
            contenido = contenido.substring(0,9);
            contenido += "...";     
        }

        $(this).val(contenido);        
    })

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
        fillStyle: "#fff",
        strokeStyle: "#000",
        strokeWidth: 2,
        x: 0, y: 0,
        shadowColor: "#000",
        shadowBlur: 3,
        font: "36pt Helvetica, sans-serif",
        maxWidth: 200,
        fromCenter: false,
        background: "#000",
        fontSize: "36pt"
    };

    text = $("#texto").val();
    capas = canvas.getLayers().length;
    
    var distinto = {
         text: text
     };

    var distinto = $.extend(distinto,texto);

    canvas.addLayer(distinto);

    actualizarLista();
    redibujarCanvas();
}

var publicado = false;
var compartido = false;

function generarImagen()
{
    var dataURL = '';
    var temp_dataURL = canvas.getCanvasImage("png");
    //console.log(compartido);
    var id = $(this).attr("id");

    var capas = canvas.getLayers();

    var post_canvas = {
        capa_imagen:{
        },
        capas_texto:[]
    };

    for (i in capas)
    {
        capa = capas[i];
        console.log(capa);
        if(capa["name"] == "imagen")
        {
            post_canvas.capa_imagen["url"] = capa["source"].src;
        }
        else
        {
            texto = {
                contenido: capa.text,
                tam: parseInt(capa.font.match(/\d+/g)),
                fill: capa.fillStyle,
                outline: capa.strokeStyle,
                stroke: capa.strokeWidth,
                posx: capa.x,
                posy: capa.y
            };
            post_canvas.capas_texto.push(texto);
        }
    }


    try{
    if(dataURL !== temp_dataURL)
    {
        dataURL = temp_dataURL;

        crearImagenImagick(post_canvas,function(){

            if(id === "descargar")
            {
                window.location.href =  "download.php?path="+ fondoCanvas["url"];
            }
            else if(id === "publicarImagen" && !publicado)
            {
                publicado = publicarImagen(fondoCanvas);
            }
            else if(id === "compartir" && !compartido)
            {
                compartido = compartirEnMuro(fondoCanvas);
            }
        });
    }
    else if(id === "descargar")
    {
        window.location.href =  "download.php?path="+ imagenActual;
    }
    }
    finally{
        redibujarCanvas();
    }

}

function crearImagenImagick(datos_canvas,callback){
    $.ajax(
    {
        type: 'POST',
        url: 'generar.php',
        data: {"canvas":datos_canvas},
        success: function(archivo){
            //window.location.href = archivo;
            fondoCanvas.url = archivo;
            callback();
        }
    })
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