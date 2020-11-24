sidebar start-->
      <aside>
          <div id="sidebar"  class="nav-collapse ">
              <!-- sidebar menu start-->
              <ul class="sidebar-menu" id="nav-accordion">
              
                  <p class="centered"><a href="index.php"><img src="icon/jam.jpg" class="img-circle" width="100" height="100"></a></p>
                  <p class="centered" style="color: white; font-style: bold;">Bukittinggi</p>
                  <li class="sub">
                      <a onclick="listAngkot();" style="cursor:pointer;background:none"><i class="fa fa-taxi"></i>List LT</a>
                  </li>

                  <li class="sub">
                      <a onclick="" style="cursor:pointer;background:none"><i class="fa fa-thumb-tack"></i>LT Around You</a>
                      <ul class="treeview-menu">
                        <div class=" form-group" style="color: white;" > <!-- <br> -->
                          <!-- <label>Based On Radius</label><br> -->
                          <label for="inputradius" style="font-size: 10pt";>Radius : </label>
                          <label  id="nilai"  style="font-size: 10pt";>0</label> m
                          
                          <input  type="range" onchange="angkot_sekitar_user();cekkk();aktifkanRadiuss()" id="inputradius" 
                                  name="inputradius" data-highlight="true" min="0" max="20" value="0" >
                          <script>
                            function cekkk()
                            {
                              document.getElementById('nilai').innerHTML=document.getElementById('inputradius').value*100
                            }
                          </script>
                        </div>
                      </ul>                     
                  </li>

                  <li class="sub">
                    <a href="javascript:;" >
                        <i class="fa fa-search"></i>
                        <span>Search LT By</span>
                    </a>
                    <ul class="sub-menu">
                      <li class="sub-menu">
                      <a  href="javascript:;">
                        <i class="fa fa-search"></i> <span>By Destination</span></a>
                      <ul class="sub-menu">
                        <li style="margin-top:10px"><input id="input_jurusan" type="text" class="form-control"></li>                             
                        <li><a onclick="angkot_sekitar_destination(1)" style="cursor:pointer;background:none">Search</a></li>
                      </ul>
                    </li>
                
                    <li class="sub-menu">
                      <a  href="javascript:;"><i class="fa fa-search"></i> By Track</a>
                      <ul class="sub">
                        <li style="margin-top:10px"><input id="input_track" type="text" class="form-control"></li>                             
                        <li><a onclick="angkot_sekitar_destination(2)" style="cursor:pointer;background:none">Search</a></li>
                      </ul>
                    </li>
                  
                    <li class="sub-menu">
                      <a href="javascript:;"><i class="fa fa-search"></i> By Color</a>
                      <ul class="sub">
                        <li style="margin-top:10px">
                        <select class="form-control kota text-center" style="width:100%;margin-top:10px" id="select_jenis">
                          <?php                      
                          include('../connect.php');    
                          $querysearch="SELECT id, color FROM angkot_color"; 
                          $hasil=mysqli_query($conn, $querysearch);

                            while($baris = mysqli_fetch_array($hasil)){
                                $id=$baris['id'];
                                $color=$baris['color'];
                                echo "<option value='$id'>$color</option>";
                            }
                          ?>
                        </select>
                        </li>                             
                        <li><a onclick="angkot_sekitar_destination(3)" style="cursor:pointer;background:none">Search</a></li>
                      </ul>
                    </li>
                  </ul>


                  </li>

                  <li class="sub">
                      <a onclick="hapus_Semua();menu_angkot_track()" style="cursor:pointer;background:none"><i class="fa fa-road"></i>LT Recommendations</a>
                  </li>

                  <!-- <li class="sub">
                      <a href="apps.apk" download><i class="fa fa-download" ></i>Download Android Apps</a>
                  </li> -->
                  <li class="sub-menu">
                      <a class="active" href=".././">
                          <i class="fa fa-hand-o-left"></i>
                          <span>Dashboard</span>
                      </a>
                  </li>


                  
                   <!-- <li class="sub-menu">
                    <a href="javascript:;" >
                        <i class="fa fa-search"></i>
                        <span>Fungsional Fhizra </span>
                    </a>
                    <ul class="sub">
                      <li class="sub-menu">
                      <a  href="javascript:;">
                        <i class="fa fa-search"></i> <span>By Souvenir</span></a>
                      <ul class="sub">
                        <li style="margin-top:10px">
                           <select class="form-control kota text-center" style="width:100%;margin-top:10px" id="select_f">
                              <?php                      
                              include('../connect.php');    
                              $querysearch="SELECT id, name FROM souvenir_type"; 
                              $hasil=mysqli_query($conn, $querysearch);

                                while($baris = mysqli_fetch_array($hasil)){
                                    $id=$baris['id'];
                                    $color=$baris['name'];
                                    echo "<option value='$id'>$color</option>";
                                }
                              ?>
                        </select>
                        </li>                                
                        <li><a onclick="angkot_sekitar_destination(4)" style="cursor:pointer;background:none">Search</a></li>
              </ul>
            </li>
          </ul>
        </li> -->
        <!-- <li class="sub-menu">
                    <a href="javascript:;" >
                        <i class="fa fa-search"></i>
                        <span>Fungsional Vira </span>
                    </a>
                    <ul class="sub">
                      <li class="sub-menu">
                      <a  href="javascript:;">
                        <i class="fa fa-search"></i> <span>By Hotel</span></a>
                      <ul class="sub">
                        <li style="margin-top:10px">
                           <select class="form-control kota text-center" style="width:100%;margin-top:10px" id="select_h">
                              <?php                      
                              include('../connect.php');    
                              $querysearch="SELECT id, name FROM room limit 5"; 
                              $hasil=mysqli_query($conn, $querysearch);

                                while($baris = mysqli_fetch_array($hasil)){
                                    $id=$baris['id'];
                                    $color=$baris['name'];
                                    echo "<option value='$color'>$color</option>";
                                }
                              ?>
                        </select>
                        </li>                                
                        <li><a onclick="angkot_sekitar_destination(5)" style="cursor:pointer;background:none">Search</a></li>
                          </ul>
            </li>
              </ul>
            </li>
            <li class="sub-menu">
                    <a href="javascript:;" >
                        <i class="fa fa-search"></i>
                        <span>Fungsional Zahra </span>
                    </a>
                    <ul class="sub">
                      <li class="sub-menu">
                      <a  href="javascript:;">
                        <i class="fa fa-search"></i> <span>By Culinary</span></a>
                      <ul class="sub">
                        <li style="margin-top:10px">
                           <select class="form-control kota text-center" style="width:100%;margin-top:10px" id="select_a">
                              <?php                      
                              include('../connect.php');    
                              $querysearch="SELECT id, name FROM culinary limit 5"; 
                              $hasil=mysqli_query($conn, $querysearch);

                                while($baris = mysqli_fetch_array($hasil)){
                                    $id=$baris['id'];
                                    $color=$baris['name'];
                                    echo "<option value='$color'>$color</option>";
                                }
                              ?>
                        </select>
                        </li>                                
                        <li><a onclick="angkot_sekitar_destination(6)" style="cursor:pointer;background:none">Search</a></li>
                          </ul>
            </li>
              </ul>
            </li>
            <li class="sub-menu">
                    <a href="javascript:;" >
                        <i class="fa fa-search"></i>
                        <span>Fungsional Yulia </span>
                    </a>
                    <ul class="sub">
                      <li class="sub-menu">
                      <a  href="javascript:;">
                        <i class="fa fa-search"></i> <span>By Event Worship</span></a>
                      <ul class="sub">
                        <li style="margin-top:10px">
                           <select class="form-control kota text-center" style="width:100%;margin-top:10px" id="select_f1_y">
                          <?php                      
                          include('../connect.php');    
                          $querysearch="SELECT id, name FROM event"; 
                          $hasil=mysqli_query($conn, $querysearch);

                            while($baris = mysqli_fetch_array($hasil)){
                                $id=$baris['id'];
                                $color=$baris['name'];
                                echo "<option value='$id'>$color</option>";
                            }
                          ?>
                        </select>
                        </li>                                
                        <li><a onclick="angkot_sekitar_destination(7)" style="cursor:pointer;background:none">Search</a></li>
                      </ul>
                    </li>
                  </ul>
                  </li> -->
              <!-- sidebar menu end-->
          </div>
      </aside>
      <!--sidebar end