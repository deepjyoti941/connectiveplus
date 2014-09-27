<?php 
require_once 'config/config.php';

	$query="SELECT al.id,al.title,al.content,al.image_link,al.video_link,ct.id AS category_id,ct.name FROM article_list AS al STRAIGHT_JOIN categories AS ct  
				WHERE al.category_id=ct.id
				ORDER BY al.id ASC";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$arr = array();
	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$arr[] = $row;	
		}
	}
	# JSON-encode the response
	$json_response = json_encode($arr);

	// # Return the response
	echo $json_response;
?>