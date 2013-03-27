		<html>
		<head>
		  <title></title>

		        <link rel="stylesheet" href="../css/bootstrap.min.css">
		        <link rel="stylesheet" href="../css/bootstrap-responsive.min.css">
		</head>
		<body>
		<?php 
			if($_POST)
			{
			  $id=$_POST['clave'];
			  $sSQL="DELETE FROM imagen WHERE id='$id'";
			  mysql_query($sSQL);

			  echo "se ha borrado el id:".$id;
			}else{	
			?>
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
									<form method='post' action='mostrartabla.php'>
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
											<?php $d=$row['id']; echo $d;?>
											<input type='hidden' value="<?php echo $d; ?>" name='clave'>	
											<input type='submit' class='btn' value='eliminar' /> 
										</td>
									</form>
								</tr> 
							<?php
						}
					}
					else{
					echo "no se ha hecho consula";
					}	
					?>
				</table>
			<?php
			}
			?>
		</body>
		</html>