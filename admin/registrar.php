<?
include('../conexion.php'); 

// Validar que no hay campos vaciones,sino redireccionar ..
if(($_POST['nick'] == ' ') or ($_POST['pass'] == ' ') or ($_POST['pass1'] == ' ') )
{
	Header("Location: registro.php"); //redirecciona
}else{
	// Validar que las passwords se repiten ..
	if($_POST['pass'] != $_POST['pass1'])
	{
		echo 'Las passwords no son iguales';
	}else{

		//ELIMINAR el codigo malicioso de $_POST[nick] y $_POST[pass]
		$user = stripslashes($_POST["nick"]);
		$user = strip_tags($user);
		$pass = stripslashes($_POST["pass"]);
		$pass = strip_tags($pass);

		//Comprobar que el usurio no existe..
		$usuarios=mysql_query("SELECT nick FROM users WHERE nick='$user' ");
		if($user_ok=mysql_fetch_array($usuarios))
		{
			echo 'El usuario ya esta registrado';
			mysql_free_result($usuarios); // Liberar la memoria del query a la base de datos
		}else{
			//AGREGAR el nuevo registro en la tabla users
			mysql_query("INSERT INTO users (nick,pass) values ('$user','$pass')"); 
			echo 'Usuario registrado con éxito !'; 
		}

	}

} 
?>

