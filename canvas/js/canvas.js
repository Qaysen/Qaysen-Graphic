$(function() {
            //Lista de los objetos que están actualmente en canvas
            var objetos = [];
            canvas = $("#myCanvas");
            
            canvas.addLayer({
                method:"drawRect",
                name:"fondo",
                group:"imagenes",
                x:0,y:0,
                width:canvas.attr("width"),
                height:canvas.attr("height"),
                fromCenter: false,
                fillStyle: "#000",
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
                stop: function(event, ui) {
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

            //Se agrega un objeto a la lista de objetos, especificando
            //su nombre y su tipo
            function agregarObjeto (datos) {
                objetos.push(datos);
            }

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
                console.log(canvas.getLayers());
                
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
                    
                    filas += '</td><td><button class="btn-danger">Eliminar</button></td><td><a class="subir-capa">arriba<i class="icon-chevron-up"></i></a><a class="bajar-capa">bajar<i class="icon-chevron-down"></i></a></td></tr>';
                }

                $(".lista-objetos tbody").html(filas);
                
                $(".lista-objetos .btn-danger").on("click", function(){
                    fila = $(this).parents("tr:first");
                    indice = capas.length - fila.index()-1;

                    console.log(indice);
                    canvas.removeLayer(indice);
                    
                    actualizarLista();
                    redibujarCanvas();

                });

                $(".subir-capa").on("click",function(){
                    fila = $(this).parents("tr:first");
                    indice = capas.length - fila.index()-1;                
                    
                    
                    capa = canvas.getLayer(indice);
                    capasimagen = canvas.getLayerGroup("imagenes").length;
                    console.log(indice);
                    console.log(capasimagen)
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
                console.log("asd");
                canvas.removeLayer($(this).parents("tr:first-of-type").index());
                $(this).parent().remove();
                redibujarCanvas();
            });

            $("#dibujarTexto").on("click",function() {
                text = $("#texto").val();

                id = objetos.length;

                console.log(objetos);
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

            $(btnGen).on("click",function() {
                dataURL = $("canvas").getCanvasImage("png");
                //var dataURL = canvas.toDataURL("image/png");
                console.log(dataURL);
                document.getElementById('canvasImg').src = dataURL;

                $.post("save.php", {data: dataURL}, function(imagen) {
                    console.log(imagen);
                });
            });


        });

