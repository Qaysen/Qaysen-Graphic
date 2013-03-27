<?php 
session_start();
if (!isset($_SESSION['usuario'])) {
	Header("Location: index.php"); 
}else {
	?>
	<html>
	<head>
		<title>Panel de Administracion</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
	</head>
	<body>
			<?php include('header.php'); ?>
			<br><br>
			<h3>Bienvenido <?php printf($_SESSION['usuario']); ?></h3>
			<hr>
			<a href="logout.php"><button class="btn btn-danger"> Salir(Desconectarse)</button> </a>
			<hr>
	</body>
	</html>
	<?php 
}
?>

