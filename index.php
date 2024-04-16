<?php
	if ($_GET['skip'] == "y") $s = "\"start();\"";
	else $s = "\"Initialize();\"";
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Undertale Development</title>
	<link rel="shortcut icon" href="img/heart.png">
	<link rel="stylesheet" href="css/intro.css">
	<script src="js/jquery.js"></script>
	<script src="js/jquery-ui.js"></script>
</head>
<body onload=<?php echo $s; ?>>
	<div class="intro">
		<img src="img/undertale_logo.png">
	</div>
	<div class="desc">
		--- Instruction ---<br><br>
		[Z or ENTER] - Confirm<br>
		[X or SHIFT] - Cancel<br>
		[C or CTRL] - Menu (In game)<br>
		[F11] - Full Screen (Depends on browser)<br>
		[Hold ESC] - Quit
	</div>
	<div class="index_main">
		Name the fallen human.
		<p class="index_myname"></p>
		<div class="naming_pad">

		</div>
		<div class="naming_menu">

		</div>
		<form name="postForm" method="GET" action="game.php">
		<!-- for Debug, 추후에 POST로 변경 -->
			<input type="hidden" id="postData" name="name">
		</form>
		<div class="index_p"><?php echo $_GET['p']; ?></p>
	</div>

	<div class="index_pageFadeout"></div> 	
	<script src="js/intro.js"></script>
</body>
</html>