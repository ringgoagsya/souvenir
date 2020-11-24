<?php
require '../connect.php';
$status_sou = $_GET['status_sou'];
$latit=$_GET["lat"];
$longi=$_GET["lng"];
$rad=$_GET["rad"]/1000;
$querysearch	="SELECT 
souvenir.id,
(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
souvenir.name,
souvenir.address,
souvenir.geom,
souvenir.id_status,
status.status,
ST_X(ST_CENTROID(souvenir.geom)) AS longitude,
ST_Y(ST_CENTROID(souvenir.geom)) AS latitude
FROM
souvenir
    JOIN
status ON souvenir.id_status = status.id
WHERE
souvenir.id_status = '$status_sou'
HAVING jarak <= $rad"; 
$data = array();

$hasil=mysqli_query($conn, $querysearch);
while($baris = mysqli_fetch_array($hasil))
	{
		$id=$baris['id'];
        $name=$baris['name'];
        $address=$baris['address'];
        $owner=$baris['owner'];
        $id_status=$baris['id_status'];
        $longitude=$baris['longitude'];
		$latitude=$baris['latitude'];
        $tabel = 'sou';
        $dataarray[]=array('id'=>$id,'id_status'=>$id_status,'name'=>$name,'address'=>$address, 'longitude'=>$longitude,'latitude'=>$latitude,'tabel'=>$tabel);
    }


$querysearch2="SELECT 
small_industry.id,
(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
small_industry.name,
small_industry.address,
small_industry.geom,
small_industry.id_status,
status.status,
ST_X(ST_CENTROID(small_industry.geom)) AS longitude,
ST_Y(ST_CENTROID(small_industry.geom)) AS latitude
FROM
small_industry
    JOIN
status ON small_industry.id_status = status.id
WHERE
small_industry.id_status = '$status_sou'
HAVING jarak <= $rad"; 

$hasil2=mysqli_query($conn, $querysearch2);
while($baris = mysqli_fetch_array($hasil2))
    {
        $id=$baris['id'];
        $name=$baris['name'];
        $address=$baris['address'];
        $owner=$baris['owner'];
        $id_status=$baris['id_status'];
        $longitude=$baris['longitude'];
        $latitude=$baris['latitude'];
        $tabel = 'ik';
        $dataarray[]=array('id'=>$id,'id_status'=>$id_status,'name'=>$name,'address'=>$address, 'longitude'=>$longitude,'latitude'=>$latitude,'tabel'=>$tabel);
    }


echo json_encode ($dataarray);

?>