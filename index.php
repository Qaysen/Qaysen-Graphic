<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Don Meme | Crea los memes mas originales de la Web</title>
        <meta name="description" content="Con Don Meme crea los memes mas originales y graciosos de la red.">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="css/facebook.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Contenedor de la app -->
        <div class="container">

            <!-- El grid fluido para utilizar -->
            <div class="row-fluid main">

                <!-- Sidebar -->
                <div class="span4">
                    <!-- Logo -->
                    <header class="logo">
                        <h1>Don Meme</h1>
                    </header>

                    <!-- Pruebas1 -->
                    <button id="prueba1">Prueba1</button>

                    <!-- Herramientas -->
                    <div class="herramienta">
                        <fieldset>
                            <legend>Agregar Texto</legend>
                            <input type="text" placeholder="Ingresar texto" id="texto" >
                            <button type="submit" class="uibutton">Agregar texto</button>
                        </fieldset>
                    </div>

                    <!-- Lista de objetos -->
                    <div class="lista">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Texto</th>
                              <th><img src="img/aumentar-texto.png" alt="Aa"></th>
                              <th><img src="img/layers.png" alt="Capas"></th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                    </div>
                </div>

                <!-- Generar Imagen -->
                <div class="span8">

                    <!-- Compartir con redes sociales -->
                    <aside class="uibutton-toolbar">
                        <a class="uibutton confirm" id="login">Login</a>
                        <a class="uibutton confirm genImagen" id="compartir">Compartir</a>
                        <a class="uibutton confirm genImagen" id="publicarImagen">Publicar imagen en tu Muro</a>
                        <a class="uibutton special genImagen" id="descargar">Descargar</a>
                    </aside>

                    <!-- Canvas -->
                    <canvas id="myCanvas" width="600" height="600"></canvas>

                    <!-- Imagenes de fondo para elegir -->
                    <section class="imagenes">

                        <!-- Header de carusel de Imagenes -->
                        <header>
                            <h3>
                                <img src="http://www.facebook.com/images/profile/timeline/app_icons/photos_24.png">
                                <span>Imagenes de Fondo</span>
                            </h3>
                            <div class="boton">
                                <a class="uibutton icon add">Ocultar</a>
                            </div>
                        </header>

                        <!-- Carusel de imagenes -->
                        <div class="mImagenes">
                            <div class="acomodarImagenes">
                                <div class="todasImagenes">
                                    <a class="controles">
                                        <div class="opaco"></div>
                                        <i class="adelante sp_eiocyo sx_ab8d38"></i>
                                    </a>
                                    <a class="controles1">
                                        <div class="opaco1"></div>
                                        <i class="atras sp_eiocyo sx_1caf2a"></i>
                                    </a>
                                    <div class="xImagen" id="explorador">
                                        <ul class="listasImagenes">
                                            <?php 
                                            include('conexion.php');
                                            $query="SELECT * FROM imagen ORDER BY nombre DESC";
                                            if($r=mysql_query($query,$dbc)){
                                            while($row=mysql_fetch_array($r)){
                                                ?>
                                            <li class="liImagen">
                                                <a class="liaImagen">
                                                    <img class="img" height="95" id="<?php echo $row['nombre']; ?>" value='<?php echo $row['id']; ?>' src="<?php echo $row['thumbs']; ?>" width="95" alt="">
                                                </a>
                                                <div class="lidivtitulo">
                                                    <a class="divatitulo" ><?php echo $row['nombre']; ?></a>
                                                </div>
                                            </li>
                                                <?php
                                                }
                                            }
                                            else {
                                                echo "no se ha hecho consula";
                                            }
                                                mysql_close();
                                            ?>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div> <!-- /container -->

        <div id="url" hidden><div>

        <script src="js/vendor/jquery-1.9.1.min.js"></script>
        <script src="js/jcanvas.min.js"></script>
        <script src="https://connect.facebook.net/en_US/all.js#appId=520023464714856&amp;xfbml=1"></script>
        <script src="js/facebook.js"></script>
        <script src="js/canvas-optimizado.js"></script>
        <script src="js/main.js"></script>

        

        <div id="fb-root"></div>
        <script type="text/javascript">
            (function(d, debug){
               var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement('script'); js.id = id; js.async = true;
               js.src = "//connect.facebook.net/es_LA/all" + (debug ? "/debug" : "") + ".js";
               ref.parentNode.insertBefore(js, ref);
             }(document, /*debug*/ false));
        </script>
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
