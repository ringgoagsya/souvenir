<?php
require '../connect.php';

$cari = $_GET["cari"];

$querysearch	="SELECT tourism.id, tourism.name, tourism.address, tourism.open, tourism.close, tourism.ticket, tourism_type.name as tourism_type, st_x(st_centroid(tourism.geom)) as lon, st_y(st_centroid(tourism.geom)) as lat from tourism left join tourism_type on tourism_type.id=tourism.id_type where tourism.id ='$cari'";			   
$hasil=mysqli_query($conn, $querysearch);
while($baris = mysqli_fetch_array($hasil)){
	  $id=$baris['id'];
	  $name=$baris['name'];
	  $address=$baris['address'];
	  $open=$baris['open'];
	  $close=$baris['close'];
	  $ticket=$baris['ticket'];
	  $tourism_type=$baris['tourism_type'];
	  $longitude=$baris['lon'];
	  $latitude=$baris['lat'];
	  $dataarray[]=array('id'=>$id,'name'=>$name,'address'=>$address,'open'=>$open, 'close'=>$close,'ticket'=>$ticket,'tourism_type'=>$tourism_type,'longitude'=>$longitude,'latitude'=>$latitude);
}



    $arr=array("data"=>$dataarray);
    echo json_encode($arr);

//echo json_encode ($dataarray);
?>
