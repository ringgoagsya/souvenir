<?php
    include("../connect.php");
    $nama_kulineri = $_GET['nama_kulineri'];
    $alamat_kulineri = $_GET['alamat_kulineri'];
    $result=  "SELECT angkot.id, angkot.destination, angkot.track, angkot.cost, angkot.number, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color from tourism  
    join detail_tourism on tourism.id=detail_tourism.id_tourism join angkot on detail_tourism.id_angkot=angkot.id
    join detail_culinary_place on angkot.id = detail_culinary_place.id_angkot
    join culinary_place on  detail_culinary_place.id_culinary_place=culinary_place.id 
    join detail_culinary on culinary_place.id=detail_culinary.id_culinary_place 
    join angkot_color on angkot.id_color = angkot_color.id
    join culinary on detail_culinary.id_culinary=culinary.id where culinary.name like '%$nama_kulineri%' and culinary_place.address like '%$alamat_kulineri%'";
     
 // $rst = mysqli_query($conn, $result);
  $wow = mysqli_query($conn, $result);
     
      $dataarray = [];
      while($row = mysqli_fetch_array($wow))
      {
        $id=$row['id'];
        $name=$row['name'];
        $address=$row['address'];
        $capacity=$row['capacity'];
        $longitude=$row['longitude'];
        $latitude=$row['latitude'];
        $dataarray[]=array('id'=>$id,'name'=>$name, 'address'=>$address, 'capacity'=>$capacity, 'longitude'=>$longitude,'latitude'=>$latitude);
      }
      echo json_encode ($dataarray);
  //var_dump($rs);
  //die();
// if (!$rst) {
//     echo 'An SQL error occured.\n';
//     exit;
// }
// die($rst);
 // die(mysqli_fetch_object($rst));
 // $dataarray= [];
 //    while($baris = mysqli_fetch_array($rst)){
 //        $id=$baris['id_culinary_place'];
 //        $name=$baris['name'];
 //        $lat=$baris['lat'];
 //        $lng=$baris['lng'];
 //        $lat2=$baris['lat2'];
 //        $lng2=$baris['lng2'];
 //        $description=$baris['description'];
 //        $dataarray[]=array('id'=>$id,'name'=>$name,'lat'=>$lat,'lng'=>$lng,'lat2'=>$lat2,'lng2'=>$lng2,'description'=>$description);
 //    }
 //    echo json_encode ($dataarray);
?>