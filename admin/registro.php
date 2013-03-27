<DOCTYPE! html>
<html lang='es'>
<head>
	<title>Registrar usuario</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">	
</head>
<body>

<?php 
include('../conexion.php');
if($_SESSION)
{
	include ('header.php');
	?>
	<br>
	<br>
	<h3>Registrar nuevo usuario :</h3>
	<hr>
	<form action="registro.php" method="POST">
	Nick: <input type="text" name="nick" size="30"><br>
	Password: <input type="password" name="pass" size="30" ><br>
	Repite Password: <input type="password" name="pass1" size="30" ><br>
	<input type="submit" name="submit" value="Registrar">
	</form>
	<?php
	if($_POST)
	{
		// Validar que no hay campos vaciones,sino redireccionar ..
		if(empty($_POST['nick']) or empty($_POST['pass']) or empty($_POST['pass1']) )
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
				$usuarios=mysql_query("SELECT nick FROM usuario WHERE nick='$user' ");
					if($user_ok=mysql_fetch_array($usuarios))
					{
						echo 'El usuario ya esta registrado';
						mysql_free_result($usuarios); // Liberar la memoria del query a la base de datos
					}else{
						//AGREGAR el nuevo registro en la tabla users
						mysql_query("INSERT INTO usuario (nick,pass) values ('$user','$pass')"); 
						echo 'Usuario registrado con éxito !'; 
					}
			}
		}
	}
}
else{
	Header("Location: index.php");
}

?>

</body>
</html>
