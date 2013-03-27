<?php 
session_start();
if (!isset($_SESSION['usuario'])) {
	Header("Location: index.php");
}else {
	?>
		<!DOCTYPE html>
		<html lang='es'>
		<head>
			<title>Subir Imagen</title>
			<meta charset="utf-8" />
			<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
			<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
		</head>
		<body>
		<?php include('header.php'); ?>
		<br /><br/><br />
		<form id="form1" name="form1" method="post" action="subir.php" enctype="multipart/form-data">
			Ingrese nombre : <input type="text" name="nombre"><br>
			Subir archivo : <input name="imagen" type="file"/><br>
			<input type="submit" value="enviar imagenes" style="margin-bottom:10px;"> 
		</form>
		<?php if ($_POST)
			{
					include("resize.php");
					include('../conexion.php');
			
					$rutaEnServidor='../img';
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
						$rutaEnServidorThum='../img_thumbs';
						$rutaDestinoThum=$rutaEnServidorThum.'/'.$nombreimagen;
						$thumb->save($rutaDestinoThum);				// save your thumbnail to file
					$res=mysql_query("insert into imagen(nombre,ruta,thumbs) values('$_POST[nombre]','".$rutaDestino."','".$rutaDestinoThum."')",$dbc) or die("problemas" .mysql_error());
					if ($res){
						echo '<p class="text-info"><b> Inserción con exito</b></p>';
					}
					else{
						echo '<p class="text-error"><b> No se pueo insertar</b></p>';
					} 
					mysql_close($dbc);
			}
		?>
		</body>
		</html>
	<?php
}

?>