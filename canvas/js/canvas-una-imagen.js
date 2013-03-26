$(function() {
    canvas = $("#myCanvas");
    
    //Redibuja el canvas, util para funciones que requieren
    //redibujado como cuando se elimina una imagen o se redimensiona
    //el canvas
    function redibujarCanvas(){
        canvas.drawLayers();
    }

    //el elemento #resize contiene al canvas, ya que canvas no es
    //escalable directamente mediante jqueryui, se usa un div que si
    //permite escalamiento con jqueryui.
    //En este caso solo se implementa el momento en que el
    //redimensionado termina, al suceder esto el canvas obtiene
    //el tamaño de su contenedor y posteriormente se redibuja
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

    //Esto sucede al dar click en una imagen del explorador
    $("#explorador img").on("click", function(){

        imagen = new Image();
        imagen.src = $(this).attr("src");
        var ancho = imagen.width;
        var alto = imagen.height;
        
        canvas.setLayer("imagen",{
                            source: imagen,
                            x:0, y:0,
                            fromCenter: false
                        });

        var tam = {
            width: ancho,
            height: alto
        };

        canvas.attr(tam);

        
        $("#resize").css(tam);

        redibujarCanvas();
    });
    
    function actualizarLista() {

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
            
            filas += '</td><td><button class="btn-danger">Eliminar</button></td><td><a class="subir-capa">arriba<i class="icon-chevron-up"></i></a><a class="bajar-capa">bajar<i class="icon-chevron-down"></i></a></td></tr>';
        }

        $(".lista-objetos tbody").html(filas);
        
        $(".lista-objetos .btn-danger").on("click", function(){
            fila = $(this).parents("tr:first");

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
    var capaActual;
    var texto = {
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
                console.log(capaActual);
            }
        };

    $("#dibujarTexto").on("click",function() {
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
     })

    var dataURL = '';
    var imagenActual;

    $(".genImagen").on("click",function(){
        var temp_dataURL = canvas.getCanvasImage("png");
        var id = $(this).attr("id");

        if(dataURL !== temp_dataURL)
        {
            dataURL = temp_dataURL;
            
            crearImagen(dataURL,id,function(){
                imagenActual = $("#url").html();

                if(id === "descargar")
                {
                    window.location.href =  "download.php?path="+ imagenActual;
                }
                else if(id === "publicarImagen")
                {
                    console.log("publicar");
                    publicarImagen(imagenActual);
                }
            });
        }
        else
        {
            if(id === "descargar")
                {
                    window.location.href =  "download.php?path="+ imagenActual;
                }
            else if(id === "publicarImagen")
            {
                console.log("publicar");
                publicarImagen(imagenActual);
            }
        }
    });

    function crearImagen(url,boton,callback) {
        $.ajax({
            type: 'POST',
            url: 'save.php',
            data: {data:dataURL},
            success: function(archivo) {
                $("#url").html(archivo);
                callback(boton);
            },
            error: function(archivo) {
            }
        });
    }

});

