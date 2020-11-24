<?php
    include("../connect.php");
    $id_angkot = $_GET['id_angkot'];

    $result=  "SELECT detail_restaurant.id_restaurant, restaurant.name, st_x(st_centroid(restaurant.geom)) as lng2, st_y(st_centroid(restaurant.geom)) as lat2, detail_restaurant.lat, detail_restaurant.lng, detail_restaurant.description FROM detail_restaurant left join restaurant on restaurant.id = detail_restaurant.id_restaurant where id_angkot='$id_angkot' ";
    $rs = mysqli_query($conn, $result);
 //  var_dump($rs);
 //     die();
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}
    while($baris = mysqli_fetch_array($rs)){
        $id=$baris['id_restaurant'];
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