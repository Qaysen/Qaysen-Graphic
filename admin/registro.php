<?php 
session_start();

if (!isset($_SESSION['usuario']))
{
	Header("Location: index.php"); 
}
else
{
	if(isset($_POST['submit']))
	{
		// Validar que no hay campos vacios,sino redireccionar ..
		if(empty($_POST['nick']) or empty($_POST['pass']) or empty($_POST['pass1']) )
		{
			Header("Location: registro.php"); //redirecciona
		}else{
			include('../conexion.php');
			// Validar que las passwords se repiten ..
			if($_POST['pass'] != $_POST['pass1'])
			{
				$resultado = '<p class="text-warning">Las passwords no son iguales</p>';
			}else{
				//ELIMINAR el codigo malicioso de $_POST[nick] y $_POST[pass]
				$user = stripslashes($_POST["nick"]);
				$user = strip_tags($user);
				$pass = stripslashes($_POST["pass"]);
				$pass = strip_tags($pass);

				//Comprobar que el usurio no existe..
				$queryBuscar = "SELECT * FROM usuario WHERE nick='".$user."' ";
				$usuarios=mysql_query($queryBuscar,$dbc);
				$user_ok=mysql_fetch_array($usuarios);
				if($user_ok)
				{
					$resultado = '<p class="text-error">El usuario ya esta registrado</p>';
					mysql_free_result($usuarios); // Liberar la memoria del query a la base de datos
				}else{
					//AGREGAR el nuevo registro en la tabla users
					mysql_query("INSERT INTO usuario (nick,pass) values ('$user','$pass')"); 
					$resultado = '<p class="text-info">Usuario registrado con éxito !</p>'; 
				}
			}
		}
	}
	else
	{
		$resultado = "";
	}
?>
<!DOCTYPE! html>
<html lang='es'>
	<head>
		<title>Registrar usuario</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">	
		<style type="text/css">
		body {
			margin: 0;
			padding: 60px 0 0 0;
		}
		</style>
	</head>
	<body>
		<?php 
			include('../conexion.php'); 
		?>
		<div class="navbar navbar-inverse navbar-fixed-top">
		     <div class="navbar-inner">
		        <div class="container">
		          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		          </button>
		          <a class="brand" href="./admin.php">Panel</a>
		          <div class="nav-collapse collapse">
		            <ul class="nav">
		              <li class="">
		                <a href="../">Sitio Web</a>
		              </li>
		              <li class="">
		                <a href="registro.php">Registrar usuario</a>
		              </li>
		              <li class="">
		                <a href="subir.php">Subir Imagenes</a>
		              </li>
		              <li class="">
		                <a href="logout.php">Salir</a>
		              </li>
		            </ul>
		          </div>
		        </div>
		    </div>
		</div>
		<div class="container">
			<div class="row">
				<h3>Registrar nuevo usuario :</h3>
				<hr>
				<div class="span8">
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
				  			<div class="form-actions">
				  				<button type="submit" name="submit"  class="btn btn-primary" > Registrar usuario </button>
				  			</div>
				  		</div>
					</form>
				</div>
				<div class="span4">
					<?php echo $resultado; ?>
				</div>
			</div>
			<p class="muted">Este es un proyecto de Qaysen - 2013</p>
		</div>
	</body>
</html>
<?php
}
?>


