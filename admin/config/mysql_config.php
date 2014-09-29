<?php
	//error_reporting(E_ALL);
	error_reporting(0); 
	$hostname = '127.0.0.1';
	$username = 'root';
	$password = '';
	try {
	    $dbh = new PDO("mysql:host=localhost;dbname=connectiveplus", $username, $password);
	    }
	catch(PDOException $e) {
	    echo $e->getMessage();
	    }
	
?>