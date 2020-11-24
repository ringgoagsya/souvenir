
<?php
require '../connect.php';

$tipe = $_GET["tipe"];		// Cari berdasarkan apa
$nilai = $_GET["nilai"];	// Isi yang dicari

/*
ISI TIPE:
	1 => Tujuan
	2 => Jalur yang dilewati
*/

if ($tipe == 1) {
	$querysearch	="SELECT angkot.id, angkot.destination, angkot.track, angkot.cost, angkot.number, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color FROM angkot left join angkot_color on angkot_color.id = angkot.id_color  where LOWER(angkot.destination) like LOWER('%$nilai%')";
} elseif ($tipe == 2) {
	$querysearch	="SELECT angkot.id, angkot.destination, angkot.track, angkot.cost, angkot.number, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color FROM angkot left join angkot_color on angkot_color.id = angkot.id_color  where LOWER(angkot.track) like LOWER('%$nilai%')";
} elseif ($tipe == 3) {
	$querysearch	="SELECT angkot.id, angkot.destination, angkot.track, angkot.cost, angkot.number, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color FROM angkot left join angkot_color on angkot_color.id = angkot.id_color  where angkot_color.id = $nilai";
} elseif ($tipe == 4) {
	$querysearch = "SELECT distinct angkot.id, angkot.number, angkot.destination, angkot.track, angkot.cost, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color FROM angkot JOIN angkot_color ON angkot.id_color=angkot_color.id JOIN 
		detail_souvenir ON detail_souvenir.id_angkot=angkot.id JOIN 
		souvenir ON detail_souvenir.id_souvenir=souvenir.id JOIN souvenir_type ON souvenir_type.id=souvenir.id_souvenir_type where 
		ST_distance_sphere(ST_Centroid(souvenir.geom),ST_Centroid (angkot.geom)) < 600
		and souvenir.id_souvenir_type = '$nilai'";
} elseif ($tipe == 5){
	$querysearch = "SELECT distinct angkot.id, angkot.destination, angkot.cost, angkot.number , angkot_color.color, angkot.track, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot.route_color FROM  room  left
JOIN detail_room ON room.id=detail_room.id_room left JOIN hotel ON detail_room.id_hotel=hotel.id left
JOIN detail_hotel ON hotel.id=detail_hotel.id_hotel left JOIN angkot ON detail_hotel.id_angkot=angkot.id  left join angkot_color on angkot_color.id = angkot.id_color where 
st_contains(ST_Centroid(hotel.geom),ST_centroid(angkot.geom)) < 200 and
room.name='$nilai' and room.price<=500000 limit 3";
} elseif ($tipe == 6){
	$querysearch = "SELECT distinct angkot.id, angkot.number, angkot.destination, angkot.track, angkot.cost, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color FROM culinary join detail_culinary on culinary.id=detail_culinary.id_culinary join culinary_place on detail_culinary.id_culinary=culinary.id join detail_culinary_place on culinary_place.id=detail_culinary_place.id_culinary_place join angkot on detail_culinary_place.id_angkot=angkot.id JOIN angkot_color ON angkot_color.id=angkot.id_color where ST_Distance_sphere(ST_centroid(culinary_place.geom),ST_Centroid(angkot.geom)) < 200 and culinary.name like '$nilai%'";
}elseif ($tipe == 7) {
	$querysearch = "SELECT distinct angkot.id, angkot.destination, angkot.track, angkot.cost, angkot.number, angkot.route_color, angkot.geom, ST_X(ST_Centroid(angkot.geom)) AS lon, ST_Y(ST_CENTROID(angkot.geom)) As lat, angkot_color.color FROM angkot left join angkot_color on angkot_color.id = angkot.id_color join detail_worship_place as dwp on angkot.id = dwp.id_angkot join worship_place on dwp.id_worship_place = worship_place.id join detail_event de on worship_place.id = de.id_worship_place join event on de.id_event = event.id where event.id = '$nilai'";
	# code...
}
 //  var_dump($querysearch);
 //  die();

$hasil=mysqli_query($conn, $querysearch);

while($baris = mysqli_fetch_array($hasil))
	{
		  $id=$baris['id'];
		  $destination=$baris['destination'];
		  $track=$baris['track'];
		  $cost=$baris['cost'];
		  $number=$baris['number'];
		  $color=$baris['color'];
		  $route_color=$baris['route_color'];
		  $lat=$baris['lat'];
          $lng=$baris['lon'];
		  $dataarray[]=array('id'=>$id,'destination'=>$destination,'track'=>$track,'cost'=>$cost, 'number'=>$number, 'color'=>$color, 'route_color'=>$route_color, 'lng'=>$lng, 'lat'=>$lat);
	}
echo json_encode ($dataarray);
?>
