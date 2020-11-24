<?php
require '../connect.php';
$tipe_ik = $_GET['tipe_ik'];
$latit=$_GET["lat"];
$longi=$_GET["lng"];
$rad=$_GET["rad"]/1000;
$querysearch	="SELECT 
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
small_industry.name AS nama,
small_industry.address,
small_industry.geom,
small_industry.id_industry_type,
industry_type.name,
ST_X(ST_CENTROID(small_industry.geom)) AS longitude,
ST_Y(ST_CENTROID(small_industry.geom)) AS latitude
FROM
small_industry
    JOIN
industry_type ON small_industry.id_industry_type = industry_type.id
WHERE
small_industry.id_industry_type = '$tipe_ik'
HAVING jarak <= $rad"; 

$hasil=mysqli_query($conn, $querysearch);
while($baris = mysqli_fetch_array($hasil))
	{
		$id=$baris['id'];
        $nama=$baris['nama'];
        $address=$baris['address'];
        $owner=$baris['owner'];
        $id_industry_type=$baris['id_industry_type'];
        $longitude=$baris['longitude'];
		$latitude=$baris['latitude'];
        $dataarray[]=array('id'=>$id,'id_industry_type'=>$id_industry_type,'nama'=>$nama,'address'=>$address, 'longitude'=>$longitude,'latitude'=>$latitude);
    }
echo json_encode ($dataarray);

?>