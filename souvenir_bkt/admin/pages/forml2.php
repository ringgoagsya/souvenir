<!-- <div class="col-xs-8 col-sm-10 col-md-10 col-lg-5">
                            <div class="panel panel-bd " >
                                <div class="panel-heading" style="height:45px;"> -->


<?php if (isset($_GET['id'])){
	$id_small_industry=$_GET['id'];
	//$id_culinary=$_GET['id_culinary'];
?>

<form class="" role="form" action="act/uplayprocess2.php" method="post">
<button type="submit" class="btn btn-primary" style="float:right"><i class="fa fa-floppy-o"></i> Simpan</button>
<div class="row" style="clear:both;">
<div class="col-xs-5">
	<div class="box">
		<div class="box-body">
		<h4 style="text-transform:capitalize;">Daftar Produk</h4>
			<div id="forml">
				<input type="text" class="form-control hidden" id="id" name="id" value="<?php echo $id_small_industry ?>">
					
					<table class="table table-hover table-bordered table-striped">
					<thead><th>  </th><th>Produk</th><th>Harga</th></thead>
					<tbody>
					<script>
						function enable(id)
						{
							var inputHarga = document.getElementById('harga'+id.value)
							if(id.checked){
								inputHarga.value = "";
								inputHarga.disabled = false;
							} else {
								inputHarga.value = 0;
								inputHarga.disabled = true;
							}
						}
					</script>
					<tr>

					</tr>
						<?php
							$sql2 = "SELECT * FROM product_small_industry order by product";
							$hasil=mysqli_query($conn,$sql2);
							while($dt = mysqli_fetch_array($hasil))
							{ ?> <tr> <?php
								$sql3 = "SELECT * FROM detail_product_small_industry where id_small_industry='$id_small_industry' and id_product=$dt[id]";
								$hasill=mysqli_query($conn,$sql3);
								$data3 = mysqli_fetch_array($hasill);
								if ($dt['id']==$data3['id_product']){
									echo "<td><input name='product_small_industry[]' value=\"$dt[id]\" type='checkbox' style='width:25px' onClick='enable(this)' checked=\"\"></td><td>$dt[product]</td>";
									echo"<td><input class='form-control ' type='number' style='margin-bottom:10px;width:200px' id='harga".$dt['id']."' value='$data3[price]' name='harga".$dt['id']."'></td>";
									
								}else{
									echo "<td><input name='product_small_industry[]' value=\"$dt[id]\" type='checkbox' onClick='enable(this)' style='width:25px'></td><td>$dt[product]</td>";
									echo"<td><input class='form-control ' type='number' style='margin-bottom:10px;
																		width:200px' id='harga".$dt['id']."'  name='harga".$dt['id']."' value='0' disabled></td>";
								}
							
						?> </tr>
						<?php } ?>
					</tbody>
					</table>

			</div>
		</div>
	</div><!-- /.box -->
</div><!-- /.col -->
</div>
</form>

<?php } ?>

<!-- </div>
</div>
</div> -->
