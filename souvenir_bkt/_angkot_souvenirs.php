<?php
    include("../connect.php");
    $id = $_GET['id'];

    $result=  mysqli_query($conn, "SELECT detail_souvenir.id_souvenir,angkot.id,angkot.route_color as route_color,detail_souvenir.id_angkot,souvenir.name,souvenir.id,detail_souvenir.lat,detail_souvenir.lng,detail_souvenir.description, ST_X(ST_Centroid(souvenir.geom)) AS longitude, ST_Y(ST_CENTROID(souvenir.geom)) As latitude FROM detail_souvenir left join angkot on detail_souvenir.id_angkot=angkot.id left join souvenir on detail_souvenir.id_souvenir=souvenir.id where souvenir.id='$id' ");

        while($baris = mysqli_fetch_array($result))
            {
                $id_angkot=$baris['id_angkot'];
                $id=$baris['id'];
                $name=$baris['name'];
                $lat=$baris['lat'];
                $lng=$baris['lng'];
                $description=$baris['description'];
                $route_color=$baris['route_color'];
                $latitude=$baris['latitude'];
                $longitude=$baris['longitude'];
                $dataarray[]=array('id_angkot'=>$id_angkot,'id'=>$id,'id'=>$id,'name'=>$name,'lat'=>$lat,'lng'=>$lng,'description'=>$description,'route_color'=>$route_color,"latitude"=>$latitude,"longitude"=>$longitude);
            }
    $result1=  mysqli_query($conn, "SELECT detail_small_industry.id_small_industry,angkot.id,angkot.route_color,detail_small_industry.id_angkot,small_industry.name,small_industry.id,detail_small_industry.lat,detail_small_industry.lng,detail_small_industry.description, ST_X(ST_Centroid(small_industry.geom)) AS longitude, ST_Y(ST_CENTROID(small_industry.geom)) As latitude FROM detail_small_industry left join angkot on detail_small_industry.id_angkot=angkot.id left join small_industry on detail_small_industry.id_small_industry=small_industry.id where small_industry.id='$id' ");

        while($baris1 = mysqli_fetch_array($result1))
            {
                $id_angkot=$baris1['id_angkot'];
                $id=$baris1['id'];
                $id=$baris1['id'];
                $name=$baris1['name'];
                $lat=$baris1['lat'];
                $lng=$baris1['lng'];
                $description=$baris1['description'];
                $route_color=$baris1['route_color'];
                $latitude=$baris1['latitude'];
                $longitude=$baris1['longitude'];
                $dataarray[]=array('id_angkot'=>$id_angkot,'id'=>$id,'id'=>$id,'name'=>$name,'lat'=>$lat,'lng'=>$lng,'description'=>$description,'route_color'=>$route_color,"latitude"=>$latitude,"longitude"=>$longitude);
            }
            echo json_encode ($dataarray);
?>