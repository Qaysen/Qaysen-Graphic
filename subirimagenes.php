<?php 
	/*$max=1000000;
	$nombreclean=htmlspecialchars($email);
	$nuevodirectorio="$DOCUMENT_ROOT";
	mkdir($nuevodirectorio);
	$uploaddir="nuevodirectorio/";
	$filesize=$_FILE["upfile"]["size"];
	$filename=trim($_FILE["upfile"]["name"]);
	$filename=substr($filename,-20);
	$filename=eref_replace("","",$filename);
	$uploadfile=$uploaddir.$filename;
	move_uploaded_file($_FILES['upfile']['tmp_name'], $uploadfile)*/

	$conexion=mysql_connect("localhost","root","123")
	 or die("problemas de conexion");
	mysql_select_db("imagen",$conexion) or die("Prolemas en la seleccion");
	mysql_query("insert into imagenv001(nombre,categoria,ruta) values('$_POST[nombre]','$_POST[categoria]','0')",$conexion) or die("problemas" .mysql_error());
	mysql_close($conexion);
	echo "listo";
 ?>