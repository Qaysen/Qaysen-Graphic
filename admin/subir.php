<?php 

session_start();

if (!isset($_SESSION['usuario']))
{
	Header("Location: index.php");
}
else 
{
	if (isset($_POST['submit']))
	{
		include("resize.php");
		include('../conexion.php');

		$rutaEnServidor='img';
		$rutaTemporal=$_FILES['imagen']['tmp_name'];
		$nombreimagen=$_FILES['imagen']['name'];	

		$thumbsss='thumbs_';
		
		$rutaDestino=$rutaEnServidor.'/'.$nombreimagen;
		move_uploaded_file($rutaTemporal,$rutaDestino);
		//Creamos el thumbnail

			$thumb=new thumbnail($rutaDestino);			// generate image_file, set filename to resize
			//$thumb->size_width(90);				// set width for thumbnail, or
			//$thumb->size_height(90);				// set height for thumbnail, or
			$thumb->size(90);						// set the biggest width or height for thumbnail
			$thumb->jpeg_quality(70);				// [OPTIONAL] set quality for jpeg only (0 - 100) (worst - best), default = 75
			//$thumb->show();						// show your thumbnail
			$rutaEnServidorThum='img_thumbs';
			$rutaDestinoThum=$rutaEnServidorThum.'/'.$nombreimagen;
			$thumb->save($rutaDestinoThum);				// save your thumbnail to file

		$query=mysql_query("insert into imagen(nombre,ruta,thumbs) values('$_POST[nombre]','".$rutaDestino."','".$rutaDestinoThum."')",$dbc) or die("problemas" .mysql_error());
		if ($query){
			$resultado = '<p class="text-info"><b> Inserción con exito</b></p>';
		}
		else{
			$resultado = '<p class="text-error"><b> No se pueo insertar</b></p>';
		} 
		mysql_close($dbc);
	}
	else
	{
		$resultado = '';
	}
?>
<!DOCTYPE html>
<html lang='es'>
	<head>
		<title>Subir Imagen</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">	
		<style type="text/css">
		body {
			padding: 60px 0 0 0;
			margin: 0;
		}
		</style>	
	</head>
	<body>
		<div class="navbar navbar-inverse navbar-fixed-top">
	      	<div class="navbar-inner">
		        <div class="container">
		          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		          </button>
		          <a class="brand" href="./admin.php">Panel</a>
		          <div class="nav-collapse collapse">
		            <ul class="nav">
		              <li class="">
		                <a href="../">Sitio Web</a>
		              </li>
		              <li class="">
		                <a href="registro.php">Registrar usuario</a>
		              </li>
		              <li class="">
		                <a href="subir.php">Subir Imagenes</a>
		              </li>
		              <li class="">
		                <a href="logout.php">Salir</a>
		              </li>
		            </ul>
		          </div>
		        </div>
		    </div>
		</div>
		<div class="container">
			<div class="row">
				<div class="span8">
					<h3>Subir imagen :</h3>
					<hr>
					<form id="form1" class="form-horizontal" name="form1" method="post" action="subir.php" enctype="multipart/form-data">
						<div class="control-group">
							<label class="control-label" >Ingrese nombre :</label> 
							<div class="controls"><input type="text" size="25" name="nombre" placeholder="Nombre de imagen"></div>
						</div>
						<div class="control-group">
							<label class="control-label" >Elegir archivo :</label> 
							<div class="controls"><input name="imagen" type="file"/></div>
						</div>
						<div class="form-actions">
						<button type="submit" name="submit" class="btn btn-primary">Subir Imagen</button>
						</div>
					</form>
				</div>
				<div class="span4">
					<?php echo $resultado; ?>
				</div>
			</div>
			
		<p class="muted">Este es un proyecto de Qaysen - 2013</p>
		</div>		
	</body>
</html>
<?php
}
?>