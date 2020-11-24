<?php
    include("../connect.php");
    $id_angkot = $_GET['id_angkot'];

    $result=  "SELECT detail_worship_place.id_worship_place, worship_place.name, st_x(st_centroid(worship_place.geom)) as lng2, st_y(st_centroid(worship_place.geom)) as lat2, detail_worship_place.lat, detail_worship_place.lng, detail_worship_place.description FROM detail_worship_place left join worship_place on worship_place.id = detail_worship_place.id_worship_place where id_angkot='$id_angkot' ";
$rs = mysqli_query($conn, $result);
 //   var_dump($rs);
   //     die();
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}
        while($baris = mysqli_fetch_array($rs))
            {
                $id=$baris['id_worship_place'];
                $name=$baris['name'];
                $lat=$baris['lat'];
                $lng=$baris['lng'];
                $lat2=$baris['lat2'];
                $lng2=$baris['lng2'];
                $description=$baris['description'];
                $dataarray[]=array('id'=>$id,'name'=>$name,'lat'=>$lat,'lng'=>$lng,'lat2'=>$lat2,'lng2'=>$lng2,'description'=>$description);
            }
            echo json_encode ($dataarray);
?>