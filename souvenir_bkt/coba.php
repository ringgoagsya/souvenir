<?php
require_once __DIR__ . '/goole/getdata.php';
 
 class User{

 	function tampil(){
 		$GA = new GA;
 		$GA -> pengunjung();
 		echo $GA;
 	}
 }
 $User =new User;
 $User -> tampil();
?>

