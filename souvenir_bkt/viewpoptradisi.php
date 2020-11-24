<?php
include '../connect.php';
$id = $_GET['id'];

$querysearch2 ="SELECT small_industry.id, small_industry.name, small_industry.address, small_industry.owner, ST_X(ST_Centroid(small_industry.geom)) AS lng, ST_Y(ST_CENTROID(small_industry.geom)) 
            As lat from small_industry where id_industry_type='c'";
               
$hasil2=mysqli_query($conn, $querysearch2);
while($baris = mysqli_fetch_array($hasil2))
    {
        $id=$baris['id'];
        $name=$baris['name'];
        $address=$baris['address'];
        $owner=$baris['owner'];
        
        $longitude=$baris['lng'];
        $latitude=$baris['lat'];
        $tabel = 'ik';
        if($longitude != null) {
            $dataarray[]=array('id'=>$id,'name'=>$name,'address'=>$address, 'lng'=>$longitude,'lat'=>$latitude,'tabel'=>$tabel);
        // $dataarray[]=array('id'=>$id,'name'=>$name,'address'=>$address, 'lng'=>$longitude,'lat'=>$latitude);
        }
    }

echo json_encode ($dataarray);
?>