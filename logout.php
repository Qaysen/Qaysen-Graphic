<?
include('conexion.php'); 
session_destroy(); //DESTRUIR SESION..
Header("Location: login.php"); //VOLVER AL LOGIN..

?>