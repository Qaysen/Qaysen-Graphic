<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <style>
            body {
                margin: 0px;
                padding: 0px;
            }
            #resize
            {
                width:600px;
                height: 600px;
            }

        </style>

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" type="text/css" href="css/facebook.css">
        <link rel="stylesheet" href="css/main.css">

        <link href="css/jquery-ui-1.10.2.custom.css" rel="stylesheet">

        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/jquery-ui-1.10.2.custom.min.js"></script>
        <script src="js/jcanvas.min.js"></script>
        <script src="js/canvas-una-imagen.js"></script>

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Logo -->
                            <button id="algo">
                        asd
                    </button>
        <header>
            <h1>Qaysen Graphic</h1>
        </header>

        <div class="container">

            <!-- Example row of columns -->
            <div class="row main">
                <div class="span4 herramientas">
                    <div class="agregar-texto">
                        <fieldset>
                            <legend>Agregar Texto</legend>
                            <input type="text" placeholder="Texto a agregar" id= "texto">
                            <button type="submit" class="btn" id= "dibujarTexto">Agregar texto</button>
                        </fieldset>
                    </div>
                    <br>
                    <div class="lista-objetos">
                        <legend>Lista de objetos</legend>
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Objeto</th>
                              <th>Accion</th>
                              <th>Capa</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                    </div>
                    <div class="compartir">
                        <legend>Compartelo con tus amigos</legend>
                        <div class="control-group">
                            <label class="control-label">Registrate en la app:</label>
                            <div class="controls">
                              <button class="uibutton confirm" id="login">Login</button>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Compartir por Facebook:</label>
                            <div class="controls">
                              <input class="uibutton confirm" type="submit" value="Compartir" id="compartir">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Publicar en el muro:</label>
                            <div class="controls">
                              <input class="genImagen uibutton confirm" type="submit" value="Publicar imagen" id="publicarImagen">
                            </div>
                        </div>
                        <div class="control-group">

                            <label class="control-label">Descargar:</label>
                            <div class="controls">
                              <a class="genImagen uibutton special" id="descargar">Descargar imagen</a>
                            </div>
                        </div>
                        <div id="publicarFB" style="opacity: 0"></div>
                    </div>
                </div>
                <div class="span8 canvas">
                    <div id="resize">
                        <canvas id="myCanvas" width="600" height="600"></canvas>
                    </div>
                </div>
            </div>

        </div> <!-- /container -->
        <div class="row imagenes uibutton-toolbar" id="explorador">
            <div class="mostrar-mas">

            </div>
            <div class="explorador" id="explorador">
                <ul>
                
                    <?php 

                    include('conexion.php');
                          
                            $query="SELECT * FROM imagen ORDER BY nombre DESC";
                            if($r=mysql_query($query,$dbc)){

                                while($row=mysql_fetch_array($r)){
    
                               echo   "<li><img id='{$row['nombre']}' value='{$row['id']}' src='{$row['thumbs']}' ></li>"; 
                   

                            }
                        }
                        else {
                            echo "no se ha hecho consula";
                        }
                        mysql_close();


                        ?>
                </ul>
            </div>
            <div class="categorias uibutton-toolbar">

            </div>
        </div>

        <script src="https://connect.facebook.net/en_US/all.js#appId=520023464714856&amp;xfbml=1"></script>
        <script type="text/javascript" src="js/facebook.js"></script> 
        <!--<script src="js/login.js"></script>
        <script src="js/compartir.js"></script>
        <script src="js/publicar-imagen.js"></script>-->

        <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>-->

        <script src="js/main.js"></script>
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

        <div id="url" hidden><div>
    </body>
</html>
