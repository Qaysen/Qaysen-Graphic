<!DOCTYPE html>
<html lang="es">
<head>
	<title>Logearse</title>
	<meta charset="utf-8" />		
</head>
<body>
<?php
include('conexion.php');

if( ($_POST['nick'] == ' ') or ($_POST['pass'] == ' ') )// VALIDAR CAMPOS VACIOS
{
	Header("Location: login.php"); // redirecciona
}else{
	// VERIFICAR SI EXISTE EL USUARIO EN LA BASE DE DATOS
	$usuarios=mysql_query("SELECT * FROM usuario WHERE nick='$_POST[nick]' and pass='$_POST[pass]' ");
	if($user_ok = mysql_fetch_array($usuarios)) // SI EXISTE USUARIO , INICIAR SESION
	{
		$_SESSION['usuario'] = $user_ok["nick"]; //ASIGANR EL NICK A USUARIO DE SESION
		$_SESSION['idusuario'] = $user_ok["id"]; //ASIGNAR EL ID DEL USUARIO A IDUSUARIO DE SESION
		Header("Location: login.php"); //REDIRIGE AL LOGIN
	}else{
		echo 'Nick y pass incorrectos, verifica por favor..';
	}

}
include('footer.php'); 
?>	

</body>
</html>	

