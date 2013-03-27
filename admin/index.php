<?php 
session_start();
if (!isset($_SESSION['usuario'])) {
	?>
		<!DOCTYPE html>
		<html lang="es">
			<head>
				<title>Logearse</title>
				<meta charset="utf-8" />
				<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
				<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
			</head>
			<body>
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
						<?php include('footer.php'); ?>
			</body>
			</html>	
	<?php
}else {
	Header("Location: admin.php");
}
?>





