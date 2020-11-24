<!DOCTYPE html>
<html lang="en">
  
<head>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Website untuk pengembangan wisata Bukittinggi">
    <meta name="author" content="Ikhwan">
    <meta name="keyword" content="Tourism, SI Unand, Unand, Wisata">

    <title>Bukittinggi Local Transportation</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <!--external css-->
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="assets/css/zabuto_calendar.css">
    <link rel="stylesheet" type="text/css" href="assets/js/gritter/css/jquery.gritter.css" />
    <link rel="stylesheet" type="text/css" href="assets/lineicons/style.css">    
    
    <!-- Custom styles for this template -->
    <link href="assets/css/newStyle.css" rel="stylesheet">
    <link href="assets/css/style-responsive.css" rel="stylesheet">

    <!--  Slide -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <style>
    .mySlides {display:none}
    .w3-left, .w3-right, .w3-badge {cursor:pointer}
    .w3-badge {height:13px;width:13px;padding:0}

    .html5gallery img {
      width:470px !important;
      left: 0px !important;
    }
    .html5gallery-car-0 {
      margin-top:5px;
      width : 470px !important;
     
    }


    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
    <script src="assets/js/chart-master/Chart.js"></script>

    <script src="../config_public.js"></script>
    <script src="_new2.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANIx4N48kL_YEfp-fVeWmJ_3MSItIP8eI&callback=initMap"type="text/javascript"></script>
    <script type="text/javascript" src="html5gallery/html5gallery.js"></script>

    <!--LOADER-->
    <style>
    #loader {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 40px;
      margin: 5px;
      height: 40px;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
    
  </head>

  <body onload="init();data_angkot_rute('<?php echo @$_GET["idgallery"] ?>');">

   <section id="container" >
      <header class="header black-bg">
        <div class="sidebar-toggle-box">
          <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
        </div>
            <!--logo start-->
        <a href="index.php" class="logo"><b>WebGIS Local Transportation (26 1811523003 Hasya Rona Amirahmi)</b></a>
        <div class="top-menu">
          <ul class="nav pull-right top-menu">
            <li><div id="loader" style="display:none"></div></li>
            <li id="loader_text" style="margin-top:13px;display:none"><b>Loading</b></li>
          </ul>
        </div>
      </header>

      <aside>
          <div id="sidebar"  class="nav-collapse ">
              <ul class="sidebar-menu" id="nav-accordion">
              
                  <!--p class="centered"><a href="profile.html"><img src="assets/img/masjid.png" class="img-circle" width="90"></a></p-->
          
                  <li class="sub-menu">
                      <a href="index.php">
                          <i class="fa fa-arrow-left"></i>
                          <span>Back To Home</span>
                      </a>
                  </li> 

        </ul>
          </div>
      </aside>
      <section id="main-content">
      <section class="wrapper site-min-height">
          <div class="row mt">
            <div class="col-sm-6" id="infoo">
    <section class="panel">
      <header class="panel-heading">
                      <h2 class="box-title" style="text-transform:capitalize;"><b> Detail Information</b></h2>
                    </header>

                    <div class="panel-body">
                      <table id="table_tengah_info" class="table">
                        <tbody  style='vertical-align:top;'>
                          <?php
require '../connect.php';

