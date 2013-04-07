<?
session_start();
session_destroy(); //DESTRUIR SESION..
	Header("Location: index.php"); //VOLVER AL LOGIN..
?>