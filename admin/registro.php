<?php 
include('../conexion.php');
?>
<form action="registrar.php" method="POST">
	Nick: <input type="text" name="nick" size="30"><br>
	Password: <input type="password" name="pass" size="30" ><br>
	Repite Password: <input type="password" name="pass1" size="30" ><br>
	<input type="submit" name="submit" value="Registrar">
</form>