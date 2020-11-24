<?php
require '../connect.php';
$tipe_sou = $_GET['tipe_sou'];
$latit=$_GET["lat"];
$longi=$_GET["lng"];
$rad=$_GET["rad"]/1000;
$querysearch  ="SELECT 
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
souvenir.name AS nama,
souvenir.address,
souvenir.geom,
souvenir.id_souvenir_type,
souvenir_type.name,
ST_X(ST_CENTROID(souvenir.geom)) AS longitude,
ST_Y(ST_CENTROID(souvenir.geom)) AS latitude
FROM
souvenir
    JOIN
souvenir_type ON souvenir.id_souvenir_type = souvenir_type.id
WHERE
souvenir.id_souvenir_type = '$tipe_sou'
HAVING jarak <= $rad"; 

$hasil=mysqli_query($conn, $querysearch);
while($baris = mysqli_fetch_array($hasil))
  {
    $id=$baris['id'];
        $nama=$baris['nama'];
        $address=$baris['address'];
        $owner=$baris['owner'];
        $id_souvenir_type=$baris['id_souvenir_type'];
        $longitude=$baris['longitude'];
    $latitude=$baris['latitude'];
        $dataarray[]=array('id'=>$id,'id_souvenir_type'=>$id_souvenir_type,'nama'=>$nama,'address'=>$address, 'longitude'=>$longitude,'latitude'=>$latitude);
    }
echo json_encode ($dataarray);

?>