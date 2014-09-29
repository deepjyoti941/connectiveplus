<?php
	//error_reporting(E_ALL);
	error_reporting(0); 
	$hostname = 'mysql.hostinger.in';
	$username = 'u997856950_roy';
	$password = 'lyZ6gE8tEM';
	try {
	    $dbh = new PDO("mysql:host=localhost;dbname=u997856950_cvp", $username, $password);
	    }
	catch(PDOException $e) {
	    echo $e->getMessage();
	    }
	
?>