<?php
include ('../../../../connect.php');

$query = mysqli_query($conn,"SELECT MAX(id_jenis_industri) AS id_jenis_industri FROM jenis_industri");
$result = mysqli_fetch_array($query);
$idmax = $result['id_jenis_industri'];
if ($idmax==null) {$idmax=1;}
else {$idmax++;}
					
$jenis_industri = $_POST['jenis_industri'];


$count = count($jenis_industri);
$sql  = "insert into jenis_industri (id_jenis_industri, nama_jenis_industri) VALUES ";
 
for( $i=0; $i < $count; $i++ ){
	$sql .= "('{$idmax}','{$jenis_industri[$i]}')";
	$sql .= ",";
	$idmax++;
}
$sql = rtrim($sql,",");
$insert = mysqli_query($conn,$sql);

if ($insert){
	header("location:../?page=jenis");
}else{
	echo 'error';
}
?>