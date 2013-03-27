<?PHP
    $id = $_POST["cat"];
    $ruta = $_POST["ruta"];

    include_once("conexion.php");

    mysql_query("INSERT INTO meme_generado(id_imagen,url_img_creado) 
        values('$id', '$ruta')",$dbc)  or die("problemas".mysql_error());

    echo mysql_insert_id($dbc);
    
    mysqli_close($dbc);  
?>