<?PHP
    include("ChromePhp.php");

    include_once("conexion.php");
    
    $id = $_POST["id"];
    $faceid = $_POST["faceid"];
    
    ChromePhp::log($id);
    ChromePhp::log($faceid);
    $query = "UPDATE meme_generado SET id_fb_publish='$faceid' WHERE id=$id";
    ChromePhp::log($query);
    mysql_query($query,$dbc) or die(mysql_error()); 

    mysql_close($dbc);  
?>