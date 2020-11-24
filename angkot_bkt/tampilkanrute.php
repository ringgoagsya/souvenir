<?php
//require '../connect.php';
//$id_angkot=$_GET['id_angkot'];
//$querysearch="	SELECT row_to_json(fc) 
//				FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
//				FROM (SELECT 'Feature' As type , ST_AsGeoJSON(a.geom)::json As geometry , row_to_json((SELECT l 
//				FROM (SELECT a.id, a.destination,  a.track, a.cost, b.color, a.route_color, ST_X(ST_Centroid(a.geom)) AS longitude, ST_Y(ST_CENTROID(a.geom)) As latitude) As l )) As properties 
//				FROM angkot As a left join angkot_color as b on b.id=a.id_color
//				where a.id='$id_angkot'
//				) As f ) As fc 
//			  ";

// $hasil=mysql_query($conn, $querysearch);
// while($data=mysql_fetch_array($hasil))
//	{
//		$load=$data['row_to_json'];
//	}
//	echo $load;
// ?>

<?php
require '../connect.php';

require_once('assets/geoPHP/geoPHP.inc');
function wkb_to_json($wkb) {
    $geom = geoPHP::load($wkb,'wkb');
    return $geom->out('json');
}
// $id_angkot = $_GET['id_angkot'];
$sql = "select angkot.*, angkot_color.color , ST_ASWKB(angkot.geom) as wkb, angkot_gallery.gallery_angkot from angkot left join angkot_color on angkot.id_color = angkot_color.id left join angkot_gallery on angkot.id=angkot_gallery.id where angkot.id = '$_GET[id_angkot]' limit 1 ";
// var_dump($sql);
// die();
$rs = mysqli_query($conn, $sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
	'type'      => 'FeatureCollection',
	'features'  => array()
 );

while ($row = mysqli_fetch_assoc($rs)) {
	 $properties = $row;
	 # Remove wkb and geometry fields from properties
	 unset($properties['wkb']);
	 unset($properties['geom']);
	 $feature = array(
		  'type' => 'Feature',
		  'geometry' => json_decode(wkb_to_json($row['wkb'])),
		  'properties' => $properties
	 );
	 # Add feature arrays to feature collection array
	 array_push($geojson['features'], $feature);
 }

//  print_r($geojson);

echo(json_encode($geojson));

// $hasil=mysqli_query($conn, $querysearch);
// // var_dump($hasil);
// // die();
// while($data=mysqli_fetch_array($hasil))
// 	{
// 		$load=$data['row_to_json'];
// 	}
// 	echo $load;
?>