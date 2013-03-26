<!DOCTYPE html>
<html lang="es">
<head>
	<title>Autentificando ..</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
</head>
<body>
<?php
include('../conexion.php');

if( ($_POST['nick'] == ' ') or ($_POST['pass'] == ' ') )// VALIDAR CAMPOS VACIOS
{
	Header("Location: index.php"); // redirecciona
}else{
	// VERIFICAR SI EXISTE EL USUARIO EN LA BASE DE DATOS
	$usuarios=mysql_query("SELECT * FROM users WHERE nick='$_POST[nick]' and pass='$_POST[pass]' ");
	if($user_ok = mysql_fetch_array($usuarios)) // SI EXISTE USUARIO , INICIAR SESION
	{
		$_SESSION['usuario'] = $user_ok["nick"]; //ASIGANR EL NICK A USUARIO DE SESION
		$_SESSION['idusuario'] = $user_ok["id"]; //ASIGNAR EL ID DEL USUARIO A IDUSUARIO DE SESION
		Header("Location: index.php"); //REDIRIGE AL LOGIN
	}else{
		?>
		<br />
		<h2>Error de logueo </h2>
		<hr>
		<?php
		echo '<p class="text-error"><b>Nick y password incorrectos, verifica por favor..</b></p><p><a href="index.php">Volver al Login</a></p>';
	}

}
echo '<hr />';
include('footer.php'); 
?>	

</body>
</html>	

