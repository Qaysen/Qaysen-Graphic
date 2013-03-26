$(function() {
    //Lista de los objetos que están actualmente en canvas
    var objetos = [];
    canvas = $("#myCanvas");

    ancho = $('.span8').width(); //Capturamos el ancho de span8
    $('#resize').width(ancho); //cambiamos el ancho de resize al ancho que tiene span8
    $('#myCanvas').attr('width', ancho); // cambiamos el ancho de resize al ancho que tiene span8
    
    canvas.addLayer({
        method:"drawRect",
        name:"fondo",
        group:"imagenes",
        x:0,y:0,
        width:canvas.attr("width"),
        height:canvas.attr("height"),
        fromCenter: false,
        fillStyle: "#fff",
        index:0
    }).drawLayers();

    //Redibuja el canvas, util para funciones que requieren
    //redibujado como cuando se elimina una imagen o se redimensiona
    //el canvas
    function redibujarCanvas(){
        canvas.moveLayer("fondo",0);
        canvas.drawLayers();
    }

    //el elemento #resize contiene al canvas, ya que canvas no es
    //escalable directamente mediante jqueryui, se usa un div que si
    //permite escalamiento con jqueryui.
    //En este caso solo se implementa el momento en que el
    //redimensionado termina, al suceder esto el canvas obtiene
    //el tamaño de su contenedor y posteriormente se redibuja
    $("#resize").resizable({ 
        resize: function(event, ui) {
            $("#myCanvas", this).each(function() { 
                $(this).attr({ width: ui.size.width, height: ui.size.height });
                canvas.setLayer("fondo",
                {
                    width: canvas.attr("width"),
                    height:canvas.attr("height"),
                    fromCenter: false
                });
                redibujarCanvas();               
            });
        }
    });

    //Esto sucede al dar click en una imagen del explorador
    $("#explorador img").on("click", function(){
        //Se obtienen el numero de capas que se encuentran en el
        //grupo imagenes para posteriormente indicar que el index
        //de la imagen nueva sea igual al numero de capas, es decir
        //se ubicará por encima de las demas
        capasimagen = canvas.getLayerGroup("imagenes").length;

        id = objetos.length;
        var nombre = $(this).attr("id");

        canvas.addLayer({
            draggable:true,
            method: "drawImage",
            index: capasimagen,
            group: "imagenes",
            name: id,
            data:{
                contenido: nombre
            },
            source: $(this).attr("src"),
            x: 150, y: 150,
            load: function() {
                $(this).drawLayer();
            }
        })
                
        actualizarLista();
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
            capasimagen = canvas.getLayerGroup("imagenes").length;
        
            if(indice<capasimagen-1 || (indice < capas.length && indice >= capasimagen))
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
            capasimagen = canvas.getLayerGroup("imagenes").length;

            if(indice>capasimagen || (indice >1 && indice != capasimagen))
            {  
                canvas.moveLayer(indice, indice - 1);
                actualizarLista();
                redibujarCanvas();
            }
            
        });

    }
    //De la lista se obtendrá el id del boton que fue
    //presionado y eliminará esta capa

    $(".lista-objetos .btn-danger").on("click", function(){
        canvas.removeLayer($(this).parents("tr:first-of-type").index());
        $(this).parent().remove();
        redibujarCanvas();
    });

    $("#dibujarTexto").on("click",function() {
        text = $("#texto").val();

        id = objetos.length;

        capas = canvas.getLayers().length;
        
        canvas.addLayer({
             draggable: true,
             name: id,
             index:capas,
             group: "texto",
             method: "drawText",
             fillStyle: "#9cf",
             strokeStyle: "#25a",
             strokeWidth: 2,
             data:{
                contenido: text
             },
             x: 20, y: 20,
             fromCenter: false,
             font: "36pt Verdana, sans-serif",
             text: text,
             background: "#000"
         });

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

