<?php
include ('../../../connect.php');

$id	= $_POST['id'];
$product = $_POST['product'];

$sql  = "update product_souvenir set product='$product' where id=$id";
$insert = mysqli_query($conn,$sql);

if ($insert){
	header("location:../?page=produksouvenir");
}else{
	echo 'error';
}
?>