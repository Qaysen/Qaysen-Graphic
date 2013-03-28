<?php
	session_start();
	include('../conexion.php');
	if(empty($_POST['nick']) or empty($_POST['pass']) )// VALIDAR CAMPOS VACIOS
	{
		echo "Rellenar todos los cambos"; // redirecciona
	}else {
		// VERIFICAR SI EXISTE EL USUARIO EN LA BASE DE DATOS
		$usuarios=mysql_query("SELECT * FROM usuario WHERE nick='$_POST[nick]' and pass='$_POST[pass]' ");
		if($user_ok = mysql_fetch_array($usuarios)) // SI EXISTE USUARIO , INICIAR SESION
		{
			$_SESSION['usuario'] = $user_ok["nick"]; //ASIGANR EL NICK A USUARIO DE SESION
			$_SESSION['idusuario'] = $user_ok["id"]; //ASIGNAR EL ID DEL USUARIO A IDUSUARIO DE SESION
			Header("Location: admin.php"); //REDIRIGE AL LOGIN
		}else{
		echo "Error de logueo en base de datos..";
		}
	}
?>	
