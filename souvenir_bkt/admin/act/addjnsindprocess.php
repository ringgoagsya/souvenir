<?php
include ('../../../connect.php');
$id = $_POST['id'];
$product = $_POST['product'];


$sql = "insert into product_small_industry (id, product) values ('$id', '$product')";
$hasil= mysqli_query($conn,$sql);


if ($sql){
	header("location:../?page=produkcraft");
}else{
	echo 'error';
}

?>