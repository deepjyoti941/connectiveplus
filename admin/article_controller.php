<?php 
	require_once 'config/mysql_config.php';
	require_once 'classes/class.upload.php';
	$data = json_decode(file_get_contents("php://input"));
	if ($_POST['method'] == 'save_data' && $_FILES) {

	   	$article_img = new Upload($_FILES['file']);
		if ($article_img->uploaded) {
		  $img_name_original = $_FILES['file']['name'];
		  $img_name = explode('.', $img_name_original);
		  $article_img->file_new_name_body = $img_name[0];
		  $article_img->image_resize = true;
		  $article_img->image_x = 200;
		  $article_img->image_y = 200;
		  $article_img->Process('../images/uploads/');
		  $article_img_original = '/images/uploads/'.$img_name_original;
		}
		if ($article_img->processed) {

			$sql = "INSERT INTO article_list (category_id, title, content, image_link, video_link) VALUES (:category_id,:title,:content,:image_link,:video_link)";

			$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$result = $sth->execute(array(':category_id' =>$_POST['category'],':title'=>$_POST['post_title'],':content'=>$_POST['post_content'], ':image_link'=>$article_img_original,':video_link'=>$_POST['video_link']));
			
	       if ($result == 1) {
	          $data = array(
	            "status" => true
	            );
	          echo json_encode($data);
	        } else {
	          $data = array(
	            "status" => false
	            );
	          echo json_encode($data);
	        }
	        $dbh = null;


		} else {
			echo "not processed";
		}



	}elseif ($_POST['method'] == 'save_data') {

		$sql = "INSERT INTO article_list (category_id, title, content, video_link) VALUES (:category_id,:title,:content,:video_link)";

		$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$result = $sth->execute(array(':category_id' =>$_POST['category'],':title'=>$_POST['post_title'],':content'=>$_POST['post_content'],':video_link'=>$_POST['video_link']));
		if ($result == 1) {
			$data = array(
				"status" => true
				);
			echo json_encode($data);
		} else {
			$data = array(
				"status" => false
				);
			echo json_encode($data);
		}

	}elseif ($_POST['method'] == 'update_data' && $_FILES) {

	   	$article_img = new Upload($_FILES['file']);
		if ($article_img->uploaded) {
		  $img_name_original = $_FILES['file']['name'];
		  $img_name = explode('.', $img_name_original);
		  $article_img->file_new_name_body = $img_name[0];
		  $article_img->image_resize = true;
		  $article_img->image_x = 200;
		  $article_img->image_y = 200;
		  $article_img->Process('../images/uploads/');
		  $article_img_original = '/images/uploads/'.$img_name_original;
		}
		if ($article_img->processed) {
			$sql = "UPDATE article_list SET category_id=:category_id, title=:title, content=:content, image_link=:image_link, video_link=:video_link WHERE id=:id";
			$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	        $result = $sth->execute(array(':category_id'=>$_POST['category_id'], ':title'=>$_POST['title'], ':content'=>$_POST['content'], ':video_link'=>$_POST['video_link'], ':image_link'=>$article_img_original, ':id'=>$_POST['article_id']));

		    if ($result == 1) {
		        $data = array(
		        	"article_image"=> $article_img_original,
		            "status" => true
		        );
		        echo json_encode($data);
		    } else {
		        $data = array(
		        	"status" => false
		        );
		          echo json_encode($data);
		    }
		    $dbh = null;


		} else {
			echo "not processed";
		}

	}elseif ($_POST['method'] == 'update_data') {

		$sql = "UPDATE article_list SET category_id=:category_id, title=:title, content=:content, video_link=:video_link WHERE id=:id";
		$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $result = $sth->execute(array(':category_id'=>$_POST['category_id'], ':title'=>$_POST['title'], ':content'=>$_POST['content'], ':video_link'=>$_POST['video_link'], ':id'=>$_POST['article_id']));

	    if ($result == 1) {
	        $data = array(
	            "status" => true
	        );
	        echo json_encode($data);
	    } else {
	        $data = array(
	        	"status" => false
	        );
	          echo json_encode($data);
	    }
	    $dbh = null;
		

	}elseif ($data->method == 'delete_article_by_id') {

		$sql = "DELETE FROM article_list WHERE id=:id";
		$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$result = $sth->execute(array(':id'=>$data->article_id));
		if ($result == 1) {
			$data = array(
				"status" => true,
				);
			echo json_encode($data);
		} else {
			$data = array(
				"status" => false
				);
			echo json_encode($data);
		}
	}elseif ($data->method == 'get_article_by_id') {
		$sql = "SELECT * FROM article_list WHERE category_id = $data->article_id";
		$stmt = $dbh->query($sql);
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($row);	
	}elseif ($data->method == 'article_by_id') {
		$sql = "SELECT * FROM article_list WHERE id = $data->article_id";
		$stmt = $dbh->query($sql);
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		echo json_encode($row);	
	}

?>