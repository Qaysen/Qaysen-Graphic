<?php 
session_start();
if (!isset($_SESSION['usuario'])) {
	Header("Location: index.php"); 
}else {
	if($_POST['eliminar']){
		include('../conexion.php');
		$id=$_POST['clave'];
		$sSQL="DELETE FROM imagen WHERE id='$id'";
		mysql_query($sSQL);
	}
	?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<title>Panel de Administracion</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
	</head>
	<body>
		<div class="container">
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
			<br><br>
			<h3>Bienvenido <?php printf($_SESSION['usuario']); ?></h3>

			<div class="row">
				<table class="table table-striped  align="center>	
					<tr>
						<td>id</td>
						<td>nombre</td>
						<td>imagen</td>
						<td>opcion</td>
					</tr>	
						<?php 
						include('../conexion.php');
						$query="SELECT * FROM imagen ORDER BY nombre DESC";
						if($r=mysql_query($query,$dbc)){
							while($row=mysql_fetch_array($r)){

								$cont=0;
								?>
								<tr>
									<form method='post' action='admin.php'>
										<td>
											<?php echo $row['id']; ?>
										</td>
										<td>
											<?php echo $row['nombre']; ?>
										</td> 
										<td>
											<img src="<?php echo $row['thumbs']; ?>">
										</td>
										<td>
											<input type='hidden' value="<?php echo $row['id']; ?>" name='clave'>	
											<input type='submit' name="eliminar" class='btn' value='eliminar' /> 
										</td>
									</form>
								</tr> 
							<?php
							}
						}
						?>
				</table>
			</div>
			<hr>
			<p class="muted">Este es un proyecto de Qaysen - 2013</p>
		</div>
	</body>
</html>
	<?php 
}
?>

