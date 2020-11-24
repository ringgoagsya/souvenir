<?php 
include ('../../../connect.php');
$id = $_GET['id'];

$sql   = "DELETE from detail_product_souvenir where id_product='$id'";
$sql2   = "DELETE from product_souvenir where id='$id'";

$delete1 = mysqli_query($conn,$sql);
if ($delete1) 
{
	$delete2 = mysqli_query($conn,$sql2);
	echo "<script>alert ('Data Successfully Deleted');</script>";
}
else
{
	echo "<script>alert ('Error');</script>";
}

echo "<script>eval(\"parent.location='../?page=produksouvenir'\");</script>";
 ?>
