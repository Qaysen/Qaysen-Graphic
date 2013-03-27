<?php 
	session_start();
	if (!isset($_SESSION['usuario'])) {
		Header("Location: index.php"); 
	}else {
?>
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
			include ('header.php');
		?>
		<br>
		<br>
		<h3>Registrar nuevo usuario :</h3>
		<hr>
		<form class="form-horizontal" action="registro.php" method="POST">
			<div class="control-group">
	   			<label class="control-label" >Nick</label>
	  			<div class="controls">
	    			<input type="text" name="nick" size="30" placeholder="usuario">
	    		</div>
	 		</div>
	 		<div class="control-group">
	   			<label class="control-label" for="inputPassword">Password</label>
	   			<div class="controls">
	     			<input type="password" id="inputPassword" name="pass" size="30" placeholder="Password">
	   			</div>
	  		</div>
	 		<div class="control-group">
	   			<label class="control-label" for="inputPassword">Repite Password</label>
	   			<div class="controls">
	     			<input type="password" id="inputPassword" name="pass1" size="30" placeholder="Repite el Password">
	   			</div>
	  		</div>
	  		<div class="control-group">
	  			<div class="controls">
	  				<input type="submit" name="submit"  class="btn" value="Registrar">
	  			</div>
	  		</div>
		</form>
		<?php
		if($_POST)
		{
			// Validar que no hay campos vacios,sino redireccionar ..
			if(empty($_POST['nick']) or empty($_POST['pass']) or empty($_POST['pass1']) )
			{
				Header("Location: registro.php"); //redirecciona
			}else{
				// Validar que las passwords se repiten ..
				if($_POST['pass'] != $_POST['pass1'])
				{
					echo '<p class="text-warning">Las passwords no son iguales</p>';
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
							echo '<p class="text-error">El usuario ya esta registrado</p>';
							mysql_free_result($usuarios); // Liberar la memoria del query a la base de datos
						}else{
							//AGREGAR el nuevo registro en la tabla users
							mysql_query("INSERT INTO usuario (nick,pass) values ('$user','$pass')"); 
							echo '<p class="text-info">Usuario registrado con éxito !</p>'; 
						}
				}
			}
		}
		?>
		</body>
		</html>
		<?php
	}
?>


