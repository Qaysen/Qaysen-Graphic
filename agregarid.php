<?PHP
    include_once("conexion.php");
    $faceid = $_POST["faceid"];
    $id = $_POST["id"];
    mysql_query("UPDATE meme_generado SET id_fb_pusblish = '$faceid' WHERE id='$id')"); 
?>