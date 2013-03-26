<!DOCTYPE html>
<html lang="es">
<head>
	<title>Logearse</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
</head>
<body>
<?
include('../conexion.php');
if(!isset($_SESSION['usuario']) ) // Existencia de la Sesión..
{ ?>
	<br />
	<h2>Loguearse : </h2>
	<hr>
	<form class='form-horizontal' action="autentificar.php" method="POST">
	<div class="control-group">
		<label class="control-label" >Nick</label>
    	<div class="controls">
      		<input type="text" id="inputEmail" name="nick" placeholder="Nick de usuario">
    	</div>
	</div>
	<div class="control-group">
    	<label class="control-label" for="inputPassword">Password</label>
    	<div class="controls">
     		<input type="password" id="inputPassword" name="pass" placeholder="Password">
    	</div>
  	</div>
  	<div class="control-group">
  		<div class="controls"><button type="submit" class="btn">Logearse</button></div>
  	</div>
	</form>
	<hr>
<?php
}else{
	//Si ya se encuentra logeado ..
	echo '<h3>Bienvenido '.$_SESSION['usuario'].'</h3>';
	echo '<hr>';
	echo '<a href="admin.php"><button class="btn btn-primary"> Ir al panel de Administración </button></a>'; 
	echo '<a href="logout.php"><button class="btn btn-danger"> Salir(Desconectarse)</button> </a>'; 
	echo '<hr>';
}
?>	
<?php 
include('footer.php')
 ?>
</body>
</html>	


