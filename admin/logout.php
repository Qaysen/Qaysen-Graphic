<?
include('../conexion.php'); 
session_destroy(); //DESTRUIR SESION..
Header("Location: index.php"); //VOLVER AL LOGIN..

?>