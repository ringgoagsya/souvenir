<?php
include ('../../../../connect.php');

$query = mysqli_query($conn,"SELECT MAX(id_jenis_oleh) AS id_jenis_oleh FROM jenis_oleh_oleh");
$result = mysqli_fetch_array($query);
$idmax = $result['id_jenis_oleh'];
if ($idmax==null) {$idmax=1;}
else {$idmax++;}
					
$jenis_oleh = $_POST['jenis_oleh'];


$count = count($jenis_oleh);
$sql  = "insert into jenis_oleh_oleh (id_jenis_oleh, jenis_oleh) VALUES ";
 
for( $i=0; $i < $count; $i++ ){
	$sql .= "('{$idmax}','{$jenis_oleh[$i]}')";
	$sql .= ",";
	$idmax++;
}
$sql = rtrim($sql,",");
$insert = mysqli_query($conn,$sql);

if ($insert){
	header("location:../?page=jenissouvenirs");
}else{
	echo 'error';
}
?>