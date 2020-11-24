<?php
require '../connect.php';

$harga=$_GET['harga'];
$latit=$_GET["lat"];
$longi=$_GET["lng"];
$rad=$_GET["rad"]/1000;

	if($harga==1){
		$querysearch	="SELECT 
		souvenir.id,
		(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
		souvenir.name,
		souvenir.address,
		souvenir.cp,
		newtable.id_souvenir,
		newtable.price,
		ST_X(ST_CENTROID(souvenir.geom)) AS longitude,
		ST_Y(ST_CENTROID(souvenir.geom)) AS latitude,
		newtable.product_souvenir
	FROM
		(SELECT 
			detail_product_souvenir.id_souvenir,
				detail_product_souvenir.price,
				group_concat(product_souvenir.product, ', ') AS product_souvenir
		FROM
			detail_product_souvenir
		JOIN product_souvenir ON product_souvenir.id = detail_product_souvenir.id_product
		WHERE
			detail_product_souvenir.price < '20000'
		GROUP BY detail_product_souvenir.id_souvenir , detail_product_souvenir.price) AS newtable
			JOIN
		souvenir ON souvenir.id = newtable.id_souvenir
		HAVING jarak <= $rad";
		
	} else if($harga ==2){
		$querysearch	=" SELECT 
		souvenir.id,
		(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
		souvenir.name,
		detail_product_souvenir.price AS price,
		ST_X(ST_CENTROID(souvenir.geom)) AS longitude,
		ST_Y(ST_CENTROID(souvenir.geom)) AS latitude
	FROM
		souvenir
			JOIN
		detail_product_souvenir ON souvenir.id = detail_product_souvenir.id_souvenir
	WHERE
		detail_product_souvenir.price >= '20000'
			AND detail_product_souvenir.price <= '50000'
	GROUP BY id
	HAVING jarak <= $rad";
	
				
	} else {
		$querysearch	="SELECT 
		souvenir.id,
		(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
		souvenir.name,
		souvenir.address,
		souvenir.cp,
		newtable.id_souvenir,
		newtable.price,
		ST_X(ST_CENTROID(souvenir.geom)) AS longitude,
		ST_Y(ST_CENTROID(souvenir.geom)) AS latitude,
		newtable.product_souvenir
	FROM
		(SELECT 
			detail_product_souvenir.id_souvenir,
				detail_product_souvenir.price,
				group_concat(product_souvenir.product, ', ') AS product_souvenir
		FROM
			detail_product_souvenir
		JOIN product_souvenir ON product_souvenir.id = detail_product_souvenir.id_product
		WHERE
			detail_product_souvenir.price > '50000'
		GROUP BY detail_product_souvenir.id_souvenir , detail_product_souvenir.price) AS newtable
			JOIN
		souvenir ON souvenir.id = newtable.id_souvenir
		HAVING jarak <= $rad";		
		
	}
	 
$hasil=mysqli_query($conn, $querysearch);
while($row = mysqli_fetch_array($hasil))
	{
		  $id				=$row['id'];
		  $name				=$row['name'];
		  $price			=$row['price'];
		  $longitude		=$row['longitude'];
		  $latitude			=$row['latitude'];
		  
		$dataarray[]=array('id'=>$id,'name'=>$name,'price'=>$price, 'longitude'=>$longitude,'latitude'=>$latitude);
	}
echo json_encode ($dataarray);
?>
