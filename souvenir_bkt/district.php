<?php
require '../connect.php';
$district_id = $_GET['district'];
$data = array();

$querysearch	= mysqli_query ($conn, "SELECT 
 souvenir.id, 
 souvenir.name,
 souvenir.geom,
 st_x(st_centroid(souvenir.geom)) as longitude, 
 st_y(st_centroid(souvenir.geom)) as latitude 
 from souvenir, district 
 WHERE st_contains(district.geom, st_centroid(souvenir.geom)) and district.id= '$district_id'"); 

while($baris = mysqli_fetch_array($querysearch))
{
	$id=$baris['id'];
        $name=$baris['name'];
        $longitude=$baris['longitude'];
		$latitude=$baris['latitude'];
        $tabel = 'sou';
        $data[]=array('id'=>$id,'name'=>$name, 'longitude'=>$longitude,'latitude'=>$latitude,'tabel'=>$tabel);
}

$querysearch2 = mysqli_query ($conn, "SELECT 
 small_industry.id, 
 small_industry.name,
 small_industry.geom,
 st_x(st_centroid(small_industry.geom)) as longitude, 
 st_y(st_centroid(small_industry.geom)) as latitude 
 from small_industry, district 
 WHERE st_contains(district.geom, st_centroid(small_industry.geom)) and district.id= '$district_id'"); 

while($baris = mysqli_fetch_array($querysearch2)){
	$id=$baris['id'];
        $name=$baris['name'];
        $longitude=$baris['longitude'];
		$latitude=$baris['latitude'];
        $tabel = 'sou';
        $data[]=array('id'=>$id,'name'=>$name, 'longitude'=>$longitude,'latitude'=>$latitude,'tabel'=>$tabel);
}

echo $_GET['jsoncallback'].''.json_encode($data).'';

?>