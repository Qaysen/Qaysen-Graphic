<?
$dbhost="localhost"; 
$dbuser="root"; 
$dbpass="123456"; 
$db="meme";

mysql_connect("$dbhost","$dbuser","$dbpass");
mysql_select_db("$db"); 

//Comenzar la sesión
session_start(); 
?>