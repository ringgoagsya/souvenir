<?php
include ('../../../connect.php');

$query = mysqli_query($conn,"SELECT MAX(id) AS id FROM facility_culinary");
$result = mysqli_fetch_array($query);
$idmax = $result['id'];
if ($idmax==null) {$idmax=1;}
else {$idmax++;}
					
$facility = $_POST['facility'];


$count = count($facility);
$sql  = "insert into facility_culinary (id, facility) VALUES ";
 
for( $i=0; $i < $count; $i++ ){
	$sql .= "('{$idmax}','{$facility[$i]}')";
	$sql .= ",";
	$idmax++;
}
$sql = rtrim($sql,",");
$insert =mysqli_query($conn,$sql);

if ($insert){
	header("location:../?page=fasculinary");
}else{
	echo 'error';
}
?>