<<<<<<< HEAD
<?
$dbhost="localhost"; 
$dbuser="root"; 
$dbpass="123456"; 
$db="memes";
=======
<?php
	$dbhost="localhost"; 
	$dbuser="root"; 
	$dbpass="123"; 

	$db="memes";

>>>>>>> 431d79986b0ce8ee10df5dd3eb2f0083f5255006
	$dbc=mysql_connect("$dbhost","$dbuser","$dbpass");
	mysql_select_db("$db"); 

?>