require_once('assets/geoPHP/geoPHP.inc');
function wkb_to_json($wkb) {
    $geom = geoPHP::load($wkb,'wkb');
    return $geom->out('json');
}
// $id_angkot = $_GET['id_angkot'];
$sql = "select angkot.*, angkot_color.color , ST_ASWKB(angkot.geom) as wkb from angkot left join angkot_color on angkot.id_color = angkot_color.id where angkot.id = '$_GET[idgallery]'";
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
   echo "<tr><td style='text-align:left'>Destination</td><td>:</td><td style='text-align:left'> ".$row['destination']."</td></tr><tr><td style='text-align:left'>Track</td><td>:</td><td style='text-align:left'> ".$row['track']."</td></tr><tr><td style='text-align:left'>Cost</td><td>:</td><td style='text-align:left'> ".$row['cost']."</td></tr><tr><td style='text-align:left'>Color</td><td>:</td><td style='text-align:left'> ".$row['color']."</td></tr>";
 }


                    ?>
                        </tbody>          
                      </table>
                    
                </section>
                <section class="panel">
                    
                  </section>
                  
                 </div>
                 <div class="col-sm-6">
                <div class="row">
                  <div class="col-sm-12"> <!-- gallery -->
                    <section class="panel">
                        <div class="panel-body">
                            <a class="btn btn-compose" style="background-color:black;border-bottom:1px solid black;color:white">Gallery</a>
                            <div style="overflow-y: auto; overflow-x:auto; margin:15px; display:flex; justify-content:center">
                            <div class="html5gallery" style="max-height:700px; overflow:auto; display:block;" data-skin="horizontal" data-width="470" data-height="300" data-resizemode="fit"> 
                              <?php
                        require '../connect.php';

                        $id = $_GET["idgallery"];
                        if (strpos($id,"H") !== false) {  //Hotel

                          $querysearch  ="SELECT a.id, b.gallery_hotel FROM hotel as a left join hotel_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_hotel']=='-')||($baris['gallery_hotel']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_hotel']."'><img src='../_foto/".$baris['gallery_hotel']."'></a>";
                            }
                          }
                
                        } elseif (strpos($id,"tw") !== false) {  //Tourism

                          $querysearch  ="SELECT a.id, b.gallery_tourism FROM tourism as a left join tourism_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_tourism']=='-')||($baris['gallery_tourism']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_tourism']."'><img src='../_foto/".$baris['gallery_tourism']."'></a>";
                            }
                          }

                        } elseif (strpos($id,"M") !== false) {  //Worship

                          $querysearch  ="SELECT a.id, b.gallery_worship_place FROM worship_place as a left join worship_place_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_worship_place']=='-')||($baris['gallery_worship_place']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_worship_place']."'><img src='../_foto/".$baris['gallery_worship_place']."'></a>";
                            }
                          }

                        } elseif (strpos($id,"SO") !== false) {  //Souvenir

                          $querysearch  ="SELECT a.id, b.gallery_souvenir FROM souvenir as a left join souvenir_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_souvenir']=='-')||($baris['gallery_souvenir']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_souvenir']."'><img src='../_foto/".$baris['gallery_souvenir']."'></a>";
                            }
                          }

                        } elseif (strpos($id,"RM") !== false) {  //Kuliner

                          $querysearch  ="SELECT a.id, b.gallery_culinary FROM culinary_place as a left join culinary_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_culinary']=='-')||($baris['gallery_culinary']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_culinary']."'><img src='../_foto/".$baris['gallery_culinary']."'></a>";
                            }
                          }

                        } elseif (strpos($id,"IK") !== false) {  //Industry

                          $querysearch  ="SELECT a.id, b.gallery_industry FROM small_industry as a left join industry_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_industry']=='-')||($baris['gallery_industry']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_industry']."'><img src='../_foto/".$baris['gallery_industry']."'></a>";
                            }
                          }

                        } elseif (strpos($id,"R") !== false) {  //Restoran

                          $querysearch  ="SELECT a.id, b.gallery_restaurant FROM restaurant as a left join restaurant_gallery as b on a.id=b.id where a.id='$id' ";       
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_restaurant']=='-')||($baris['gallery_restaurant']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_restaurant']."'><img src='../_foto/".$baris['gallery_restaurant']."'></a>";
                            }
                          }

                        } else {  //Angkot

                          $querysearch  ="SELECT a.id, b.gallery_angkot FROM angkot as a left join angkot_gallery as b on a.id=b.id where a.id='$id' ";  
                          //echo "$querysearch";     
                          //echo "<script language='javascript'>alert('$querysearch');</script>";   
                          $hasil=mysqli_query($conn,$querysearch);
                          while($baris = mysqli_fetch_assoc($hasil)){
                            if(($baris['gallery_angkot']=='-')||($baris['gallery_angkot']=='')){
                              echo "<a href='../_foto/foto.jpg'><img src='../_foto/foto.jpg' ></a>";
                            }
                            else{
                              echo "<a href='../_foto/".$baris['gallery_angkot']."'><img src='../_foto/".$baris['gallery_angkot']."'><label>&nbsp</a>";
                            }
                          }

                        }


                    ?>
                  </div>
                            </div>
                        </div>
                    </section>
                    
                  </div>
                  <div class="col-sm-12"> <!-- peta -->
                    <div class="white-panel pns">

                              <header class="panel-heading" style="float:left">
                                <label style="color: black; margin-right:20px">Google Map with Location List</label>
                                <a class="btn btn-success" role="button" data-toggle="collapse" onclick="lokasimanual()" title=" Manual Position" ><i class="fa fa-location-arrow" style="color:white;"></i></a>
                                <a class="btn btn-success" role="button" data-toggle="collapse" onclick="posisisekarang()" title="Current Position"><i class="fa fa-map-marker" style="color:white;"></i></a>
                                <a class="btn btn-success" role="button" id="showlegenda" data-toggle="collapse" onclick="legenda()" title="Legend"><i class="fa fa-eye" style="color:white;"></i></a>
                              </header>
                              <div class="row">
                                 <div class="col-sm-4 col-xs-6"></div>
                               </div>                        
                               <div id="map" class="centered" style="height:260px">
                               </div>
                            </div>
                    
                    
                  </div>
                  
                </div>
                
              </div>
              
         
      </section>
      <footer class="site-footer">
          <div class="text-center">
              1311522013 - Ikhwan
              <a href="index.html#" class="go-top">
                  <i class="fa fa-angle-up"></i>
              </a>
          </div>
      </footer>
  </section>


    <!-- js placed at the end of the document so the pages load faster -->
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/jquery-1.8.3.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script class="include" type="text/javascript" src="assets/js/jquery.dcjqaccordion.2.7.js"></script>
  <script src="assets/js/fancybox/jquery.fancybox.js"></script>    
    <script src="assets/js/jquery.scrollTo.min.js"></script>
    <script src="assets/js/jquery.nicescroll.js" type="text/javascript"></script>
    <script src="assets/js/jquery.sparkline.js"></script>
    <script src="new.js" type="text/javascript"></script>
    <script src="assets/js/common-scripts.js"></script>
    
    <script type="text/javascript" src="assets/js/gritter/js/jquery.gritter.js"></script>
    <script type="text/javascript" src="assets/js/gritter-conf.js"></script>
  <script src="assets/js/advanced-form-components.js"></script>      
    <script type="text/javascript">
      $(function() {
        //    fancybox
          jQuery(".fancybox").fancybox();
      });

  </script>
  </body>
</html>
