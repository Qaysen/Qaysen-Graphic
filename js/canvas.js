$(function() {

            //Datos iniciales del span8
            //ancho = $('.span8').width();
            //$('#myCanvas').width(ancho);

            //Lista de los objetos que están actualmente en canvas
            var objetos = [];
            numObjetos = 0;
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
            $("#resize").resizable({ 
                stop: function(event, ui) {
                    $("#myCanvas", this).each(function() { 
                        $(this).attr({ width: ui.size.width, height: ui.size.height });
                        redibujarCanvas();                    
                    });
                }
            });

            //Se agrega un objeto a la lista de objetos, especificando
            //su nombre y su tipo
            function agregarObjeto (tip,cont) {
                objetos.push({
                    contenido: cont,
                    tipo: tip
                });
            }

            $(".subirCapa").on("click",function(){
                indice = $(this).parent().attr("indice");
            });

            //Esto sucede al dar click en una imagen del explorador
            $("#explorador img").on("click", function(){
                //Se obtienen el numero de capas que se encuentran en el
                //grupo imagenes para posteriormente indicar que el index
                //de la imagen nueva sea igual al numero de capas, es decir
                //se ubicará por encima de las demas
                console.log(ancho);

                capasimagen = canvas.getLayerGroup("imagenes").length;

                id = objetos.length;
                var nombre = $(this).attr("id");

                agregarObjeto("imagen",nombre);

                canvas.addLayer({
                    draggable: true,
                    method: "drawImage",
                    index: capasimagen,
                    group: "imagenes",
                    name: id,
                    width: ancho, //Agregamos tamaños fijos para las imagenes que salen en el canvas
                    fromCenter: false,
                    source: $(this).attr("src"),
                    x: 0, y: 0,
                    load: function() {
                        $(this).drawLayer();
                    }
                });

                capas = canvas.getLayers();

                console.log(capas);

                redibujarCanvas();  
            });
            
            //De la lista se obtendrá el id del boton que fue
            //presionado y eliminará esta capa
            $("#lista button").on("click", function(){
                canvas.removeLayer($(this).attr("value"));
                redibujarCanvas();
            });

            $("#dibujarTexto").on("click",function() {
                text = $("#texto").val();

                agregarObjeto(text.substring(0,10),"texto");

                capas = canvas.getLayers().length;
                
                canvas.addLayer({
                     draggable: true,
                     name: text,
                     index:capas,
                     group: "texto",
                     method: "drawText",
                     fillStyle: "#9cf",
                     strokeStyle: "#25a",
                     strokeWidth: 2,
                     x: 20, y: 20,
                     fromCenter: false,
                     font: "36pt Verdana, sans-serif",
                     text: text,
                     background: "#000"
                 });

                redibujarCanvas();
             })

            /*$(btnGen).on("click",function() {
                dataURL = $("canvas").getCanvasImage("png");
                //var dataURL = canvas.toDataURL("image/png");
                console.log(dataURL);
                document.getElementById('canvasImg').src = dataURL;
            });*/
        });

