<?php
include ('../../../connect.php');
$id = $_POST['id'];
$facility = $_POST['facility'];

$sqldel = "delete from detail_facility_culinary where id_culinary_place='$id'";

$delete = mysqli_query($conn,$sqldel);

$countl = count($facility);
if($countl > 0){
	$sqll   = "insert into detail_facility_culinary (id_culinary_place, id_facility) VALUES ";
	for( $i=0; $i < $countl; $i++ ){
	
		$sqll .= "('{$id}','{$facility[$i]}')";
		$sqll .= ",";
	}
		$sqll = rtrim($sqll,",");
		$insert = mysqli_query($conn,$sqll);
}

if (($insert||$countl==0) && $delete){
	echo 'ok';
	header("location:../?page=detailculinary&id=$id");
}
else{
	echo 'error';
	//header("location:../?page=detailculinary&id=$id");
}

?>