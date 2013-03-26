<?
include('conexion.php');
if($_SESSION)
{
	echo 'puedes ver esta página';

}else{
	Header("Location: index.php"); 
}

?>