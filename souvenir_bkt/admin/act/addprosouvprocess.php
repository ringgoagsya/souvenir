<?php
include ('../../../connect.php');
$id = $_POST['id'];
$product = $_POST['product'];


$sql = "insert into product_souvenir (id, product) values ('$id', '$product')";
$insert = mysqli_query($conn,$sql);


if ($sql){
	header("location:../?page=produksouvenir");
}else{
	echo 'error';
}

?>