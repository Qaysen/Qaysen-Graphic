<?php 
	if(isset($_SESSION))
	{
		//Header("Location: index.php"); 
		echo 'No tienes session';
	}
	else
	{
		?>
		<html>
<head>
	<title>Panel de Administracion</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
</head>
<body>
    	<br><br>
		<h3>Bienvenido <?php echo $_SESSION['usuario']; ?></h3>
		<hr>
		<a href="logout.php"><button class="btn btn-danger"> Salir(Desconectarse)</button> </a>
		<hr>
</body>
</html>
		<?php
	}
?>
