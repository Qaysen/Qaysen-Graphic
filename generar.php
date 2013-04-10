<?PHP
	include("ChromePhp.php");

	$canvas = $_POST["canvas"];

	$url = $canvas["capa_imagen"]["url"];

	//ChromePhp::log($canvas.capas_imagen["url"]);
	//ChromePhp::log($canvas.capas_imagen.url);
	header('Content-type: image/jpeg');
	
	$capas_texto = $canvas["capas_texto"];
	$imagen = new Imagick("$url");
	//$capatexto = new Imagick();
	//$capatexto-> newImage($imagen->getImageWidth(),$imagen->getImageHeight(),"none");
	//$imagen->thumbnailImage(770, 0);
	foreach($capas_texto as $capa)
	{
		ChromePhp::log($capa);
		$draw = new ImagickDraw();

		$draw->setFont("Helvetica");
		$draw->setFontSize($capa["tam"]*1.3333333);
		$draw->setFillColor($capa["fill"]);
		$draw->setStrokeColor($capa["outline"]);
		$draw->setStrokeWidth($capa["stroke"]);

		$medidas = $imagen->queryFontMetrics($draw,$capa["contenido"]);
		$altura = $medidas["characterHeight"]*0.82;
				
		$imagen->annotateImage($draw, $capa["posx"], $capa["posy"]+$altura, 0, $capa["contenido"]);
	}
	// $capasombra = $capatexto->clone();
	// $capasombra->setImageBackgroundColor( new ImagickPixel( 'black' ) ); 
	// $capasombra-> shadowImage( 75, 2, 0, 0);
	// $capasombra->compositeImage( $capatexto, Imagick::COMPOSITE_OVER, 3, 3 );
	//$imagen->compositeImage( $capatexto, Imagick::COMPOSITE_OVER, -3, -3 ); 
	
	$ruta = 'generados/'.md5($imagen) . '.jpg';
	ChromePhp::log($imagen);
	$imagen->writeImage($ruta);
	echo $ruta;

?>