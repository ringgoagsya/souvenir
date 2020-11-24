


<?php
include '../connect.php';
$id = $_GET['id'];


$querysearch	="SELECT souvenir.id,souvenir.name, souvenir.address, 
souvenir.cp, ST_X(ST_Centroid(souvenir.geom)) AS lng, ST_Y(ST_CENTROID(souvenir.geom)) 
As lat FROM souvenir where  id_souvenir_type ='d'";

$data = array();
			   
$hasil=mysqli_query($conn, $querysearch);
while($baris = mysqli_fetch_array($hasil))
	{
		$id=$baris['id'];
        $name=$baris['name'];
        $address=$baris['address'];
        $cp=$baris['cp'];
        
        $longitude=$baris['lng'];
		$latitude=$baris['lat'];
        $tabel = 'sou';
        if ($longitude != null){
            $dataarray[]=array('id'=>$id,'name'=>$name,'address'=>$address, 'lng'=>$longitude,'lat'=>$latitude,'tabel'=>$tabel);
        }
    }

echo json_encode ($dataarray);
?>