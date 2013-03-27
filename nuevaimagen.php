<?PHP
    include("ChromePhp.php");

    $id = $_POST["id"];
    $ruta = $_POST["url"];

    include_once("conexion.php");
    ChromePhp::log($id);
    ChromePhp::log($ruta);
    mysql_query("INSERT INTO meme_generado (id_imagen, url_img_creado) VALUES ('$id', '$ruta')",$dbc)  or die(mysql_error());
    
    echo mysql_insert_id($dbc);
    
    mysql_close($dbc);  
?>





