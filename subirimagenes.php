<?php 

	include("resize.php");
	include('conexion.php');
	
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
		$thumb->show();						// show your thumbnail
		$rutaEnServidorThum='img_thumbs';
		$rutaDestinoThum=$rutaEnServidorThum.'/'.$nombreimagen;
		$thumb->save($rutaDestinoThum);				// save your thumbnail to file
	$res=mysql_query("insert into imagen(nombre,ruta,thumbs) values('$_POST[nombre]','".$rutaDestino."','".$rutaDestinoThum."')",$dbc) or die("problemas" .mysql_error());
	if ($res){

		echo 'inserción con exito';
	}
	else{
		echo 'no se puedo insertar';
	} 

	mysql_close($dbc);

 ?>

