<?php
require '../connect.php';

$harga=$_GET['harga'];
$latit=$_GET["lat"];
$longi=$_GET["lng"];
$rad=$_GET["rad"]/1000;

	if($harga==1){
		$querysearch	="SELECT 
		small_industry.id,
		(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
		small_industry.name,
		small_industry.address,
		small_industry.cp,
		newtable.id_small_industry,
		newtable.price,
		ST_X(ST_CENTROID(small_industry.geom)) AS longitude,
		ST_Y(ST_CENTROID(small_industry.geom)) AS latitude,
		newtable.product_small_industry
	FROM
		(SELECT 
			detail_product_small_industry.id_small_industry,
				detail_product_small_industry.price,
				group_concat(product_small_industry.product, ', ') AS product_small_industry
		FROM
			detail_product_small_industry
		JOIN product_small_industry ON product_small_industry.id = detail_product_small_industry.id_product
		WHERE
			detail_product_small_industry.price < '100000'
		GROUP BY detail_product_small_industry.id_small_industry , detail_product_small_industry.price) AS newtable
			JOIN
		small_industry ON small_industry.id = newtable.id_small_industry
		HAVING jarak <= $rad";
		
	} else if($harga ==2){
		$querysearch	="SELECT 
		small_industry.id,
		(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
		small_industry.name,
		detail_product_small_industry.price AS price,
		ST_X(ST_CENTROID(small_industry.geom)) AS longitude,
		ST_Y(ST_CENTROID(small_industry.geom)) AS latitude
	FROM
		small_industry
			JOIN
		detail_product_small_industry ON small_industry.id = detail_product_small_industry.id_small_industry
	WHERE
		detail_product_small_industry.price >= '100000'
			AND detail_product_small_industry.price <= '500000'
	GROUP BY id
	HAVING jarak <= $rad";	
	
				
	} else {
		$querysearch	="SELECT 
		small_industry.id,
		(
			   6371 * acos (
				 cos ( radians('$latit') )
				 * cos( radians( ST_Y(ST_CENTROID(geom)) ) )
				 * cos( radians( ST_X(ST_CENTROID(geom)) ) - radians('$longi') )
				 + sin ( radians('$latit') )
				 * sin( radians( ST_Y(ST_CENTROID(geom)) ) )
			   )
			 ) AS jarak,
		small_industry.name,
		small_industry.address,
		small_industry.cp,
		newtable.id_small_industry,
		newtable.price,
		ST_X(ST_CENTROID(small_industry.geom)) AS longitude,
		ST_Y(ST_CENTROID(small_industry.geom)) AS latitude,
		newtable.product_small_industry
	FROM
		(SELECT 
			detail_product_small_industry.id_small_industry,
				detail_product_small_industry.price,
				group_concat(product_small_industry.product, ', ') AS product_small_industry
		FROM
			detail_product_small_industry
		JOIN product_small_industry ON product_small_industry.id = detail_product_small_industry.id_product
		WHERE
			detail_product_small_industry.price > '500000'
		GROUP BY detail_product_small_industry.id_small_industry , detail_product_small_industry.price) AS newtable
			JOIN
		small_industry ON small_industry.id = newtable.id_small_industry
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
