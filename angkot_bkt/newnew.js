var map;
//        var server = "http://156.67.221.207/angkot_bkt/";
        var server = "http://localhost/Souvenir_/angkot_bkt/";
        var cekRadiusStatus = "off";   //RADIUS
        var circles = []; //RADIUS
        var rad; //RADIUS
        var rute = [];  //NAVIGASI
        var directionsDisplay;  //NAVIGASI

        var markers = []; //MARKER UNTUK POSISI SAAT INI
        var pos ='null'; //lat & lng POSISI SAAT INI
        var centerLokasi; //lat & lng POSISI SAAT INI

        var infowindow; //JENDELA INFO
        var infoDua=[]; //HIMPUNAN JENDELA INFO
        var markersDua = []; //HIMPUNAN MARKER
        var markersManual = []; //HIMPUNAN MARKER
        
        var info_landmark=[]; //HIMPUNAN JENDELA INFO 
        var markers_landmark = []; //HIMPUNAN MARKER

        var centerBaru; //POSISI MAP
        var ja;
        var angkot = [];

        var rekom_object=0;
        var jumlah_tw = 0;

        var latitude=0;
        var longitude=0;
        var rad_lat=0;
        var rad_lng=0;

        //tracking angkot
        var marker_1 = []; //MARKER UNTUK POSISI SAAT INI
        var marker_2 = []; //MARKER UNTUK POSISI SAAT INI
        var route_awal = ""; 
        var route_tujuan = "";
        var awal = 0;
        var tujuan = 0;

        //tracking
        var directionsDisplay;
        var rute = [];

        function init(){
              basemap();
              kecamatanTampil();
          }

        function basemap(){   // GOOGLE MAP
          map = new google.maps.Map(document.getElementById('map'), 
              {
                zoom: 13,
                center: new google.maps.LatLng(-0.3051596, 100.3673319),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }
        
        function kecamatanTampil(){   // PENAMPILAN PEMBAGIAN KECAMATAN DI BUKITTINGGI
          kecamatan = new google.maps.Data();
          kecamatan.loadGeoJson(server+'kecamatan.php');
          kecamatan.setStyle(function(feature)
          {
            var gid = feature.getProperty('id');
            if (gid == 'K001'){ 
              return({
                fillColor:'#ff3300',
                strokeWeight:0.5,
                strokeColor:'#ff3300',
                fillOpacity:0.3,
                clickable: false
              }); 
          }
            else if(gid == 'K002'){
              return({
                fillColor:'#ffd777',
                strokeWeight:0.5,
                strokeColor:'#ffd777',
                fillOpacity:0.3,
                clickable: false
              });
          }
            else if(gid == 'K003'){
              return({
                fillColor:'#00b300' ,
                strokeWeight:0.5,
                strokeColor:'#00b300' ,
                fillOpacity:0.3,
                clickable: false
              });

          }
          });
          kecamatan.setMap(map);
        }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      DATA
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */


        function hapus_Semua(){  // HAPUS SEMUA DATA - REBUILD GOOGLE MAP
          $('#galleryrecommend').hide();
          hapusRadius();
          hapus_landmark();
          hapus_kecuali_landmark();

          }

        function hapusMarkerObject() {  // HAPUS MARKER DUA
            for (var i = 0; i < markersDua.length; i++) {
                  markersDua[i].setMap(null);
              }
          }

        function hapusRadius(){ // HAPUS RADIUS
          for(var i=0;i<circles.length;i++)
           {
               circles[i].setMap(null);
           }
          circles=[];
          cekRadiusStatus = 'off';
          }

        function hapus_landmark(){ // HAPUS MARKER & INFO LANDMARK
          for (var i = 0; i < info_landmark.length; i++) {
              info_landmark[i].setMap(null);
          }
          for (var i = 0; i < markers_landmark.length; i++) {
                markers_landmark[i].setMap(null);
          }
        }

        function hapus_kecuali_landmark(){ //
          hapusRadius();
          hapusMarkerObject();
          hapusInfo();
          clearangkot();
          clearroute();
        }

        function hapusInfo() {  // HAPUS INFO WINDOW 2
          for (var i = 0; i < infoDua.length; i++) {
              infoDua[i].setMap(null);
            }
        }

        function clearangkot(){ // HAPUS ANGKOT
          for (i in angkot){
              angkot[i].setMap(null);
            } 
            angkot=[]; 
        }

        function clearroute(){  // HAPUS RUTE
          for (i in rute){
            rute[i].setMap(null);
          } 
          rute=[]; 
        }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      WINDOW
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */


      function menu_angkot() { // KLIK MENU ANGKOT KIRI
          $("#view_kanan_table").show();

          //ANGKOT
          $("#view_kanan_track").hide();
          $("#view_tracking").hide();
          $("#view_object_sekitar").hide();  

          //TW
          $("#view_kanan_data").hide();        
          $("#view_kanan_select").hide();

          $("#view_galery").hide();

          //HOTEL
          $("#view_rekom").hide(); 
          $("#view_kanan_rekom").hide();         
      }

      function menu_angkot_track() { // KLIK MENU ANGKOT KIRI
          $("#view_kanan_track").show();

          $("#view_data_tengah").hide();
          $("#view_tracking").hide();
          $("#view_kanan_table").hide();
          $("#view_table_sekitar").hide();    
      }

      


      function hapus_menu() { // KLIK MENU HOTEL REKOM

          $("#view_data_tengah").hide();
          $("#view_tracking").hide();
          $("#view_kanan_table").hide();
          $("#view_table_sekitar").hide();
          $("#view_kanan_track").hide();
          $("#view_kanan_place").hide();

      }

      function hapus_menu_listLT() { // KLIK MENU HOTEL REKOM

        $("#view_data_tengah").hide();
        $("#view_tracking").hide();
        $("#view_table_sekitar").hide();
        $("#view_kanan_track").hide();
        $("#view_kanan_place").hide();

    }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      FUNGSI DIPAKAI BERSAMA
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */   

        function route_angkot_1(id,color){
          console.log("jalan");      
          console.log(color);      
              ja = new google.maps.Data();
              ja.loadGeoJson('tampilkanrute.php?id_angkot='+id);
              ja.setStyle(function(feature){
              return({
                  fillColor: 'yellow',
                  strokeColor: color,
                  strokeWeight: 3,
                  fillOpacity: 0.5
                  });          
              });
              ja.setMap(map);      
              angkot.push(ja); 
        }

        function galeri(a){    
            console.log(a);
            window.open(server+'gallery.php?idgallery='+a);    
         }

      function posisisekarang(){
        hapusRadius();
        google.maps.event.clearListeners(map, 'click');
        navigator.geolocation.getCurrentPosition(function(position)
        {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude};
          koordinat = {
            lat: position.coords.latitude,
            lng: position.coords.longitude };

          centerBaru = new google.maps.LatLng(koordinat.lat, koordinat.lng);
          centerLokasi = centerBaru;
          map.setCenter(centerBaru)
          map.setZoom(15);
          
          var marker = new google.maps.Marker({
                    position: koordinat,
                    animation: google.maps.Animation.DROP,
                    map: map});

          marker.info = new google.maps.InfoWindow({
              content: "<center><a style='color:black;'>You're Here <br> lat : "+koordinat.lat+" <br> long : "+koordinat.lng+"</a></center>",
              pixelOffset: new google.maps.Size(0, -1)
                });
              marker.info.open(map, marker);

          rad_lat = koordinat.lat;
          rad_lng = koordinat.lng;
           document.getElementById('myLatLocation').value = koordinat.lat;
          document.getElementById('myLngLocation').value = koordinat.lng;
          a =  document.getElementById('myLngLocation').value = koordinat.lng;
  
          console.log(a);
          console.log(rad_lat);
          console.log(rad_lng);
        })
      }

      function lokasimanual(){
        hapusRadius();
        alert('Click the map');
        map.addListener('click', function(event) {
          addMarker_Manual(event.latLng);
          });
       
      }
      function listgeom_hotel(ids){ //INFO WINDOW
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_hotel_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var cp = row.cp;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_hotel.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br><i class='fa fa-phone'></i>"+cp+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
    }
    function listgeom_worship(ids){ //INFO WINDOW
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_worship_place_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var capacity = row.capacity;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_masjid.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
    }
    
      function addMarker_Manual(location){
        for (var i = 0; i < markersManual.length; i++) {
          markersManual[i].setMap(null);       
        } 

        marker = new google.maps.Marker({
         //icon: "assets/img/biru1.ico",
          position : location,
          map: map,
          animation: google.maps.Animation.DROP,
          });

        pos = {
          lat: location.lat(),
          lng: location.lng() };

        koordinat = {
          lat: location.lat(),
          lng: location.lng() };

        centerLokasi = new google.maps.LatLng(koordinat.lat, koordinat.lng);        

        marker.info = new google.maps.InfoWindow({
            content: "<center><a style='color:black;'>You're Here <br> lat : "+koordinat.lat+" <br> long : "+koordinat.lng+"</a></center>",
            pixelOffset: new google.maps.Size(0, -1)
              });
        marker.info.open(map, marker);
        map.setCenter(koordinat)
        map.setZoom(15);
        markersManual.push(marker);

        document.getElementById('myLatLocation').value = koordinat.lat;
        document.getElementById('myLngLocation').value = koordinat.lng;
        rad_lat = koordinat.lat;
        rad_lng = koordinat.lng;
        console.log(rad_lat);
        console.log(rad_lng);
     }

      function set_center(lat,lon,nama){

        //Hapus Info Sebelumnya
        hapusInfo();

        //POSISI MAP
        var centerBaru      = new google.maps.LatLng(lat, lon);
        map.setCenter(centerBaru);

        //JENDELA INFO
        var infowindow = new google.maps.InfoWindow({
              position: centerBaru,
              content: "<bold>"+nama+"</bold>",
            });
        infoDua.push(infowindow); 
        infowindow.open(map);  

      }

      function data_angkot_1_rute(id_angkot){ // ANGKOT - KLIK TOMBOL RUTE - DATA 1 ANGKOT
          hapus_kecuali_landmark(); 
          hapus_menu_listLT();
          $.ajax({url: server+'/tampilkanrute.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.features) 
              { 
                var id_angkot=rows.features[i].properties.id;
                var destination=rows.features[i].properties.destination;
                var track=rows.features[i].properties.track;
                var cost=rows.features[i].properties.cost;
                var color=rows.features[i].properties.color;
                var latitude  = rows.features[i].properties.latitude; 
                var longitude = rows.features[i].properties.longitude ;

                listgeom_tw(id_angkot);  //INFO WINDOW
                tampilrute(id_angkot, "red", latitude, longitude);  //TAMPILKAN RUTE                    

              }//end for                          
          }});//end ajax 

        }

      function data_angkot_2_rute(id_angkot){ // ANGKOT - KLIK TOMBOL RUTE - DATA 1 ANGKOT
          hapus_kecuali_landmark(); 
          $.ajax({url: server+'/tampilkanrute.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.features) 
              { 
                var id_angkot=rows.features[i].properties.id;
                var latitude  = rows.features[i].properties.latitude; 
                var longitude = rows.features[i].properties.longitude ;

                tampilrute(id_angkot, "red", latitude, longitude);  //TAMPILKAN RUTE                    

              }//end for                          
          }});//end ajax 

        }

    //   function data_angkot_1_info(id_angkots){ // ANGKOT - KLIK TOMBOL RUTE - DATA 1 ANGKOT
    //       $("#view_data_tengah").show();
    //       $.ajax({url: server+'/tampilkanrute.php?id_angkot='+id_angkots, data: "", dataType: 'json', success: function(rows){ 
    //         for (var i in rows.features) 
    //           { 
    //             var id_angkot=rows.features[i].properties.id;
    //             var destination=rows.features[i].properties.destination;
    //             var track=rows.features[i].properties.track;
    //             var cost=rows.features[i].properties.cost;
    //             var color=rows.features[i].properties.color;
    //             var latitude  = rows.features[i].properties.latitude; 
    //             var longitude = rows.features[i].properties.longitude ;

    //             // Data Angkot
    //             $('#table_tengah_info').empty();
    //             $('#table_tengah_info').append("<tr><td style='text-align:left'>Destination</td><td>:</td><td style='text-align:left'> "+destination+"</td></tr><tr><td style='text-align:left'>Track</td><td>:</td><td style='text-align:left'> "+track+"</td></tr><tr><td style='text-align:left'>Cost</td><td>:</td><td style='text-align:left'> "+cost+"</td></tr><tr><td style='text-align:left'>Color</td><td>:</td><td style='text-align:left'> "+color+"</td></tr>")

    //             // Tombol Button Sekitar Angkot
    //             $('#angkot_sekitar').empty();
    //             $('#angkot_sekitar').append("<a role='button' class='btn btn-default text-center' onclick='objek_sekitar_angkot(\""+id_angkots+"\")' id='btnik' style='margin:10px'>Process </a>");      

    //       // Tombol Gllaery
    //             $('#label_gallery').empty();
    //             console.log(id_angkots);
    //             $('#label_gallery').append("<a class='btn btn-default' role=button' data-toggle='collapse'  onclick='galeri(\""+id_angkots+"\")' title='Nearby' aria-controls='Nearby' id='btn_gallery'><i class='fa fa-compass' style='color:black;''></i><label>&nbsp Gallery</label></a>")

    //           }//end for                          
    //       }});//end ajax 

    //     }


    function pilih_objek_sekitar_angkot(id_angkots){ // ANGKOT - KLIK TOMBOL RUTE - DATA 1 ANGKOT
        $("#view_data_tengah").show();
        $.ajax({url: server+'/tampilkanrute.php?id_angkot='+id_angkots, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.features) 
            { 
              var id_angkot=rows.features[i].properties.id;
              var destination=rows.features[i].properties.destination;
              var track=rows.features[i].properties.track;
              var cost=rows.features[i].properties.cost;
              var color=rows.features[i].properties.color;
              var latitude  = rows.features[i].properties.latitude; 
              var longitude = rows.features[i].properties.longitude ;

              // Data Angkot
            //   $('#table_tengah_info').empty();
            //   $('#table_tengah_info').append("<tr><td style='text-align:left'>Destination</td><td>:</td><td style='text-align:left'> "+destination+"</td></tr><tr><td style='text-align:left'>Track</td><td>:</td><td style='text-align:left'> "+track+"</td></tr><tr><td style='text-align:left'>Cost</td><td>:</td><td style='text-align:left'> "+cost+"</td></tr><tr><td style='text-align:left'>Color</td><td>:</td><td style='text-align:left'> "+color+"</td></tr>")

              // Tombol Button Sekitar Angkot
   
              $('#angkot_sekitar').empty();
              $('#angkot_sekitar').append("<a role='button' class='btn btn-success text-center' onclick='objek_sekitar_angkot(\""+id_angkots+"\")' id='btnik' style='margin:10px'>Process </a>");      

        // Tombol Gllaery
            //   $('#label_gallery').empty();
            //   console.log(id_angkots);
            //   $('#label_gallery').append("<a class='btn btn-default' role=button' data-toggle='collapse'  onclick='galeri(\""+id_angkots+"\")' title='Nearby' aria-controls='Nearby' id='btn_gallery'><i class='fa fa-compass' style='color:black;''></i><label>&nbsp Gallery</label></a>")

            }//end for                          
        }});//end ajax 

      }

        function multiple_list(){
            $("#multiple_list").show();       
            
            $('#checkbox').empty();
            $.ajax({ 
            url: server+'/_data_angkot.php', data: "", dataType: 'json', success: function(rows) 
            { 
                for (var i in rows){ 
                  var row = rows[i];
                  var id = row.id;
                  var destination = row.destination;
                  var track = row.track;
                  var cost = row.cost;
                  var number = row.number;
                  var color = row.color;
                  var route_color = row.route_color;
                  console.log(id);
                  var latitude=row.latitude;
                  var longitude = row.longitude;
                  $('#checkbox').append("<div class='checkbox'><label style='float:left'><input name='c["+i+"]' value='"+id+"' type='checkbox'>"+destination+"</label></div>");              
                } 

                // Tombol Button Sekitar Angkot
                $('#list').empty();
                $('#list').append("<a role='button' class='btn btn-default text-center' onclick='selectMultiple(\""+id+"\")' id='btnik' style='margin:10px'>Process </a>");            
              } 
            });    
        }

        function selectMultiple(id){

        }

      function listgeom_tw(id_angkot){ //INFO WINDOW
        console.log(server+'/tampilkanrute.php?id_angkot='+id_angkot);
        $.ajax({url: server+'/tampilkanrute.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          arraylatlngangkot=[];
          var count=0;
          for (var i in rows.features[0].geometry.coordinates){ 
            for (var n in rows.features[0].geometry.coordinates[i]){
              var latlng=rows.features[0].geometry.coordinates[i][n];
              count++;
              arraylatlngangkot.push(latlng);
            }//end for
          } //end for
          if(count%2==1){
            count++;
          }
          var mid=count/2;
          var lat=arraylatlngangkot[mid][1];
          var lon=arraylatlngangkot[mid][0];
          var id=rows.features[0].properties.id;
          var destination=rows.features[0].properties.destination;
          var track=rows.features[0].properties.track;
          var cost=rows.features[0].properties.cost;
          var color=rows.features[0].properties.color;
          var gallery=rows.features[0].properties.gallery_angkot;
          //POSISI MAP
          var centerBaru      = new google.maps.LatLng(lat, lon);
          map.setCenter(centerBaru);

          //JENDELA INFO
          var infowindow = new google.maps.InfoWindow({
                position: centerBaru,
                content: "<span style=color:black><center><b>INFORMATION</b></center><br><img src='../_foto/"+gallery+"'alt='No Image' width='150' ><br><table><tr><td><i class='fa fa-home'>Destination</i></td><td>:</td><td> "+destination+"</td></tr><br><tr><td><i class='fa fa-flag'>Track Code</i></td><td>:</td><td>"+id+"</td></tr><br><tr><td><i class='fa fa-money'>Cost</i></td><td>:</td><td>"+cost+"</td></tr><br><tr><td><i class='fa fa-tint'>Track Color</i></td><td>:</td><td>"+color+"</td></tr></table><br><br><a class='btn btn-success fa fa-road' title='Route' role=button' onclick='route_sekitar1(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")' title='route' aria-controls='Route' id='btn_route'></a></label>&nbsp<a class='btn btn-success fa fa-info' title='info' role=button' onclick='galeri(\""+id+"\")' title='Info' aria-controls='Info' id='btn_gallery'></a></label>&nbsp<a class='btn btn-success fa fa-compass' role=button' onclick='pilih_objek_sekitar_angkot(\""+id+"\")' title='Nearby' aria-controls='Nearby' id='btn_angkot'></a></label>&nbsp<a class='btn btn-success fa fa-map-marker' role='button' onclick='setLastPos("+lat+", "+lon+")' title='Location' id='btn_here'></a></span>",
//                content: "<bold>INFORMASI</bold><br>Kode Trayek: "+id+"<br>Jurusan: "+destination+"<br>Warna Angkot: "+color+"<br>Jalur Angkot: "+track+"<br>",
              });
          infowindow.open(map);
          infoDua.push(infowindow); 
          infowindow.open(map);  
         }});//end ajax
      }

      function setLastPos(rad_lat, rad_lng, name){
        document.cookie = "lat_akhir"+"="+rad_lat;
        document.cookie = "lng_akhir"+"="+rad_lng;
        // alert(rad_lat);
        alert("The Location Is On "+rad_lat+", "+rad_lng);
      }

      function tampilrute(id, warna, latitude, longitude){ //TAMPILKAN RUTE
        ja = new google.maps.Data();
        ja.loadGeoJson(server+'tampilkanrute.php?id_angkot='+id);
        ja.setStyle(function(feature){
          return({
              fillColor: 'yellow',
              strokeColor: warna,
              strokeWeight: 2,
              fillOpacity: 0.5
              });          
        });
        ja.setMap(map);  
        angkot.push(ja);
        map.setZoom(15);
      }

      function route_angkot(lat1,lng1,lat,lng,id_angkot,id) {

          /*
          lat1  Titik Turun
          lng1
          lat   Objek
          lng
          id -> untuk marker
          */
          init(); // FORMAT MAP

          //MARKER
          centerBaru = new google.maps.LatLng(lat1, lng1);
          map.setCenter(centerBaru);
          map.setZoom(16);  
          if (id.includes("H")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_hotel.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          } else if (id.includes("tw")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_tw.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          } else if (id.includes("RM")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_kuliner.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          } else if (id.includes("M")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_masjid.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          } else if (id.includes("SO")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_oo.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          } else if (id.includes("IK")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_industri.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          } else if (id.includes("R")) {
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_kuliner.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
          }
          markersDua.push(marker);

          tampilrute(id_angkot, "red", lat1, lng1);  //TAMPILKAN RUTE  ANGKOT

          var end = new google.maps.LatLng(lat1, lng1);
          var start = new google.maps.LatLng(lat, lng);

          if(directionsDisplay){
              clearroute();  
              hapusInfo();
          }

          directionsService = new google.maps.DirectionsService();
          var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
          });
          
          directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            polylineOptions: {
              strokeColor: "darkorange"
            }
          });

          directionsDisplay.setMap(map);
          rute.push(directionsDisplay);          
      }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      MENU 1 LIST ANGKOT
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */      

        function listAngkot(){ // Menu Angkot - List Angkot
          //clearangkot();
          hapus_menu();
          $('#view_kanan_table').show();
          document.getElementById('judul_table').innerHTML="Result";
          $('#galleryrecommend').hide();
          $('#kanan_table').empty();
          $('#kanan_table').append("<tr><th class='centered'>Destination</th><th class='centered'>Action</th></tr>");
          $.ajax({ 
          url: server+'/_data_angkot.php', data: "", dataType: 'json', success: function(rows) 
          { 
              for (var i in rows){ 
                var row = rows[i];
                var id = row.id;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                var number = row.number;
                var color = row.color;
                var route_color = row.route_color;
                console.log(id);
                var latitude=row.latitude;
                var longitude = row.longitude;
                $('#kanan_table').append("<tr><td>"+destination+"</td><td><a role='button' class='btn btn-success fa fa-info' title='info' onclick='data_angkot_1_rute(\""+id+"\")'></a>&nbsp<a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' onclick='data_angkot_2_rute(\""+id+"\")'></a></td></tr>");          

                route_angkot_1(id,route_color);                 
              }               
            } 
          });      
        }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      MENU 2 ANGKOT DISEKITAR
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */

     
     function angkot_sekitar_user(){ // Menu Angkot Sekitar
        $('#galleryrecommend').hide();
        hapus_Semua();  
        hapus_menu(); 
        console.log(rad_lat);
        console.log(rad_lng);
        hapusRadius();

        if (rad_lat == 0 || rad_lng == 0) {
          alert ('Determine your position first');
        } else {

          //radius
          var pos = new google.maps.LatLng(rad_lat, rad_lng);
          map.setCenter(pos);
          map.setZoom(16);  

          var inputradius=document.getElementById("inputradius").value;
          rad = parseFloat(inputradius*100);
          var circle = new google.maps.Circle({
            center: pos,
            radius: rad,      
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "blue",
            fillOpacity: 0.35
          });        
          circles.push(circle);     

          menu_angkot();
          angkot_sekitar(rad_lat,rad_lng,rad);

          //MARKER
          centerLokasi = new google.maps.LatLng(rad_lat, rad_lng);        
          marker = new google.maps.Marker({
           //icon: "assets/img/biru1.ico",
            position : centerLokasi,
            map: map,
            animation: google.maps.Animation.DROP,
            });
          marker.info = new google.maps.InfoWindow({
              content: "<center><a style='color:black;'>You're Here <br> lat : "+rad_lat+" <br> long : "+rad_lng+"</a></center>",
              pixelOffset: new google.maps.Size(0, -1)
                });
          marker.info.open(map, marker);
          map.setCenter(centerLokasi)
          map.setZoom(15);
          markersManual.push(marker);
        }
      }

      function angkot_sekitar(latitude,longitude,rad){ // Menu Angkot - List Angkot
        //clearangkot();
        document.getElementById('judul_table').innerHTML="Result";

        $('#kanan_table').empty();
        $('#kanan_table').append("<tr><th class='centered'>Destination</th><th class='centered'>Action</th></tr>");
        console.log(server+'_sekitar_angkot.php?lat='+latitude+'&long='+longitude+'&rad='+rad);
        $.ajax({ 
        url: server+'_sekitar_angkot.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows) 
        { 
            if(rows == null)
            {
              alert('Data Did Not Exist !');
            }
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var destination = row.destination;
              var color = row.route_color;
              console.log(id);
              route_angkot_1(id,color);
              $('#kanan_table').append("<tr><td>"+destination+"</td><td><a role='button' class='btn btn-success fa fa-info' title='info' onclick='data_angkot_1_rute(\""+id+"\")'></a>&nbsp<a role='button' class='btn btn-success fa fa-taxi' title='Route' onclick='data_angkot_2_rute(\""+id+"\")'></a></td></tr>");
            }               
        }});      
      }

      function modal_angkot(id_angkot){
          document.getElementById('mg_title').innerHTML="Info Angkutan Kota";
          document.getElementById('mg_text').innerHTML="<h2>"+id_angkot+"</h2>";
//          document.getElementById('modal_body').innerHTML="<h2>"+nama+"</h2><br>Pemilik: "+pemilik+"</h2><br>Alamat: "+alamat+"<br>Cp: "+cp+"<br>Produk: "+produk+"<br>Harga Barang: "+harga_barang;

          $('#modal_gallery').modal('show'); 
      }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      MENU 3 ANGKOT DESTINATION
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */

      function angkot_sekitar_destination(tipe){ // Menu Pencarian Angkot Berdasarkan Jurusan
          console.log("menu jalan");
          $('#galleryrecommend').hide();
          hapus_menu();   
          hapus_Semua();
          cari_angkot(tipe);
      }

      function cari_angkot(tipe){ // PENCARIAN ANGKUTAN KOTA
          hapus_kecuali_landmark();
          hapus_landmark();
          console.log(tipe);
          // DEKLARASI
          var y = "";
          if (tipe == 1) {
            document.getElementById('judul_table').innerHTML="Result";
            y = document.getElementById('input_jurusan').value;            
          } else if (tipe == 2) {
            document.getElementById('judul_table').innerHTML="Result";
            y = document.getElementById('input_track').value;   
          } else if (tipe == 3) {
            document.getElementById('judul_table').innerHTML="Result";
            y = document.getElementById('select_jenis').value;   
          }

          if (y == "") {          
            document.getElementById('modal_title').innerHTML="Caution";
            document.getElementById('modal_body').innerHTML="Please fill the form first";
            $('#myModal').modal('show');  
            return;
          } 
          else if (y != "" && tipe == 2) {
            $("#view_kanan_table").show();
            $('#kanan_table').empty();
            document.getElementById('input_jurusan').value=""; //angkot

          $('#kanan_table').append("<tr><th class='centered'>Track</th><th class='centered'>Action</th></tr>");
          console.log(server+'_data_angkot_cari.php?tipe='+tipe+'&nilai='+y);
          $.ajax({url: server+'_data_angkot_cari.php?tipe='+tipe+'&nilai='+y, data: "", dataType: 'json', success: function(rows){ 
            if(rows == null)
            {
              alert('Data Did Not Exist !');
            }
              for (var i in rows){ 
                var row = rows[i];
                var id = row.id;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                var number = row.number;
                var color = row.color;
                var route_color = row.route_color;
                $('#kanan_table').append("<tr><td>"+track+"</td><td><a role='button' class='btn btn-success fa fa-info' title='info' onclick='data_angkot_1_rute(\""+id+"\")'></a>&nbsp<a role='button' class='btn btn-success fa fa-taxi' title='Route' onclick='data_angkot_2_rute(\""+id+"\")'></a></td></tr>");  

                //MAP
                route_angkot_1(id,route_color);                             
              }//end for               
          }});//end ajax  
          }
          else {
            $("#view_kanan_table").show();
            $('#kanan_table').empty();

            //kosongkan input pencarian
          document.getElementById('input_jurusan').value=""; //angkot

          $('#kanan_table').append("<tr><th class='centered'>Destination</th><th class='centered'>Action</th></tr>");
          console.log(server+'_data_angkot_cari.php?tipe='+tipe+'&nilai='+y);
          $.ajax({url: server+'_data_angkot_cari.php?tipe='+tipe+'&nilai='+y, data: "", dataType: 'json', success: function(rows){ 
            if(rows == null)
            {
              alert('Data Did Not Exist !');
            }
              for (var i in rows){ 
                var row = rows[i];
                var id = row.id;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                var number = row.number;
                var color = row.color;
                var route_color = row.route_color;
                $('#kanan_table').append("<tr><td>"+destination+"</td><td><a role='button' class='btn btn-success fa fa-info' title='info' onclick='data_angkot_1_rute(\""+id+"\")'></a>&nbsp<a role='button' class='btn btn-success fa fa-taxi' title='Route' onclick='data_angkot_2_rute(\""+id+"\")'></a></td></tr>");  

                //MAP
                route_angkot_1(id,route_color);                             
              }//end for               
          }});//end ajax             
          }

          
      }

    
      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      SEKITAR ANGKOT - BUTTON
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */

      function objek_sekitar_angkot(id_angkot){ // KLIK TAMPILKAN, SETELAH MEMILIH OBJECT NYA DENGAN CHECK BOX

        hapusMarkerObject();
        $('#table_kanan_hotel').empty();
        $('#table_kanan_tourism').empty();
        $('#table_kanan_worship').empty();
        $('#table_kanan_souvenir').empty();
        $('#table_kanan_culinary').empty();
        $('#table_kanan_industry').empty();
        $('#table_kanan_restaurant').empty();

        $('#table_hotel').hide();
        $('#table_tourism').hide();
        $('#table_worship').hide();
        $('#table_souvenir').hide();
        $('#table_culinary').hide();
        $('#table_industry').hide();
        $('#table_restaurant').hide();

        // td = Table Detail
        if (document.getElementById("check_i").checked) {
          $('#table_industry').show();
          td_industri_angkot(id_angkot);
        }        
        if (document.getElementById("check_k").checked) {
          $('#table_culinary').show();
          td_kuliner_angkot(id_angkot);
        }      
        if (document.getElementById("check_m").checked) {
          $('#table_worship').show();
          td_masjid_angkot(id_angkot);
        }      
        if (document.getElementById("check_oo").checked) {
          $('#table_souvenir').show();
          td_oo_Angkot(id_angkot);
        }      
        if (document.getElementById("check_tw").checked) {
          $('#table_tourism').show();
          td_tw_angkot(id_angkot);
        }        
        if (document.getElementById("check_h").checked) {
          $('#table_hotel').show();
          td_hotel_angkot(id_angkot);
        }        
        if (document.getElementById("check_r").checked) {
          $('#table_restaurant').show();
          td_restaurant_angkot(id_angkot);
        }        

        if (!document.getElementById("check_i").checked && !document.getElementById("check_k").checked && !document.getElementById("check_m").checked && !document.getElementById("check_oo").checked && !document.getElementById("check_tw").checked && !document.getElementById("check_h").checked && !document.getElementById("check_r").checked) {          
          document.getElementById('modal_title').innerHTML="Information";
          document.getElementById('modal_body').innerHTML="Choose at least one object";
          $('#myModal').modal('show'); 
        } else {
          $('#view_table_sekitar').show();           
        }

      }

      function td_hotel_angkot(id_angkot){ // HOTEL SEKITAR ANGKOT
        $('#table_kanan_hotel').empty();
        $('#table_kanan_hotel').append("<tr><th class='centered'>Hotel Name</th><th class='centered'>Action</th></tr>");  
        $.ajax({url: server+'/_angkot_hotel.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var lat=row.lat;
            var lng = row.lng;
            var lng2 = row.lng2;
            var lat2=row.lat2;
            console.log(id);
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat2, lng2);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_hotel.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);
            $('#table_kanan_hotel').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_hotel(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_hotel(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lng2+"\",\""+lat+"\",\""+lng+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }

      function modal_hotel(id){ // DATA HOTEL

        //DATA HOTEL
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_hotel_1.php?cari='+id);
        $.ajax({url: server+'_data_hotel_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var address = row.address;
            var cp = row.cp;
            var ktp = row.ktp;
            var marriage_book = row.marriage_book;
            var mushalla = row.mushalla;
            var type_hotel = row.type_hotel;
            var lat=row.lat;
            var lng = row.lng;

            if (mushalla == 1) {
              mushalla= "Available";
            } else {
              mushalla= "Not Available";
            }
            console.log(name);
            var syarat = "-";
            if (marriage_book == 1 && ktp == 1) {
              syarat= "Marriage Book & KTP";
            } else if (marriage_book == 1) {
              syarat= "Marriage Book";
            } else if (ktp == 1) {
              syarat= "KTP";
            }
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><h4>"+type_hotel+"</h4><br><div style='margin-left:20px'>Address: "+address+"<br>Cp: "+cp+"<br>Mushalla: "+mushalla+"<br>Requirement: "+syarat+"</div>";
          }//end for

          //FASILITAS HOTEL
          var isi="<br><b style='margin-left:20px'>Facility</b> <br><ol>";
          for (var i in rows.fasilitas){ 
            var row = rows.fasilitas[i];
            var id = row.id;
            var name = row.name;
            console.log(name);
            isi = isi+"<li>"+name+"</li>";
          }//end for
          isi = isi + "</ol>";
          $('#mg_body').append(isi);

          //KAMAR HOTEL
          var isi="<b style='margin-left:20px'>Room</b> <br><ol>";
          for (var i in rows.kamar){ 
            var row = rows.kamar[i];
            var id = row.id;
            var name = row.name;
            var price = row.price;
            console.log(name);
            isi = isi+"<li>"+name+" - "+price+"</li>";
          }//end for
          isi = isi + "</ol>";
          $('#mg_body').append(isi);

          $('#modal_gallery').modal('show');
        }});//end ajax  
 
      }

      function listgeom_hotel(ids){ //INFO WINDOW
        hapusMarkerObject();
        clearroute();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_hotel_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var cp = row.cp;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_hotel.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br><i class='fa fa-phone'></i>"+cp+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
    }

      function td_industri_angkot(id_angkot){ // INDUSTRI SEKITAR ANGKOT
        $('#table_kanan_industry').empty();
        $('#table_kanan_industry').append("<tr><th class='centered'>Industry Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'_angkot_small_industry.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var lat=row.lat;
            var lon = row.lng;
            var lat2=row.lat2;
            var lon2 = row.lng2;
            var description = row.description;
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat2, lon2);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_industri.png',
              animation: google.maps.Animation.DROP,
              map: map
              });

            markersDua.push(marker);
            map.setCenter(centerBaru);
            $('#table_kanan_industry').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_industri(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_small_industry(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }

      function modal_small_industry(id){  // DATA INDUSTRY

        //DATA SMALL INDUSTRY
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_small_industry_1.php?cari='+id);
        $.ajax({url: server+'_data_small_industry_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var owner = row.owner;
            var address = row.address;
            var cp = row.cp;
            var employee = row.employee;
            var type_industry = row.type_industry;
            var lat=row.lat;
            var lng = row.lng;
            console.log(name);
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><h4>"+type_industry+"</h4><br><div style='margin-left:20px'>Address: "+address+"<br>Cp: "+cp+"<br>Employee: "+employee+"<br>Industry Type: "+type_industry+"</div>";
          }//end for

          $('#modal_gallery').modal('show');
        }});//end ajax  

      }
      function listgeom_industri(ids){ //INFO WINDOW
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_small_industry_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var capacity = row.capacity;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_industri.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
      }

      function td_kuliner_angkot(id_angkot){ // INDUSTRI SEKITAR ANGKOT\
        console.log('jalan');
        console.log(server+'/_angkot_culinary_place.php?id_angkot='+id_angkot);
         $('#table_kanan_culinary').empty();
        $('#table_kanan_culinary').append("<tr><th class='centered'>Culinary Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'/_angkot_culinary_place.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
        console.log(rows);
        
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var lat=row.lat;
            var lon = row.lng;
            var lat2=row.lat2;
            var lon2 = row.lng2;
            var description = row.description;
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat2, lon2);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_industri.png',
              animation: google.maps.Animation.DROP,
              map: map
              });

            markersDua.push(marker);
            map.setCenter(centerBaru);
            $('#table_kanan_culinary').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_kuliner(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_kuliner(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }

      function td_kuliner_angkot1(id_angkot){ //KULINER SEKITAR ANGKOT
        console.log('jalan');
        console.log(server+'/_angkot_culinary_place.php?id_angkot='+id_angkot);
        $('#table_kanan_culinary').empty();
        $('#table_kanan_culinary').append("<tr><th class='centered'>Culinary Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'/_angkot_culinary_place.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var lat=row.lat;
            var lon = row.lng;
            var lat2=row.lat2;
            var lon2 = row.lng2;
            var description = row.description;
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat2, lon2);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_kuliner.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);

            $('#table_kanan_culinary').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_kuliner(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_kuliner(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }

      function modal_kuliner(id){ //DATA KULINER

        //DATA KULINER
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_culinary_place_1.php?cari='+id);
        $.ajax({url: server+'_data_culinary_place_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var cp = row.cp;
            var address = row.address;
            var capacity = row.capacity;
            var open = row.open;
            var close = row.close;
            var employee = row.employee;
            var lat=row.lat;
            var lng = row.lng;
            console.log(name);
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><br><div style='margin-left:20px'>Address: "+address+"<br>Cp: "+cp+"<br>Capacity: "+capacity+"<br>Open: "+open+"<br>Close: "+close+"<br>Employee: "+employee+"</div>";
          }//end for

          $('#modal_gallery').modal('show');
        }});//end ajax  

      }
      function listgeom_kuliner(ids){ //INFO WINDOW
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_culinary_place_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var capacity = row.capacity;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_kuliner.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
      }
      function td_masjid_angkot(id_angkot){ // MASJID SEKITAR ANGKOT
        $('#table_kanan_worship').empty();
        $('#table_kanan_worship').append("<tr><th class='centered'>Worship Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'/_angkot_worship_place.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var lat=row.lat;
              var lon = row.lng;
              var lat2=row.lat2;
              var lon2 = row.lng2;
              var description = row.description;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat2, lon2);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_masjid.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#table_kanan_worship').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_worship(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_masjid(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
      }

      function modal_masjid(id){  //DATA MASJID

        //DATA MASJID
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_worship_place_1.php?cari='+id);
        $.ajax({url: server+'_data_worship_place_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var address = row.address;
            var land_size = row.land_size;
            var park_area_size = row.park_area_size;
            var building_size = row.building_size;
            var capacity = row.capacity;
            var est = row.est;
            var last_renovation = row.last_renovation;
            var jamaah = row.jamaah;
            var imam = row.imam;
            var teenager = row.teenager;
            var category = row.category;
            var lat=row.lat;
            var lng = row.lng;
            console.log(name);
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><br><div style='margin-left:20px'>Address: "+address+"<br>Land Size: "+land_size+"<br>Park Area: "+park_area_size+"<br>Building Size: "+building_size+"<br>Capacity: "+capacity+"<br>Est: "+est+"<br>Renovation: "+last_renovation+"<br>Jamaah: "+jamaah+"<br>Imam: "+imam+"<br>Teenager: "+teenager+"<br>Category: "+category+"</div>";
          }//end for

          $('#modal_gallery').modal('show');
        }});//end ajax  

      }

      function listgeom_worship(ids){ //INFO WINDOW
        hapusMarkerObject();
        clearroute();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_worship_place_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var capacity = row.capacity;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_masjid.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
    }

      function td_oo_Angkot(id_angkot){ // OLEH-OLEH SEKITAR ANGKOT
        $('#table_kanan_souvenir').empty();
        $('#table_kanan_souvenir').append("<tr><th class='centered'>Souvenir Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'/_angkot_souvenir.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var description = row.description;
              var lat=row.lat;
              var lon = row.lng;
              var lat2=row.lat2;
              var lon2 = row.lng2;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat2, lon2);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_oo.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#table_kanan_souvenir').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_oo(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_oo(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
      }

      function modal_oo(id){  //DATA SOUVENIR

        //DATA SOUVENIR
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_souvenir_1.php?cari='+id);
        $.ajax({url: server+'_data_souvenir_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var owner = row.owner;
            var cp = row.cp;
            var address = row.address;
            var employee = row.employee;
            var type_souvenir = row.type_souvenir;
            var lat=row.lat;
            var lng = row.lng;
            console.log(name);
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><br><div style='margin-left:20px'>Address: "+address+"<br>Cp: "+cp+"<br>Owner: "+owner+"<br>Employee: "+employee+"<br>Type: "+type_souvenir+"</div>";
          }//end for

          $('#modal_gallery').modal('show');
        }});//end ajax  
      }
      function listgeom_oo(ids){ //INFO WINDOW
        console.log('jalan');
        console.log(server+'_data_tourism_1.php?cari='+ids);
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_tourism_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var name = row.name;
                var address = row.address;
        
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_oo.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
      }

       function td_tw_angkot(id_angkot){ // OLEH-OLEH SEKITAR ANGKOT
        $('#table_kanan_tourism').empty();
        $('#table_kanan_tourism').append("<tr><th class='centered'>Tourism Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'/_angkot_tourism.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var description = row.description;
              var lat=row.lat;
              var lon = row.lng;
              var lat2=row.lat2;
              var lon2 = row.lng2;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat2, lon2);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_oo.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#table_kanan_tourism').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_tourism(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_tw(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
      }



      function modal_tw(id){  // DATA TOURISM

        //DATA TOURISM
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_tourism_1.php?cari='+id);
        $.ajax({url: server+'_data_tourism_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var address = row.address;
            var open = row.open;
            var close = row.close;
            var ticket = row.ticket;
            var tourism_type = row.tourism_type;
            var lat=row.latitude;
            var lng = row.longitude;
            console.log(name);
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><h4>"+tourism_type+"</h4><br><div style='margin-left:20px'>Address: "+address+"<br>Open: "+open+"<br>Close: "+close+"<br>Ticket: "+ticket+"</div>";
          }//end for

          //FASILITAS HOTEL
          var isi="<br><b style='margin-left:20px'>Fasility</b> <br><ol>";
          for (var i in rows.fasilitas){ 
            var row = rows.fasilitas[i];
            var id = row.id;
            var name = row.name;
            console.log(name);
            isi = isi+"<li>"+name+"</li>";
          }//end for
          isi = isi + "</ol>";
          $('#mg_body').append(isi);

          $('#modal_gallery').modal('show');
        }});//end ajax  
      }
      function listgeom_tourism(ids){ //INFO WINDOW
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_tourism_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var capacity = row.capacity;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_kuliner.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
      }
      function td_restaurant_angkot(id_angkot){   // RESTAURANT SEKITAR ANGKOT

      // TEMPAT WISATA SEKITAR ANGKOT
        $('#table_kanan_restaurant').empty();
        $('#table_kanan_restaurant').append("<tr><th class='centered'>Restaurant Name</th><th class='centered'>Action</th></tr>");
        $.ajax({url: server+'_angkot_restaurant.php?id_angkot='+id_angkot, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              
              var lat = row.lat;
              var lon = row.lng;
              var lat2 = row.lat2;
              var lon2 = row.lng2;
              var description = row.description;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat2, lon2);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,             
                icon:'icon/marker_kuliner.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#table_kanan_restaurant').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success fa fa-map-marker' title='position' style='margin-right:5px' onclick='listgeom_restaurant(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='Detail' style='margin-right:5px' onclick='modal_restaurant(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-taxi' title='Local Transportation' style='margin-right:5px' onclick='data_angkot_2_rute(\""+id_angkot+"\")' title='Route'></a><a role='button' class='btn btn-success fa fa-road' title='Route' onclick='route_angkot(\""+lat2+"\",\""+lon2+"\",\""+lat+"\",\""+lon+"\",\""+id_angkot+"\",\""+id+"\")'></a></td></tr>");
            }//end for
        }});//end ajax  
      }

      function modal_restaurant(id){    // DATA RESTAURANT

        //DATA TOURISM
        document.getElementById('mg_title').innerHTML="Information";
        console.log(server+'_data_restaurant_1.php?cari='+id);
        $.ajax({url: server+'_data_restaurant_1.php?cari='+id, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows.data){ 
            var row = rows.data[i];
            var id = row.id;
            var name = row.name;
            var cp = row.cp;
            var address = row.address;
            var open = row.open;
            var close = row.close;
            var capacity = row.capacity;
            var employee = row.employee;
            var mushalla = row.mushalla;
            var park_area = row.park_area;
            var bathroom = row.bathroom;
            var type_restaurant = row.type_restaurant;
            var lat=row.latitude;
            var lng = row.longitude;

            if (mushalla == 1) {
              mushalla = "Available";
            }else{
              mushalla = "Not Available"
            }
            if (park_area == 1) {
              park_area = "Available";
            }else{
              park_area = "Not Available"
            }
            if (bathroom == 1) {
              bathroom = "Available";
            }else{
              bathroom = "Available"
            }

            console.log(name);
            document.getElementById('mg_body').innerHTML="<h2>"+name+"</h2><h4>"+type_restaurant+"</h4><br><div style='margin-left:20px'>Address: "+address+"<br>Open: "+open+"<br>Close: "+close+"<br>Capacity: "+capacity+"<br>Employee: "+employee+"<br>Mushalla: "+mushalla+"<br>Park Area: "+park_area+"<br>Bathroom: "+bathroom+"</div>";
          }//end for

          $('#modal_gallery').modal('show');
        }});//end ajax  
      }
      function listgeom_restaurant(ids){ //INFO WINDOW
        hapus_kecuali_landmark();
        //basemap();
        hapus_landmark();

        $.ajax({url: server+'_data_restaurant_1.php?cari='+ids, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows.data){ 
                var row = rows.data[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var capacity = row.capacity;
                var ktp = row.ktp;
                var marriage_book = row.marriage_book;
                var mushalla = row.mushalla;
                var star = row.star;
                var type_hotel = row.type_hotel;
                var lat=row.lat;
                var lng = row.lng;
                console.log(name);
                var syarat="-";
                if (ktp == 1 && marriage_book == 1) {
                    syarat = "KTP & Buku Nikah";
                }
                else if (ktp == 1) {
                    syarat = "KTP";
                } else if (marriage_book == 1) {
                    syarat = "Buku Nikah";
                }
            
                var mushalla_stat = "-";
                if (mushalla == 1) {
                    mushalla_stat = "Ada Mushalla"
                };
            
                //MARKER
                rad_lat = lat;
                rad_lng = lng;
                console.log(rad_lat);
                console.log(rad_lng);

                var pos = new google.maps.LatLng(rad_lat, rad_lng);
                marker = new google.maps.Marker({
                    icon: "icon/marker_oo.png",
                    position : pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.info = new google.maps.InfoWindow({
                    content: "<span style=color:black><center> <b>"+name+"</b></center><br><i class='fa fa-map-marker'></i>"+address+"<br></span>",
                    pixelOffset: new google.maps.Size(0, -1)
                });
                console.log(marker.info);
                marker.info.open(map, marker);
                markers_landmark.push(marker);
            }//end for
        }});//end ajax
      }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      MENU 5 ANGKOT TRACKING
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */

      function call_rute(){ // Panggil Track
        //loader                 
        $("#loader").show();
        $("#loader_text").show();   

        var lat1= document.getElementById('input_posisi_awal_lat').value;
        var lng1= document.getElementById('input_posisi_awal_lng').value;
        var lat2 = document.getElementById('input_posisi_tujuan_lat').value
        var lng2 = document.getElementById('input_posisi_tujuan_lng').value;

        $('#view_tracking').show();
        $('#view_tracking_table').empty();
        $('#view_tracking_table').append("<thead><th class='centered'>Route</th><th class='centered'>Action</th></thead>");
        $('#kanan_rute').empty();

        if (lat1==""||lng1==""||lat2==""||lng2=="") {
          $('#kanan_rute').append("<div class='alert alert-danger' style='font-size:12px; display: inline-block;padding: 6px 12px;width:100%'><b>Set your position first</b></div>");
        } else {
          var url_tujuan = server+'tracking.php?lat1='+lat1+'&lng1='+lng1+'&lat2='+lat2+'&lng2='+lng2+'&rad=300'; 
          console.log(url_tujuan);
          $.ajax({url: url_tujuan, data: "", dataType: 'json', success: function(rows){            
            //{"jumlah":6,"data":[{"rute-ke":1,"data":["A002","18"]},{"rute-ke":2,"data":["D003","18"]},{"rute-ke":3,"data":["A001","18"]},{"rute-ke":4,"data":["C006","18"]},{"rute-ke":5,"data":["A003","18"]},{"rute-ke":6,"data":["C001","18"]}]}
            console.log(rows.jumlah);
            console.log(rows.data);
            for (var i in rows.data){ 
              var row = rows.data[i];
              var data = row.data;
              var rute="";
              var fungsi="";
              for(var x in data){
                var isi = data[x];
                console.log(isi);
                if (rute=="") {
                  rute = isi;                   
                }else{
                  rute = rute+' - '+isi;
                }
                fungsi = fungsi + "data_angkot_rute(\'"+isi+"\');";
              }//end for
              console.log("hasil rute");
              console.log(rute);
              console.log(fungsi);
              $('#view_tracking_table').append("<tr><td>"+rute+"</td><td><a role='button' class='btn btn-default fa fa-info' title='info'  onclick=\"hapus_kecuali_landmark();"+fungsi+"\"><i class='fa fa-search' style='color:#fff'></i>Rute</a></td></tr>");                           
            }//end for
            if (rows.jumlah == 0) {
              $('#kanan_rute').empty();
              $('#kanan_rute').append("<div class='alert alert-danger' style='font-size:12px; display: inline-block;padding: 6px 12px;width:100%'><b>No Recommendations</b></div>"); 
            }//end if   
            //loader                 
            $("#loader").hide();
            $("#loader_text").hide();               
          }});//end ajax      
        }

      }

      function call_rute_1(){ // Panggil Track
        //loader                 
        $("#loader").show();
        $("#loader_text").show();   

        var lat1= document.getElementById('input_posisi_awal_lat').value;
        var lng1= document.getElementById('input_posisi_awal_lng').value;
        var lat2 = document.getElementById('input_posisi_tujuan_lat').value
        var lng2 = document.getElementById('input_posisi_tujuan_lng').value;

        $('#view_tracking').show();
        $('#view_tracking_table').empty();
        $('#view_tracking_table').append("<tr><th class='centered'>Route</th><th class='centered'>Action</th></tr>");
        $('#kanan_rute').empty();

        if (lat1==""||lng1==""||lat2==""||lng2=="") {
          $("#loader").hide();
          $("#loader_text").hide();    
          $('#view_tracking').hide();
          $('#kanan_rute').append("<div class='alert alert-danger' style='font-size:12px; display: inline-block;padding: 6px 12px;width:100%'><b>Set your position first</b></div>");
        } else {
          var url_tujuan = server+'tracking3.php?lat1='+lat1+'&lng1='+lng1+'&lat2='+lat2+'&lng2='+lng2+'&rad=200'; 
          console.log(url_tujuan);

          $.ajax({url: url_tujuan, data: "", dataType: 'json', success: function(rows){            
            console.log("Condition "+rows.Kondisi);
            console.log("Data "+rows.data);
            var rute="";
            var fungsi="";
            for (var i in rows.data){ 
              var isi = rows.data[i];
              console.log("Row "+isi);

//              var isi = row[i];
              console.log(isi);
              if (rute=="") {
                rute = isi;                   
              }else{
                rute = rute+' - '+isi;
              }
              fungsi = fungsi + "data_angkot_rute(\'"+isi+"\');";
                         
            }//end for
            console.log("hasil rute");
            console.log(rute);
            console.log(fungsi);
            $('#view_tracking_table').append("<tr><td>"+rute+"</td><td><a role='button' class='btn btn-success fa fa-taxi' title='Route'  onclick=\"hapus_kecuali_landmark();"+fungsi+"\"></a></td></tr>");

            if (rows.jumlah == 0) {
              $('#kanan_rute').empty();
              $('#kanan_rute').append("<div class='alert alert-danger' style='font-size:12px; display: inline-block;padding: 6px 12px;width:100%'><b>No Recommendations</b></div>"); 
            }//end if   
            //loader                 
            $("#loader").hide();
            $("#loader_text").hide();               
          }});//end ajax      
        }
      }

      function call_rute_2(){ // Panggil Track
        //loader                 
        $("#loader").show();
        $("#loader_text").show();   

        var lat1= document.getElementById('input_posisi_awal_res_lat').value;
        var lng1= document.getElementById('input_posisi_awal_res_lng').value;
        var lat2 = document.getElementById('input_posisi_tujuan_res_lat').value
        var lng2 = document.getElementById('input_posisi_tujuan_res_lng').value;

        $('#view_tracking_res').show();
        $('#view_tracking_res_table').empty();
        $('#view_tracking_res_table').append("<tr><th class='centered'>Route</th><th class='centered'>Action</th></tr>");
        $('#kanan_rute_res').empty();

        if (lat1==""||lng1==""||lat2==""||lng2=="") {
          $("#loader").hide();
          $("#loader_text").hide();    
          $('#view_tracking_res').hide();
          $('#kanan_rute_res').append("<div class='alert alert-danger' style='font-size:12px; display: inline-block;padding: 6px 12px;width:100%'><b>Set your position first</b></div>");
        } else {
          var url_tujuan = server+'tracking3.php?lat1='+lat1+'&lng1='+lng1+'&lat2='+lat2+'&lng2='+lng2+'&rad=200'; 
          console.log(url_tujuan);

          $.ajax({url: url_tujuan, data: "", dataType: 'json', success: function(rows){            
            console.log("kondisi "+rows.Kondisi);
            console.log("data "+rows.data);
            var rute="";
            var fungsi="";
            for (var i in rows.data){ 
              var isi = rows.data[i];
              console.log("baris "+isi);

//              var isi = row[i];
              console.log(isi);
              if (rute=="") {
                rute = isi;                   
              }else{
                rute = rute+' - '+isi;
              }
              fungsi = fungsi + "data_angkot_rute(\'"+isi+"\');";
                         
            }//end for
            console.log("hasil rute");
            console.log(rute);
            console.log(fungsi);
            $('#view_tracking_table').append("<tr><td>"+rute+"</td><td><a role='button' class='btn btn-default '  onclick=\"hapus_kecuali_landmark();"+fungsi+"\">Route</a></td></tr>");

            if (rows.jumlah == 0) {
              $('#kanan_rute').empty();
              $('#kanan_rute').append("<div class='alert alert-danger' style='font-size:12px; display: inline-block;padding: 6px 12px;width:100%'><b>No Recommendations</b></div>"); 
            }//end if   
            //loader                 
            $("#loader").hide();
            $("#loader_text").hide();               
          }});//end ajax      
        }
      }

      function data_angkot_rute(id){ // ANGKOT - KLIK TOMBOL RUTE - DATA 1 ANGKOT
        hapus_kecuali_landmark(); 
        $.ajax({ 
        url: server+'/tampilkanrute.php?id_angkot='+id, data: "", dataType: 'json', success: function(rows) 
        { 
          for (var i in rows.features) 
            { 
              var id_angkot=rows.features[i].properties.id;
              var destination=rows.features[i].properties.destination;
              var track=rows.features[i].properties.track;
              var cost=rows.features[i].properties.cost;
              var color=rows.features[i].properties.color;
              var route_color=rows.features[i].properties.route_color;
              var latitude  = rows.features[i].properties.latitude; 
              var longitude = rows.features[i].properties.longitude ;
              var gallery=rows.features[0].properties.gallery_angkot;
              //INFO WINDOW
              arraylatlngangkot=[];
              var count=0;
              for (var i in rows.features[0].geometry.coordinates) 
                { 
                  for (var n in rows.features[0].geometry.coordinates[i])
                  {
                    var latlng=rows.features[0].geometry.coordinates[i][n];
                    count++;
                    arraylatlngangkot.push(latlng);
                  }
                } 
              if(count%2==1){
                count++;
              }
              var mid=count/2;
              var lat=arraylatlngangkot[mid][1];
              var lon=arraylatlngangkot[mid][0];

              //POSISI MAP
              var centerBaru      = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);

              //JENDELA INFO
              var infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<span style=color:black><center><b>INFORMATION</b></center><br><img src='../_foto/"+gallery+"'alt='No Image' width='150' ><br><table style='text-align: justify;'><tr><td><i class='fa fa-home'>Destination</i></td><td>:</td><td> "+destination+"</td></tr><br><tr><td><i class='fa fa-flag'>Track Code</i></td><td>:</td><td>"+id+"</td></tr><br><tr><td><i class='fa fa-money'>Cost</i></td><td>:</td><td>"+cost+"</td></tr><br><tr><td><i class='fa fa-tint'>Track Color</i></td><td>:</td><td>"+color+"</td></tr><br><tr><td><i class='fa fa-road'>Coordinate</i></td><td>:</td><td>"+lat+" "+lon+"</td></tr></table></span>",
                  });
              infowindow.open(map);
              infoDua.push(infowindow); 
              infowindow.open(map);  

              //TAMPILKAN RUTE 
              tampilrute(id, route_color, latitude, longitude);                  
            }//end for               
        } 
       });//end ajax           
      }
      function legenda()
{
  $('#tombol').empty();
  $('#tombol').append('<a class="btn btn-default" role="button" id="hidelegenda" data-toggle="tooltip" onclick="hideLegenda()" title="Hide Legend"><i class="fa fa-eye-slash" style="color:black;"></i></a>');

  var layer = new google.maps.FusionTablesLayer(
    {
          query: {
            select: 'Location',
            from: '1NIVOZxrr-uoXhpWSQH2YJzY5aWhkRZW0bWhfZw'
          },
          map: map
        });
    var legend = document.createElement('div');
        legend.id = 'legend';
        var content = [];
        content.push('<h4>Legend</h4>');
            content.push('<p><div class="color b"></div>Mandiangin Koto Selayan</p>');
            content.push('<p><div class="color c"></div>Guguak Panjang</p>');
            content.push('<p><div class="color e"></div>Aur Biru Tigo Baleh</p>');
        legend.innerHTML = content.join('');
        legend.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);
}
function hideLegenda() {
  $('#legend').remove();
  $('#tombol').empty();
  $('#tombol').append('<a class="btn btn-success" role="button" id="showlegenda" data-toggle="tooltip" onclick="legenda()" title="Legend"><i class="fa fa-eye" style="color:black;"></i></a>');
}
      function reset_rute() { //RESET KLIK RUTE

          $('#view_tracking').hide();
          $('#view_tracking_table').empty();

          //loader                 
          $("#loader").hide();
          $("#loader_text").hide(); 

          tujuan=0;
          awal=0;
          hapus_kecuali_landmark();
          init();

          $('#kanan_rute').empty();
          $('#text_tujuan').empty();
          $('#text_tujuan').append("<div class='alert alert-warning' style='display: inline-block;padding: 6px 12px;width:100%'><b>KLIK</b> For setting position end</div>"); 

          $('#text_awal').empty();
          $('#text_awal').append("<div class='alert alert-warning' style='display: inline-block;padding: 6px 12px;width:100%'><b>KLIK</b> For setting position start</div>");  
      }

      function posisi_manual_1(){ //POSISI AWAL

        if (awal==0) {
            $('#text_awal').empty();
            $('#text_awal').append("<div class='alert alert-info' style='display: inline-block;padding: 6px 12px;width:100%'>Please click on the map</div>");   
        } else { 
            $('#text_awal').empty();
            $('#text_awal').append("<div class='alert alert-danger' style='display: inline-block;padding: 6px 12px;width:100%'>Reset First</div>");   
        }
    
        map.addListener('click', function(event) {
          console.log("manual 1 mulai");
          if (awal == 0) {
              console.log("mulai");
              marker_awal = new google.maps.Marker({
               //icon: "assets/img/biru1.ico",
                position : event.latLng,
                map: map,
                animation: google.maps.Animation.DROP,
                });

              posisi_1 = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng() }

              document.getElementById('input_posisi_awal_lat').value=posisi_1.lat;
              document.getElementById('input_posisi_awal_lng').value=posisi_1.lng;

              marker_awal.info = new google.maps.InfoWindow({
                  content: "<center><a style='color:black;'>Position Start</a></center>",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                  marker_awal.info.open(map, marker_awal);

              marker_1.push(marker_awal);
              awal=1;
              $('#text_awal').empty();
              $('#text_awal').append("<div class='alert alert-success' style='display: inline-block;padding: 6px 12px;width:100%'>Location Confirmed</div>");   
          }//end awal == 0
        });//end add listener
      }

      function posisi_manual_2(){ //POSISI TUJUAN

        if (tujuan==0) {
            $('#text_tujuan').empty();
            $('#text_tujuan').append("<div class='alert alert-info' style='display: inline-block;padding: 6px 12px;width:100%'>Please click on the map</div>"); 
          } else {
            $('#text_tujuan').empty();
            $('#text_tujuan').append("<div class='alert alert-danger' style='display: inline-block;padding: 6px 12px;width:100%'>Reset first</div>"); 
          }

        map.addListener('click', function(event) {
          console.log("manual 2 mulai"); 
          if (tujuan == 0) {
            console.log("mulai");
            for (var i = 0; i < marker_2.length; i++) {
              marker_2[i].setMap(null);        
            } 

            marker = new google.maps.Marker({
             //icon: "assets/img/biru1.ico",
              position : event.latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              });

            posisi_2 = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng() }

            document.getElementById('input_posisi_tujuan_lat').value=posisi_2.lat;
            document.getElementById('input_posisi_tujuan_lng').value=posisi_2.lng;

            marker.info = new google.maps.InfoWindow({
                content: "<center><a style='color:black;'>Position End</a></center>",
                pixelOffset: new google.maps.Size(0, -1)
                  });
                marker.info.open(map, marker);

            marker_2.push(marker);
            tujuan =1;
            $('#text_tujuan').empty();
            $('#text_tujuan').append("<div class='alert alert-success' style='display: inline-block;padding: 6px 12px;width:100%'>Location Confirmed</div>"); 

          }//end tujuan ==0
       });//end addlistener

      }

      function posisi_manual_res_2(){ //POSISI TUJUAN

        if (tujuan==0) {
            $('#text_tujuan_res').empty();
            $('#text_tujuan_res').append("<div class='alert alert-info' style='display: inline-block;padding: 6px 12px;width:100%'>Please click on the map</div>"); 
          } else {
            $('#text_tujuan_res').empty();
            $('#text_tujuan_res').append("<div class='alert alert-danger' style='display: inline-block;padding: 6px 12px;width:100%'>Reset first</div>"); 
          }

        map.addListener('click', function(event) {
          console.log("manual 2 mulai"); 
          if (tujuan == 0) {
            console.log("mulai");
            for (var i = 0; i < marker_2.length; i++) {
              marker_2[i].setMap(null);        
            } 

            marker = new google.maps.Marker({
             //icon: "assets/img/biru1.ico",
              position : event.latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              });

            posisi_2 = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng() }

            document.getElementById('input_posisi_tujuan_res_lat').value=posisi_2.lat;
            document.getElementById('input_posisi_tujuan_res_lng').value=posisi_2.lng;

            marker.info = new google.maps.InfoWindow({
                content: "<center><a style='color:black;'>Position End</a></center>",
                pixelOffset: new google.maps.Size(0, -1)
                  });
                marker.info.open(map, marker);

            marker_2.push(marker);
            tujuan =1;
            $('#text_tujuan_res').empty();
            $('#text_tujuan_res').append("<div class='alert alert-success' style='display: inline-block;padding: 6px 12px;width:100%'>Location Confirmed</div>"); 

          }//end tujuan ==0
       });//end addlistener

      }

      /* **********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      RADIUS - OBJEK SEKITAR - SEEKBAR
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      ***********************************************************************************************************************************************************
      *********************************************************************************************************************************************************** */
 
        function aktifkanRadius(){
          var pos = new google.maps.LatLng(rad_lat, rad_lng);
          map.setCenter(pos);
          map.setZoom(16);  

          hapus_kecuali_landmark();
          hapusRadius();
          var inputradius=document.getElementById("inputradius").value;
          rad = parseFloat(inputradius*100);
          var circle = new google.maps.Circle({
            center: pos,
            radius: rad,      
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "blue",
            fillOpacity: 0.35
          });        
          circles.push(circle);     

          //TAMPILAN
          $("#view_industri").hide();
          $("#view_kuliner").hide();
          $("#view_masjid").hide();
          $("#view_oo").hide();
          $("#view_tw").hide();
          $("#view_h").hide();

          if (document.getElementById("check_i").checked) {
            industri_sekitar(rad_lat,rad_lng,rad);
            $("#view_industri").show();
          }        

          if (document.getElementById("check_k").checked) {
            kuliner_sekitar(rad_lat,rad_lng,rad);
            $("#view_kuliner").show();
          }      

          if (document.getElementById("check_m").checked) {
            masjid_sekitar(rad_lat,rad_lng,rad);
            $("#view_masjid").show();
          }        

          if (document.getElementById("check_oo").checked) {
            oleholeh_sekitar(rad_lat,rad_lng,rad);
            $("#view_oo").show();
          }        

          if (document.getElementById("check_tw").checked) {
            tw_sekitar(rad_lat,rad_lng,rad);
            $("#view_tw").show();
          }        

          if (document.getElementById("check_h").checked) {
            h_sekitar(rad_lat,rad_lng,rad);
            $("#view_h").show();
          }        

          if (document.getElementById("check_r").checked) {
            restaurant_sekitar(rad_lat,rad_lng,rad);
            $("#view_h").show();
          }        

          if (!document.getElementById("check_i").checked && !document.getElementById("check_k").checked && !document.getElementById("check_m").checked && !document.getElementById("check_oo").checked && !document.getElementById("check_tw").checked && !document.getElementById("check_h").checked && !document.getElementById("check_r").checked) {          
            document.getElementById('modal_title').innerHTML="Information";
            document.getElementById('modal_body').innerHTML="Choose at least one object";
            $('#myModal').modal('show'); 
          }
        }
      
      function route_sekitar1(lat1,lng1,lat,lng) {
        console.log('jalan');
          lat1 = document.getElementById('myLatLocation').value;
          lng1 = document.getElementById('myLngLocation').value;
          console.log(lat1);
          console.log(lng1);
          if (lat1 == 0 || lat == 0 || lng1 == 0 || lng == 0) {          
            document.getElementById('modal_title').innerHTML="Info";
            document.getElementById('modal_body').innerHTML="Caution, Mark your location first";
            $('#myModal').modal('show'); 
            return;
          }

          var start = new google.maps.LatLng(lat1, lng1);
          var end = new google.maps.LatLng(lat, lng);
        

          if(directionsDisplay){
              clearroute();  
              hapusInfo();
          }

          directionsService = new google.maps.DirectionsService();
          var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
          });
          
          directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            polylineOptions: {
              strokeColor: "darkorange"
            }
          });

          directionsDisplay.setMap(map);
          rute.push(directionsDisplay);
          document.getElementById('view_tracking_table2').innerHTML=""; 
          $("#view_tracking2").show();
          $("#view_tracking").hide();
          directionsDisplay.setPanel(document.getElementById('view_tracking_table2'));         
        }
      
      function route_sekitar(lat1,lng1,lat,lng) {
          var start = new google.maps.LatLng(lat1, lng1);
          var end = new google.maps.LatLng(lat, lng);

          if(directionsDisplay){
              clearroute();  
              hapusInfo();
          }

          directionsService = new google.maps.DirectionsService();
          var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
          });
          
          directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            polylineOptions: {
              strokeColor: "darkorange"
            }
          });

          directionsDisplay.setMap(map);
          rute.push(directionsDisplay);          
      }

      function tampil_sekitar(latitude,longitude,namaa,tipe){
        hapus_Semua();
        rad_lat = latitude;
        rad_lng = longitude;

        //Hilangkan Button Sekitar
        $('#view_sekitar').empty();
        document.getElementById("inputradius").style.display = "inline";

        // POSISI MARKER
        centerBaru = new google.maps.LatLng(latitude, longitude);
        if (tipe==1) {
          var marker = new google.maps.Marker({map: map, position: centerBaru, 
            icon:'icon/marker_tw.png',
            animation: google.maps.Animation.DROP,
            clickable: true});
        }else{
          var marker = new google.maps.Marker({map: map, position: centerBaru, 
            icon:'icon/marker_hotel.png',
            animation: google.maps.Animation.DROP,
            clickable: true});          
        }

        //INFO WINDOW
        marker.info = new google.maps.InfoWindow({
          content: "<bold>"+namaa+"",
          pixelOffset: new google.maps.Size(0, -1)
            });
          marker.info.open(map, marker);

        $("#view_object_sekitar").show();

        $("#view_industri").hide();
        $("#view_kuliner").hide();
        $("#view_masjid").hide();
        $("#view_oo").hide();
        $("#view_tw").hide();

        $("#view_kanan_data").hide();
        $("#view_galery").hide();                         
      }

      function industri_sekitar(latitude,longitude,rad){ // INDUSTRI SEKITAR
        $('#view_industri_table').empty();
        $('#view_industri_table').append("<thead><th class='centered'>Industry Name</th><th class='centered'>Action</th></thead>");
        console.log(server+'_sekitar_small_industry.php?lat='+latitude+'&long='+longitude+'&rad='+rad);
        $.ajax({url: server+'_sekitar_small_industry.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var jarak = row.jarak;
            var lat=row.lat;
            var lon = row.lng;
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat, lon);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_industri.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);
            $('#view_industri_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' style='margin-right:10px' class='btn btn-success fa fa-info' title='info' onclick='modal_industri(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }

      function kuliner_sekitar(latitude,longitude,rad){ //KULINER SEKITAR ANGKOT

          $('#view_kuliner_table').empty();
          $('#view_kuliner_table').append("<thead><th class='centered'>Culinary Name</th><th class='centered'>Action</th></thead>");
          $.ajax({url: server+'_sekitar_culinary_place.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var jarak = row.jarak;
              var lat=row.lat;
              var lon = row.lng;
              console.log(name);

              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_kuliner.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#view_kuliner_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' style='margin-right:10px' class='btn btn-success fa fa-info' title='info' onclick='modal_kuliner(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }


      function masjid_sekitar(latitude,longitude,rad){ // MASJID SEKITAR ANGKOT

        $('#view_masjid_table').empty();
        $('#view_masjid_table').append("<thead><th class='centered'>Worship Name</th><th class='centered'>Action</th></thead>");
        $.ajax({url: server+'_sekitar_worship_place.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var jarak = row.jarak;
            var lat=row.la;
            var lon = row.lng;
            
            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat, lon);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'icon/marker_masjid.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);

            $('#view_masjid_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' class='btn btn-success fa fa-info' title='info' style='margin-right:10px' onclick='modal_masjid(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }


      function oleholeh_sekitar(latitude,longitude,rad){ // OLEH-OLEH SEKITAR ANGKOT

          $('#view_oo_table').empty();
          $('#view_oo_table').append("<thead><th class='centered'>Souvier Name</th><th class='centered'>Action</th></thead>");
          $.ajax({url: server+'_sekitar_oleholeh.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var jarak = row.jarak;
              var lat=row.latitude;
              var lon = row.longitude;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_oo.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#view_oo_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' style='margin-right:10px' class='btn btn-success fa fa-info' title='info' onclick='modal_oo(\""+id+"\") '></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }

      function tw_sekitar(latitude,longitude,rad){ // TEMPAT WISATA SEKITAR ANGKOT

          $('#view_tw_table').empty();
          $('#view_tw_table').append("<thead><th class='centered'>Object Tourism Name</th><th class='centered'>Action</th></thead>");
          $.ajax({url: server+'_sekitar_tourism.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var jarak = row.jarak;
              var lat = row.lat;
              var lon = row.lng;

              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_tw.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#view_tw_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' style='margin-right:10px' class='btn btn-success fa fa-info' title='info' onclick='modal_tw(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  

        }


      function h_sekitar(latitude,longitude,rad){ // TEMPAT WISATA SEKITAR ANGKOT

          $('#view_hotel_table').empty();
          $('#view_hotel_table').append("<thead><th class='centered'>Hotel Name</th><th class='centered'>Action</th></thead>");
          console.log(server+'_sekitar_hotel.php?lat='+latitude+'&long='+longitude+'&rad='+rad);
          $.ajax({url: server+'_sekitar_hotel.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id          = row.id;
              var name       = row.name;
              var jarak  = row.jarak;
              var lat    = row.lat; 
              var lon   = row.lng;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_hotel.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#view_hotel_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' style='margin-right:10px' class='btn btn-success fa fa-info' title='info' onclick='modal_hotel(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }

      function restaurant_sekitar(latitude,longitude,rad){ // TEMPAT WISATA SEKITAR ANGKOT

          $('#view_hotel_table').empty();
          $('#view_hotel_table').append("<thead><th class='centered'>Restaurant Name</th><th class='centered'>Action</th></thead>");
          console.log(server+'_sekitar_restaurant.php?lat='+latitude+'&long='+longitude+'&rad='+rad);
          $.ajax({url: server+'_sekitar_restaurant.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id  = row.id;
              var name    = row.name;
       
              var lat    = row.lat; 
              var lon   = row.lng;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'icon/marker_hotel.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#view_hotel_table').append("<tr><td>"+name+"</td><td><a role='button' style='margin-right:10px' class='btn btn-success fa fa-taxi' title='Route' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a><a role='button' style='margin-right:10px' class='btn btn-success fa fa-info' title='info' onclick='modal_restaurant(\""+id+"\")'></a><a role='button' class='btn btn-success fa fa-map-marker' onclick='set_center(\""+lat+"\",\""+lon+"\",\""+name+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }

