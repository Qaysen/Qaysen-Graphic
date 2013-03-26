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
if($_SESSION)
{
echo 'puedes ver esta página';

}else{
Header("Location: index.php"); 
}

?>