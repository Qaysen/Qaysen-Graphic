<?php

$data = $_POST['data'];
$file = 'generados/'.md5($data) . '.png';

// remove "data:image/png;base64,"
$uri =  substr($data,strpos($data,",")+1);

// save to file
file_put_contents($file, base64_decode($uri));

// return the filename
echo $file;

?>