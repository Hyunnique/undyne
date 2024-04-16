
	// Scripts (since 16.03.17) by MineSky (ja2462), KDMHS DC13

	var keyPressing = [];
	var targetFPS = 60; // this cannot be changed during gameplay, only for develop
	var movementSpeed = 2;
	var gameLoop = setInterval(game, 1000 / targetFPS);

	var Collider = [];
	var Undyne_Collider = [];

	// Undyne_Survival variables
	var isSurvival = false;
	var Undyne_note_scoring = 10;
	var noteCount = 0;

	// Sounds
	var audioVal = 0;
	var BGM = document.createElement("audio");
	var audio_sans = [];
	var audio_flowey = [];
	var audio_damage = [];
	var audio_undyne_arrow = [];
	var audioCase = "";

	var level = 1;
	var score = 0;
	var current_HP = 10;
	var maximum_HP = 10;
	var gameType = "";

	var button_selecter = 0;

	var sayQueue = "";
	var curQueue = "";
	var eventQueueType = "";
	var eventQueue = "";

	var say_paused = false;
	var sayCount = 0;

	var characterObject = $('._character');

	var tTime = Date.now();
	var fRate = 0;

	// Custom variables
	var Undyne_notes = [];
	var Undyne_timing = 0;
	var Undyne_showNext = true;

	$(window).resize(resize);

	$(window).on("click", function(e){
		if (say_paused)
		{
			curQueue = "";
			say_paused = false;
		}
	});
	function AnimatedInitialize()
	{
		$('.index_pageFadeIn').fadeOut(3000, Initialize);
	}

	function ui_refresh()
	{
		$('#game-love').html("LV " + level + " | ");
		$('#game-hp').html("HP : " + Math.round(current_HP * 100) / 100 + " / " + maximum_HP + " | ");
		$('#game-score').html("SCORE : " + score);

		if (isSurvival && current_HP <= 0)
		{
			Undyne_notes = [];
			BGM.pause();
		}

	}

	function Initialize()
	{
		/*
		Initialize Function.
		*/

		jQuery.fx.interval = 5;
		$('#frameRate').css("color", "white");
		$('.game').css("display", "block");
		
		resize();
		
		BGM.setAttribute("loop", "");
		BGM.volume = 0.7;

		for (var i = 0; i <= 4; i++)
		{
			audio_sans[i] = document.createElement("audio");
			audio_sans[i].setAttribute("src", "sound/sans.wav");
			audio_sans[i].volume = 1;

			audio_flowey[i] = document.createElement("audio");
			audio_flowey[i].setAttribute("src", "sound/flowey.wav");
			audio_flowey[i].volume = 1;

			audio_damage[i] = document.createElement("audio");
			audio_damage[i].setAttribute("src", "sound/damage.wav");
			audio_damage[i].volume = 1;

			audio_undyne_arrow[i] = document.createElement("audio");
			audio_undyne_arrow[i].setAttribute("src", "sound/undyne_arrow.wav");
			audio_undyne_arrow[i].volume = 1;

		}

		$('.gameline').hide();
		$('.game_raid').hide();
		$('.game_say').hide();

		if (tt==1)
		{
			pattern_intro();
			return;
		}

		if (ss!=0) pattern_undyne_undying_random(ss);
		else if (dd!=0) pattern_undyne_undying_survival();
		else pattern_undyne();
	}

	function resize()
	{
		var console_rect = GameRect('.game_console');
		$('.gameline').css({
			"top": (console_rect[2] + console_rect[3]) / 2 - parseFloat($('.gameline').height()) / 2,
			"left": (console_rect[0] + console_rect[1]) / 2 - parseFloat($('.gameline').width()) / 2
		});

		var gameline_rect = GameRect('.gameline');
		characterObject.css({
			"top": (gameline_rect[2] + gameline_rect[3]) / 2 - parseFloat(characterObject.height()) / 2,
			"left": (gameline_rect[0] + gameline_rect[1]) / 2 - parseFloat(characterObject.width()) / 2
		});
	}
	
	function raidImage(arg)
	{
		switch (arg)
		{
			case "UNDYNE":
				$('.game_raidimg').attr("src", "img/undyne.gif");
				$('.game_raidimg').css({
					"width": "130px",
					"height": "175px"
				});
				break;
			case "UNDYNE_UNDYING":
				$('.game_raidimg').attr("src", "img/undyne_undying.gif");
				$('.game_raidimg').css({
					"width": "250px",
					"height": "175px"
				});
		}
	}
	function sound_toggle(arg)
	{
		if (arg == "off")
		{
			$('.sound_display').attr("onclick", "sound_toggle('on');");
			$('.sound_display').html("SOUND : OFF");
			BGM.volume = 0;
			for (var i = 0; i <= 4; i++)
			{
				audio_flowey[i].volume = 0;
				audio_sans[i].volume = 0;
				audio_damage[i].volume = 0;
				audio_undyne_arrow[i].volume = 0;
			}
		}
		else if (arg == "on")
		{
			$('.sound_display').attr("onclick", "sound_toggle('off');");
			$('.sound_display').html("SOUND : ON");
			BGM.volume = 0.7;
			for (var i = 0; i <= 4; i++)
			{
				audio_flowey[i].volume = 1;
				audio_sans[i].volume = 1;
				audio_damage[i].volume = 1;
				audio_undyne_arrow[i].volume = 1;
			}
		}
	}

	function game()
	{
		var frameDate = Date.now();

		for (var h = 0; h < Collider.length; h++)
		{
			try
			{
				var ColliderObject = $(Collider[h]);

				var charT = characterObject.position().top;
				var charB = characterObject.height() + charT;
				var charL = characterObject.position().left;
				var charR = characterObject.width() + charL;

				var colT = ColliderObject.position().top;
				var colB = ColliderObject.height();
				var colL = ColliderObject.position().left;
				var colR = ColliderObject.width();

				if (colT >= charT - colB && colT <= charB && colL >= charL - colR && colL <= charR)
				{
					hitObject(Collider[h]);
				}
			}
			catch (e)
			{
				;
			}
		}

		for (var i = 0; i < keyPressing.length; i++)
		{
			switch (keyPressing[i])
			{
				case 37:
					if (parseFloat(characterObject.css("left")) >= parseFloat($('.gameline').css('left')) + 8)
					{
						characterObject.css("left", "-=" + movementSpeed + "px");
					}
					break;
				case 39:
					if (parseFloat(characterObject.css("left")) + parseFloat(characterObject.css("width")) <= parseFloat($('.gameline').css('left')) + parseFloat($('.gameline').css('width')))
					{
						characterObject.css("left", "+=" + movementSpeed + "px");
					}
					break;
				case 38:
					if (parseFloat(characterObject.css("top")) >= parseFloat($('.gameline').css('top')) + 8)
					{
						characterObject.css("top", "-=" + movementSpeed + "px");
						}
					break;
				case 40:
					if (parseFloat(characterObject.css("top")) + parseFloat(characterObject.css("height")) <= parseFloat($('.gameline').css('top')) + parseFloat($('.gameline').css('height')))
					{
						characterObject.css("top", "+=" + movementSpeed + "px");
					}
					break;
			}
		}

		fRate++;
		if ((frameDate - tTime) >= 1000)
		{
			document.getElementById("frameRate").innerHTML = "FPS : " + fRate;
			fRate = 0;
			tTime = frameDate;
		}

		sayCount++;

		if (sayCount >= 3 && sayQueue != "")
		{
			// |  =  return pause signal, say will cleared when pressing Z.
			// $  =  30 frame break.
			// @  =  <br>

			if (sayQueue.substring(0, 1) == "|")
			{
				say_paused = true;
				sayQueue = sayQueue.substring(1, sayQueue.length);
			}
			else if (sayQueue.substring(0, 1) == "$")
			{
				sayCount = -27;
				sayQueue = sayQueue.substring(1, sayQueue.length);
			}
			else if (sayQueue.substring(0, 1) == "@")
			{
				sayCount = -1;
				curQueue = curQueue + "<br>";
				sayQueue = sayQueue.substring(1, sayQueue.length);
			}

			if (!say_paused && sayCount > 0)
			{
				sayCount = 0;
				curQueue = curQueue + sayQueue.substring(0, 1);
				$('.game_say').html(curQueue);
				sayQueue = sayQueue.substring(1, sayQueue.length);

				audioVal++;
				if (audioVal >= 5) audioVal = 0;

				switch (audioCase)
				{
					case "SANS":
						audio_sans[audioVal].play();
						break;
					case "FLOWEY":
						audio_flowey[audioVal].play();
						break;

				}
				
			}
		}
		else if (sayQueue == "" && !say_paused && eventQueue != "" && eventQueueType != "")
		{
			say_paused = true;
			$('.game_say').html("");
			$('.game_say').hide();

			var tType = eventQueueType;
			var tVal = eventQueue;

			eventQueueType = "";
			eventQueue = "";

			switch (tType)
			{
				case "pattern":
					pattern_eventFinder(tVal);
					break;
			}
		}

		if (gameType == "UNDYNE")
		{
			var Undyne_time = frameDate - Undyne_timing;

			for (var i = Undyne_notes.length - 1; i >= 0; i--)
			{
				if (Undyne_time >= Undyne_notes[i][0] - Undyne_notes[i][1])
				{
					switch (Undyne_notes[i][2])
					{
						case 0:
							$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");

							if (Undyne_notes[i][3] == 0)
							{
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_test_d_0.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "24px",
									"height": "26px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 - 500,
									"left": characterObject.position().left + characterObject.width() / 2 - 12
								}).animate({
									"top": characterObject.position().top + characterObject.height() / 2
								},
								{
									duration: Undyne_notes[i][1],
									easing: "linear"
								});
							}
							else if (Undyne_notes[i][3] == 1)
							{
								var AtDura = Undyne_notes[i][1];
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_testx_arrow_2.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "24px",
									"height": "26px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 - 500,
									"left": characterObject.position().left + characterObject.width() / 2 - 12
								}).animate({
									"top": characterObject.position().top + characterObject.height() / 2 - (500 * (4 / 10))
								},
								{
									duration: parseInt(Undyne_notes[i][1] * (6 / 10)),
									easing: "linear",
									complete: function()
									{
										$(this).animate({
											"top": characterObject.position().top + characterObject.height() / 2 + (500 * (4 / 10))
										},
										{
											duration: 200,
											easing: "linear",
											queue: false
										}).animate({
											"left": "+=50px"
										},
										{
											duration: 40,
											easing: "linear",
											queue: false,
											complete: function()
											{
												$(this).delay(120).animate({
													"left": "-=50px"
												},
												{
													duration: 40,
													easing: "linear",
													complete: function()
													{
														$(this).css({
															"background-image": "url(img/spr_bullet_testx_arrow_2.png)"
														}).animate({
															"top": characterObject.position().top + characterObject.height() / 2
														},
														{
															duration: parseInt(AtDura * (4 / 10)) - 200,
															easing: "linear"
														});
													}
												});
											}
										});
									}
								});
							}
							break;
						case 1:
							$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");

							if (Undyne_notes[i][3] == 0)
							{
								$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_test_l_0.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "26px",
									"height": "24px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 - 12,
									"left": characterObject.position().left + characterObject.width() / 2 - 500
								}).animate({
									"left": characterObject.position().left + characterObject.width() / 2
								},
								{
									duration: Undyne_notes[i][1],
									easing: "linear"
								});
							}
							else if (Undyne_notes[i][3] == 1)
							{
								var AtDura = Undyne_notes[i][1];
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_testx_arrow_1.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "26px",
									"height": "24px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 - 12,
									"left": characterObject.position().left + characterObject.width() / 2 - 500
								}).animate({
									"left": characterObject.position().left + characterObject.width() / 2 - (500 * (4 / 10))
								},
								{
									duration: parseInt(Undyne_notes[i][1] * (6 / 10)),
									easing: "linear",
									complete: function()
									{
										$(this).animate({
											"left": characterObject.position().left + characterObject.width() / 2 + (500 * (4 / 10))
										},
										{
											duration: 200,
											easing: "linear",
											queue: false
										}).animate({
											"top": "+=50px"
										},
										{
											duration: 40,
											easing: "linear",
											queue: false,
											complete: function()
											{
												$(this).delay(120).animate({
													"top": "-=50px"
												},
												{
													duration: 40,
													easing: "linear",
													complete: function()
													{
														$(this).css({
															"background-image": "url(img/spr_bullet_testx_arrow_1.png)"
														}).animate({
															"left": characterObject.position().left + characterObject.width() / 2
														},
														{
															duration: parseInt(AtDura * (4 / 10)) - 200,
															easing: "linear"
														});
													}
												});
											}
										});
									}
								});
							}
							break;
						case 2:
							$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");

							if (Undyne_notes[i][3] == 0)
							{
								$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_test_u_0.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "24px",
									"height": "26px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 + 500,
									"left": characterObject.position().left + characterObject.width() / 2 - 12
								}).animate({
									"top": characterObject.position().top + characterObject.height() / 2 - 26,
								},
								{
									duration: Undyne_notes[i][1],
									easing: "linear"
								});
							}
							else if (Undyne_notes[i][3] == 1)
							{
								var AtDura = Undyne_notes[i][1];
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_testx_arrow_3.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "24px",
									"height": "26px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 + 500,
									"left": characterObject.position().left + characterObject.width() / 2 - 12
								}).animate({
									"top": characterObject.position().top + characterObject.height() / 2 - 26 + (500 * (4 / 10))
								},
								{
									duration: parseInt(Undyne_notes[i][1] * (6 / 10)),
									easing: "linear",
									complete: function()
									{
										$(this).animate({
											"top": characterObject.position().top + characterObject.height() / 2 - (500 * (4 / 10))
										},
										{
											duration: 200,
											easing: "linear",
											queue: false
										}).animate({
											"left": "-=50px"
										},
										{
											duration: 40,
											easing: "linear",
											queue: false,
											complete: function()
											{
												$(this).delay(120).animate({
													"left": "+=50px"
												},
												{
													duration: 40,
													easing: "linear",
													complete: function()
													{
														$(this).css({
															"background-image": "url(img/spr_bullet_testx_arrow_3.png)"
														}).animate({
															"top": characterObject.position().top + characterObject.height() / 2
														},
														{
															duration: parseInt(AtDura * (4 / 10)) - 200,
															easing: "linear"
														});
													}
												});
											}
										});
									}
								});
							}
							break;
						case 3:
							$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");

							if (Undyne_notes[i][3] == 0)
							{
								$('.game_console').append("<div id=\"undyne_note_" + Undyne_notes[i][0] + "\" class=\"undyne_arrow\"></div>");
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_test_r_0.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "26px",
									"height": "24px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 - 12,
									"left": characterObject.position().left + characterObject.width() / 2 + 500
								}).animate({
									"top": characterObject.position().top + characterObject.height() / 2 - 12,
									"left": characterObject.position().left + characterObject.width() / 2 - 26
								},
								{
									duration: Undyne_notes[i][1],
									easing: "linear"
								});
							}
							else if (Undyne_notes[i][3] == 1)
							{
								var AtDura = Undyne_notes[i][1];
								$('#undyne_note_' + Undyne_notes[i][0]).css({
									"background-image": "url(img/spr_bullet_testx_arrow_0.png)",
									"background-size": "cover",
									"background-repeat": "no-repeat",
									"width": "26px",
									"height": "24px",
									"position": "fixed",
									"top": characterObject.position().top + characterObject.height() / 2 - 12,
									"left": characterObject.position().left + characterObject.width() / 2 + 500
								}).animate({
									"left": characterObject.position().left + characterObject.width() / 2 - 26 + (500 * (4 / 10))
								},
								{
									duration: parseInt(Undyne_notes[i][1] * (6 / 10)),
									easing: "linear",
									complete: function()
									{
										$(this).animate({
											"left": characterObject.position().left + characterObject.width() / 2 - (500 * (4 / 10))
										},
										{
											duration: 200,
											easing: "linear",
											queue: false
										}).animate({
											"top": "-=50px"
										},
										{
											duration: 40,
											easing: "linear",
											queue: false,
											complete: function()
											{
												$(this).delay(120).animate({
													"top": "+=50px"
												},
												{
													duration: 40,
													easing: "linear",
													complete: function()
													{
														$(this).css({
															"background-image": "url(img/spr_bullet_testx_arrow_0.png)"
														}).animate({
															"left": characterObject.position().left + characterObject.width() / 2
														},
														{
															duration: parseInt(AtDura * (4 / 10)) - 200,
															easing: "linear"
														});
													}
												});
											}
										});
									}
								});
							}
							break;
					}

					Undyne_Collider.push([]);
					Undyne_Collider[Undyne_Collider.length - 1].push('undyne_note_' + Undyne_notes[i][0], Undyne_notes[i][2], Undyne_notes[i][0], Undyne_notes[i][1], Undyne_notes[i][3]);

					Undyne_notes.splice(i, 1);
				}
			}

			Undyne_collider_check();
		}
	}

	function Undyne_collider_check()
	{
		var ClosestElement = ["", "", 999999999];
		for (var i = Undyne_Collider.length - 1; i >= 0; i--)
		{
			if (Undyne_Collider[i][2] < ClosestElement[2]) ClosestElement = Undyne_Collider[i];

			var characterObject_rect = document.getElementById('_character').getBoundingClientRect();
			var ColliderObject_rect = document.getElementById(Undyne_Collider[i][0]).getBoundingClientRect();
			var spear_rect = document.getElementById('undyne_spear_hitbox').getBoundingClientRect();

			var charT = characterObject_rect.top;
			var charB = characterObject_rect.bottom;
			var charL = characterObject_rect.left;
			var charR = characterObject_rect.right;

			var colT = ColliderObject_rect.top;
			var colB = ColliderObject_rect.bottom - colT;
			var colL = ColliderObject_rect.left;
			var colR = ColliderObject_rect.right - colL;

			var char2T = spear_rect.top;
			var char2B = spear_rect.bottom;
			var char2L = spear_rect.left;
			var char2R = spear_rect.right;


			var col2T, col2B, col2L, col2R;

			var hitRange = 8;

			if (Undyne_Collider[i][4] == 0)
			{
				switch (Undyne_Collider[i][1])
				{
					case 0:
						col2T = ColliderObject_rect.bottom - hitRange;
						col2B = hitRange;
						col2L = ColliderObject_rect.left;
						col2R = ColliderObject_rect.right - col2L;
						break;
					case 1:
						col2T = ColliderObject_rect.top;
						col2B = ColliderObject_rect.bottom - col2T;
						col2L = ColliderObject_rect.right - hitRange;
						col2R = hitRange;
						break;
					case 2:
						col2T = ColliderObject_rect.top;
						col2B = hitRange;
						col2L = ColliderObject_rect.left;
						col2R = ColliderObject_rect.right - col2L;
						break;
					case 3:
						
						col2T = ColliderObject_rect.top;
						col2B = ColliderObject_rect.bottom - col2T;
						col2L = ColliderObject_rect.left;
						col2R = hitRange;
						break;
				}
			}
			else if (Undyne_Collider[i][4] == 1)
			{
				switch (Undyne_Collider[i][1])
				{
					case 2:
						col2T = ColliderObject_rect.bottom - hitRange;
						col2B = hitRange;
						col2L = ColliderObject_rect.left;
						col2R = ColliderObject_rect.right - col2L;
						break;
					case 3:
						col2T = ColliderObject_rect.top;
						col2B = ColliderObject_rect.bottom - col2T;
						col2L = ColliderObject_rect.right - hitRange;
						col2R = hitRange;
						break;
					case 0:
						col2T = ColliderObject_rect.top;
						col2B = hitRange;
						col2L = ColliderObject_rect.left;
						col2R = ColliderObject_rect.right - col2L;
						break;
					case 1:
						
						col2T = ColliderObject_rect.top;
						col2B = ColliderObject_rect.bottom - col2T;
						col2L = ColliderObject_rect.left;
						col2R = hitRange;
						break;
				}
			}


			if (colT >= charT - colB && colT <= charB && colL >= charL - colR && colL <= charR)
			{
				$('#' + Undyne_Collider[i][0]).remove();
				Undyne_Collider.splice(i, 1);
				current_HP--;
				score -= Undyne_note_scoring * 3;
				ui_refresh();

				audioVal++;
				if (audioVal >= 5) audioVal = 0;
				audio_damage[audioVal].play();

				undyne_survival_calc();
			}
			else if (col2T >= char2T - col2B && col2T <= char2B && col2L >= char2L - col2R && col2L <= char2R)
			{
				$('#' + Undyne_Collider[i][0]).remove();
				Undyne_Collider.splice(i, 1);
				score += Undyne_note_scoring;
				noteCount++;
				if (current_HP < maximum_HP) current_HP += 0.05;
				ui_refresh();

				audioVal++;
				if (audioVal >= 5) audioVal = 0;
				audio_undyne_arrow[audioVal].play();

				undyne_survival_calc();
			}
		}

		if ($('#' + ClosestElement[0]) && ClosestElement[4] == 0 && Undyne_showNext)
		{
			switch (ClosestElement[1])
			{
				case 0:
					$('#' + ClosestElement[0]).css("background-image", "url(img/spr_bullet_test_d_1.png)");
					break;
				case 1:
					$('#' + ClosestElement[0]).css("background-image", "url(img/spr_bullet_test_l_1.png)");
					break;
				case 2:
					$('#' + ClosestElement[0]).css("background-image", "url(img/spr_bullet_test_u_1.png)");
					break;
				case 3:
					$('#' + ClosestElement[0]).css("background-image", "url(img/spr_bullet_test_r_1.png)");
					break;
			}
		}
	}

	function undyne_survival_calc()
	{
		if (noteCount >= 30 + (level * 15))
		{
			noteCount = 0;
			level++;
			Undyne_note_scoring += 5 + level;
			Undyne_notes = [];
			Undyne_timing = Date.now();
			current_HP = 9 + level;
			maximum_HP = 9 + level;

			var sTiming = 3000;
			var noteSpeed = 2000;
			var ChangerCount = 5;
			var cCounter = 0;
			var revCount = 24;
			var isReversed = 0;

			for (var i = 0; i < 200 + level * 30; i++)
			{
				if (level < 20) revCount = 20 - level;
				else revCount = 1;

				cCounter++;
				sTiming += parseInt(Math.random() * (340 - level * 20) + 260 - (level * 20));

				if (parseInt(Math.random() * revCount) >= revCount - 1) isReversed = 1;
				else isReversed = 0;

				if (cCounter == ChangerCount)
				{
					noteSpeed = parseInt(Math.random() * (700 - level * 15) + 900 - (level * 15));
					ChangerCount = parseInt(Math.random() * 6 + 1);
					cCounter = 0;
				}

				undyne_addnote(sTiming, noteSpeed, parseInt(Math.random() * 4), isReversed);
			}
		}
	}

	$(document).on('keydown', function(e){ // keyDown Handler
		if (e.which == 116)
		{
			// F5
			e.preventDefault();
			return;
		}

		if (e.which == 8)
		{
			// Backspace
			e.preventDefault();
			return;
		}

		if (e.which == 27)
		{
			// ESC
		}

		switch (gameType)
		{
			case "AWAIT":
				say_keycheck(e);
				break;
			case "SELECT":
				if (e.which == 39 && button_selecter < 3) button_selecter++;
				if (e.which == 37 && button_selecter > 0) button_selecter--;

				select_button();

				if (e.which == 90 || e.which == 13)
				{
					
				}

				break;
			case "PLANE":
				say_keycheck(e);

				for (var i = 0; i < keyPressing.length; i++)
				{
					if (keyPressing[i] == e.which) return;
				}

				keyPressing.push(e.which);

				break;

			case "UNDYNE":
				say_keycheck(e);

				undyne_keycheck(e.which);

		}
	});

	function say_keycheck(e)
	{
		if ((e.which == 90 || e.which == 13) && say_paused)
		{
			curQueue = "";
			say_paused = false;
		}
		if ((e.which == 88 || e.which == 16) && !say_paused)
		{
			var ssTemp = sayQueue.split('|')[0];
			ssTemp = ssTemp.replace(/\$/gi, "").replace(/@/gi, "<br>");

			curQueue = curQueue + ssTemp;

			var TempSpliter = "";
			for (var k = 1; k < sayQueue.split('|').length; k++)
			{
				TempSpliter = TempSpliter + sayQueue.split('|')[k] + "|";
			}

			if (sayQueue.split('|')[1] == undefined) sayQueue = "";
			else sayQueue = TempSpliter;
			$('.game_say').html(curQueue);
			say_paused = true;
		}

		return;
	}

	function undyne_keycheck(keycode)
	{
		switch (keycode)
		{
			case 38:
				$('.undyne_spear').css({
					"top": characterObject.position().top - 26,
					"left": characterObject.position().left + characterObject.width() / 2 - $('.undyne_spear').width() / 2,
					"-ms-transform": "rotate(0deg)",
					"-webkit-transform": "rotate(0deg)",
					"transform": "rotate(0deg)"
				});
				break;
			case 40:
				$('.undyne_spear').css({
					"top": characterObject.position().top + characterObject.height() + 20 - $('.undyne_spear').height(),
					"left": characterObject.position().left + characterObject.width() / 2 - $('.undyne_spear').width() / 2,
					"-ms-transform": "rotate(180deg)",
					"-webkit-transform": "rotate(180deg)",
					"transform": "rotate(180deg)"
				});
				break;
			case 37:
				$('.undyne_spear').css({
					"top": characterObject.position().top + characterObject.height() / 2 - 6,
					"left": characterObject.position().left - 20  - $('.undyne_spear').width() / 2,
					"-ms-transform": "rotate(270deg)",
					"-webkit-transform": "rotate(270deg)",
					"transform": "rotate(270deg)"
				});
				break;
			case 39:
				$('.undyne_spear').css({
					"top": characterObject.position().top + characterObject.height() / 2 - 6,
					"left": characterObject.position().left + characterObject.width() + 20 - $('.undyne_spear').width() / 2,
					"-ms-transform": "rotate(90deg)",
					"-webkit-transform": "rotate(90deg)",
					"transform": "rotate(90deg)"
				});
		}
	}

	$(document).on('keyup', function(e){
		for (var i = 0; i < keyPressing.length; i++)
		{
			if (keyPressing[i] == e.which) delete keyPressing[i];
		}
	});

	function GameRect(obj)
	{
		var leftPos  = $(obj)[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
		var rightPos = $(obj)[0].getBoundingClientRect().right  + $(window)['scrollLeft']();
		var topPos   = $(obj)[0].getBoundingClientRect().top    + $(window)['scrollTop']();
		var bottomPos= $(obj)[0].getBoundingClientRect().bottom + $(window)['scrollTop']();
		return [leftPos, rightPos, topPos, bottomPos];
	}

	function play_bgm(target)
	{
		switch (target)
		{
			case "FLOWEY":
				BGM.setAttribute("src", "sound/bgm_flowey.mp3");
				break;
			case "SANS":
				BGM.setAttribute("src", "sound/bgm_sans.mp3");
				break;
			case "UNDYNE":
				BGM.setAttribute("src", "sound/bgm_undyne.ogg");
				break;
			case "UNDYNE_UNDYING":
				BGM.setAttribute("src", "sound/bgm_undyne_undying.ogg");
				break;
		}

		BGM.play();
	}

	function change_gametype(type)
	{
		gameType = type;

		switch (type)
		{
			case "AWAIT":
				break;
			case "SELECT":
				$('.gameline').hide();
				button_selecter = 0;
				select_button();
				break;
			case "PLANE":
				$('.gameline').fadeIn(1000);
				var gameline_rect = GameRect('.gameline');
				characterObject.css({
					"top": (gameline_rect[2] + gameline_rect[3]) / 2 - parseFloat(characterObject.height()) / 2,
					"left": (gameline_rect[0] + gameline_rect[1]) / 2 - parseFloat(characterObject.width()) / 2
				});
				break;
			case "UNDYNE":
				$('.gameline').fadeIn(1000);
				Undyne_timing = Date.now();
				$('.gameline').css({
					"width": "75px",
					"height": "75px",
				});
				resize();
				var gameline_rect = GameRect('.gameline');
				characterObject.css({
					"top": (gameline_rect[2] + gameline_rect[3]) / 2 - parseFloat(characterObject.height()) / 2,
					"left": (gameline_rect[0] + gameline_rect[1]) / 2 - parseFloat(characterObject.width()) / 2,
					"background-image": "url(img/soul_green.png)"
				});
				$('.gameline').append("<div id=\"undyne_spear\" class=\"undyne_spear\"><div id=\"undyne_spear_hitbox\"></div></div>");

				undyne_keycheck(38);
		}
	}

	function select_button()
	{
		$('.game_button').css({
			"border": "3px solid coral",
			"color": "coral"
		});

		var TempObject = $('#button_fight');
		switch (button_selecter)
		{
			case 0:
				TempObject = $('#button_fight');
				break;
			case 1:
				TempObject = $('#button_act');
				break;
			case 2:
				TempObject = $('#button_item');
				break;
			case 3:
				TempObject = $('#button_mercy');
				break;
		}

		TempObject.css({
			"border": "3px solid yellow",
			"color": "yellow"
		});
	}

	function say(something)
	{
		sayCount = -60;
		sayQueue = something;
		$('.game_say').show();

		$('.game_say').html("");
		curQueue = "";
		say_paused = false;
		return;
	}

	function notice(something)
	{
		$('.game_notice').html(something);
	}