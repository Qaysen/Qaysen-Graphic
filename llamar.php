<html>
<head>
	<title></title>
</head>
<body>
	<p>dasdsadas</p>
<?php 
 include('conexion.php');

$query="SELECT * FROM imagen ORDER BY nombre DESC";
if($r=mysql_query($query,$dbc)){

	while($row=mysql_fetch_array($r)){

		echo "<p><img src='{$row['thumbs']}'>"; 
		//"<p><h3><img sr={$row['ruta']}></h3>";
	}
}
else {
	echo "no se ha hecho consula";
}
mysql_close();
 ?>


</body>
</html>