
	var case_selecter_x = 0;
	var case_selecter_y = 0;
	var Alphabetical_array = [];
	var isInputWaiting = false;
	var Started = false;
	var AudioE = document.createElement('audio');

	Alphabetical_array.push(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
	Alphabetical_array.push(['H', 'I', 'J', 'K', 'L', 'M', 'N']);
	Alphabetical_array.push(['O', 'P', 'Q', 'R', 'S', 'T', 'U']);
	Alphabetical_array.push(['V', 'W', 'X', 'Y', 'Z']);
	Alphabetical_array.push(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
	Alphabetical_array.push(['h', 'i', 'j', 'k', 'l', 'm', 'n']);
	Alphabetical_array.push(['o', 'p', 'q', 'r', 's', 't', 'u']);
	Alphabetical_array.push(['v', 'w', 'x', 'y', 'z']);
	Alphabetical_array.push(['Quit', 'Backspace', 'Done']);

	$(window).resize(resize);
	resize();

	function resize()
	{
		// By Resolution
		$('.intro').css({
			"top": parseFloat($(window).height()) / 2 - parseFloat($('.intro').css('height')) / 2,
			"left": parseFloat($(window).width()) / 2 - parseFloat($('.intro').css("width")) / 2
		});
		$('.desc').css({
			"top": parseFloat($(window).height()) / 2 - parseFloat($('.desc').css('height')) / 2,
			"left": parseFloat($(window).width()) / 2 - parseFloat($('.desc').css("width")) / 2
		});
		$('.index_main').css({
			"top": parseFloat($(window).height()) / 2 - parseFloat($('.index_main').css('height')) / 2,
			"left": parseFloat($(window).width()) / 2 - parseFloat($('.index_main').css("width")) / 2
		});
	}

	function Initialize()
	{
		$('.intro').fadeIn(1000).delay(1500).fadeOut(1000, description);
	}

	function description()
	{
		$('.desc').show();
		isInputWaiting = true;
	}

	function start()
	{
		Started = true;
		naming();

		$('.index_main').show();
		AudioE.setAttribute("src", "sound/intro.mp3");
		AudioE.setAttribute("loop", "");
		AudioE.play();
	}

	function naming()
	{
		for (var i = 0; i < 8; i++)
		{
			if (i == 4) $('.naming_pad').append("<div style=\"display: block; margin-top: 8px\"></div>");
			else $('.naming_pad').append("<div style=\"display: block;\"></div>");
			for (var j = 0; j < Alphabetical_array[i].length; j++)
			{
				$('.naming_pad').append("<div class=\"intro_char\" id=\"char_" + i + j + "\">" + Alphabetical_array[i][j] + "</div>");
			}
		}

		$('.naming_pad').append("<div style=\"display: block; margin-top: 15px;\"></div>");

		for (var j = 0; j < Alphabetical_array[8].length; j++)
		{
			$('.naming_menu').append("<div class=\"intro_menu" + j + "\" id=\"char_8" + j + "\">" + Alphabetical_array[8][j] + "</div>");
		}
		$('#char_00').css("color", "yellow");
	}

	$(document).on('keydown', function(e){
		if (isInputWaiting && (e.which == 90 || e.which == 13))
		{
			$('.desc').css("display", "none");
			isInputWaiting = false;
			start();
			return;
		}

		if (!Started) return;
		$('#char_' + case_selecter_y.toString() + case_selecter_x.toString()).css("color", "white");
		switch (e.which)
		{
			case 37:
				if (case_selecter_x > 0) case_selecter_x--;
				break;
			case 39:
				if ((case_selecter_y < 3 || (case_selecter_y > 3 && case_selecter_y < 7)) && case_selecter_x < 6) case_selecter_x++;
				if ((case_selecter_y == 3 || case_selecter_y == 7) && case_selecter_x < 4) case_selecter_x++;
				if ((case_selecter_y == 8) && case_selecter_x < 2) case_selecter_x++;
				break;
			case 38:
				if (case_selecter_y > 0) case_selecter_y--;
				if (!Alphabetical_array[case_selecter_y][case_selecter_x]) case_selecter_y++;
				break;
			case 40:
				if (case_selecter_y < 8) case_selecter_y++;
				if (case_selecter_y == 8)
				{
					switch (case_selecter_x)
					{
						case 0:
							case_selecter_x = 0;
							break;
						case 1:
							case_selecter_x = 0;
							break;
						case 2:
							case_selecter_x = 1;
							break;
						case 3:
							case_selecter_x = 2;
							break;
						case 4:
							case_selecter_x = 2;
							break;
					}
				}
				if (!Alphabetical_array[case_selecter_y][case_selecter_x]) case_selecter_y--;
				break;
			case 90: // Z
				key_enter();
				break;
			case 13: // Enter
				key_enter();
				break;
			case 88: // X
				key_delete();
				break;
			case 16: // SHIFT
				key_delete();
				break;
		}
		$('#char_' + case_selecter_y.toString() + case_selecter_x.toString()).css("color", "yellow");
	});

	function key_enter()
	{
		if (case_selecter_y != 8)
		{
			if ($('.index_myname').html().length < 10) $('.index_myname').html($('.index_myname').html() + Alphabetical_array[case_selecter_y][case_selecter_x]);
		}
		else
		{
			switch (Alphabetical_array[case_selecter_y][case_selecter_x])
			{
				case "Quit":
					quit();
					break;
				case "Backspace":
					key_delete();
					break;
				case "Done":
					switch ($('.index_myname').html().toLowerCase())
					{
						case "gaster":
							quit();
							return;
					}
					$('#postData').val($('.index_myname').html());

					AudioE.pause();
					var AudioF = document.createElement('audio');
					AudioF.setAttribute("src", "sound/mus_cymbal.ogg");
					AudioF.play();
					$('.index_pageFadeout').fadeIn(5000, doSubmit);
					break;
			}
		}
	}

	function doSubmit()
	{
		document.postForm.submit();
	}

	function key_delete()
	{
		var t = $('.index_myname').html();
		if (t.length > 0) $('.index_myname').html(t.substring(0, t.length - 1));
	}

	function quit()
	{
		location.replace("index.php");
	}