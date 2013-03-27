<html>
<head>
  <title></title>

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
</head>
<body>
	<table class="table table-striped  align="center>	
	<tr>
		<td>id</td>
		<td>nombre</td>
		<td>imagen</td>
		<td>opcion</td>
	</tr>	
<?php 
 include('conexion.php');

$query="SELECT * FROM imagen ORDER BY nombre DESC";
if($r=mysql_query($query,$dbc)){

	while($row=mysql_fetch_array($r)){

		$cont=0;
		echo "<tr>";
		echo "<td><form method='post' action='mostrartabla.php'>{$row['id']}</td> <td>  {$row['nombre']}</td> <td><img src='{$row['thumbs']}'></td> ";
		$d=$row['id'];
		
		echo	"<td><input type='hidden' value=$d name='clave'>";	
		echo "<input type='submit' class='btn'  value='eliminar'> </form></td></tr> "; 
		//"<p><h3><img sr={$row['ruta']}></h3>
	}
}
else{
	echo "no se ha hecho consula";
}


	 

	
//echo $id;
if($_POST)
{
	$id=$_POST['clave'];
	$sSQL="Delete From imagen Where id='$id'";
	mysql_query($sSQL);

	echo "se ha borrado el id:".$id;
	Header("Location: mostrartabla.php");
 }


mysql_close();
 ?>




 </table>
</body>
</html>
