<?php
require '../../connect.php';

$nilai = $_GET["nilai"];	// Isi yang dicari
$table = $_GET["table"];	// TABLE
	$querysearch	="SELECT id, name, st_x(st_centroid(geom)) as lon, st_y(st_centroid(geom)) as lat from $table where  LOWER(name) like '%' || LOWER('$nilai') || '%'";
  
$hasil=pg_query($querysearch);
while($baris = pg_fetch_array($hasil))
	{
		  $id=$baris['id'];
		  $name=$baris['name'];
		  $lat=$baris['lat'];
		  $lng=$baris['lon'];
		  $dataarray[]=array('id'=>$id,'name'=>$name, 'lng'=>$lng, 'lat'=>$lat);
	}
echo json_encode ($dataarray);
?>
