<?PHP
    $id = $_POST["id"];
    $ruta = $_POST["ruta"];

    include_once(conexion.php);

    mysqli_query($dbc,"INSERT INTO meme_generado (id_imagen,url_imagen_creado) VALUES
        ('$id', '$ruta')");

    echo mysqli_insert_id($dbc);
    
    mysqli_close($dbc);  
?>