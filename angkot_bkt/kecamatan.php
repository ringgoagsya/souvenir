<?php
require '../connect.php';
// $querysearch="	SELECT json_array(fc) 
// 				FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
// 				FROM (SELECT 'Feature' As type , ST_AsGeoJSON(district.geom)::json As geometry , row_to_json((SELECT l 
// 				FROM (SELECT district.id, district.name,ST_X(ST_Centroid(district.geom)) AS lon, ST_Y(ST_CENTROID(district.geom)) As lat) As l )) As properties 
// 				FROM district As district  
// 				) As f ) As fc
// 			  ";

# Include required geoPHP library and define wkb_to_json function
require_once('assets/geoPHP/geoPHP.inc');
function wkb_to_json($wkb) {
    $geom = geoPHP::load($wkb,'wkb');
    return $geom->out('json');
}

# Build SQL SELECT statement and return the geometry as a WKB element
$sql = 'SELECT *, ST_ASWKB(geom) AS wkb FROM district';

# Try query or error
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
 
 # Loop through rows to build feature arrays
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