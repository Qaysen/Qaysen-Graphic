<!DOCTYPE html>
<html lang="es">
<head>
	<title>Logearse</title>
	<meta charset="utf-8" />		
</head>
<body>
	
</body>
</html>	

<?
include('conexion.php'); 
session_destroy(); //DESTRUIR SESION..
Header("Location: index.php"); //VOLVER AL LOGIN..

?>