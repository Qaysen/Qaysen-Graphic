<?php 
if(!isset($_SESSION))
{
		?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<title>Login</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
	</head>
	<body>
		<div class="container">
			<h2>Loguearse : </h2>
			<hr>
			<form class='form-horizontal' action="autentificar.php" method="POST">
				<div class="control-group">
					<label class="control-label" >Username</label>
			    	<div class="controls">
			      		<input type="text" id="inputEmail" name="nick" placeholder="Nick de usuario">
			    	</div>
				</div>
				<div class="control-group">
			    	<label class="control-label" for="inputPassword">Contraseña</label>
			    	<div class="controls">
			     		<input type="password" id="inputPassword" name="pass" placeholder="Password">
			    	</div>
			  	</div>
			  	<div class="control-group">
			  		<div class="controls"><button type="submit" class="btn">Logearse</button></div>
			  	</div>
			</form>
			<hr>
			<p class="muted">Este es un proyecto de Qaysen - 2013</p>
		</div>
	</body>
</html>
		<?php
	}
	else
	{
		Header("Location: admin.php");
	}
?>


