<?php
    include("../connect.php");
    $tipe = $_GET['tipe'];
    $nilai = $_GET['nilai'];
/*    $result=  "SELECT angkot.id, angkot.destination, angkot.track, angkot.cost, angkot.number, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color from tourism  
    join detail_tourism on tourism.id=detail_tourism.id_tourism join angkot on detail_tourism.id_angkot=angkot.id
    join detail_culinary_place on angkot.id = detail_culinary_place.id_angkot
    join culinary_place on  detail_culinary_place.id_culinary_place=culinary_place.id 
    join detail_culinary on culinary_place.id=detail_culinary.id_culinary_place 
    join angkot_color on angkot.id_color = angkot_color.id
    join culinary on detail_culinary.id_culinary=culinary.id where culinary.name like '%$nama_kulineri%' and
    culinary_place.address like '%$alamat_kulineri%'";
    */  
    $result =" SELECT distinct angkot.id, angkot.number, angkot.destination, angkot.track, angkot.cost, angkot_color.color FROM angkot JOIN angkot_color ON angkot.id_color=angkot_color.id JOIN 
    detail_souvenir ON detail_souvenir.id_angkot=angkot.id JOIN 
    souvenir ON detail_souvenir.id_souvenir=souvenir.id JOIN souvenir_type ON souvenir_type.id=souvenir.id_souvenir_type where 
    ST_distance_sphere(ST_Centroid(souvenir.geom),ST_Centroid (angkot.geom)) < 600
    and souvenir.id_souvenir_type = '$nilai'";

  $wow = mysqli_query($conn, $result);
  //var_dump($wow);
  //die();
      $dataarray = [];
      while($row = mysqli_fetch_array($wow))
      {
        $id_angkot=$row['id'];
        $number=$row['number'];
        $destination=$row['destination'];
        $track=$row['track'];
        $number=$row['number'];
        $route_color=$row['route_color'];
        $cost=$row['cost'];
        $lon=$row['lon'];
        $lat=$row['lat'];
        $dataarray[]=array('id'=>$id_angkot,'number'=>$number, 'destination'=>$destination, 'track'=>$track,'number'=>$number,'route_color'=>$route_color,'cost'=>$cost,'lon'=>$lon,'lat'=>$lat);
      }
      echo json_encode ($dataarray);
 
?>