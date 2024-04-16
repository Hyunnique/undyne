function pattern_eventFinder(targetEvent)
{
	switch (targetEvent)
	{
		case "TUTORIAL":
			pattern_tutorial();
			break;
		case "TUTORIAL_01":
			pattern_tutorial_01();
			break;
		case "TUTORIAL_02":
			pattern_tutorial_02();
			break;
		case "TUTORIAL_02_AGAIN":
			pattern_tutorial_02_again();
			break;
		case "TUTORIAL_03":
			pattern_tutorial_03();
			break;
	}
}

function pattern_intro()
{
	audioCase = "FLOWEY";
	$('.game_raidimg').attr("src", "img/flowey.gif");
	change_gametype("AWAIT");
	play_bgm("FLOWEY");

	$('.game_raid').fadeIn(1000, function(){
		say("Howdy!@$$I'm FLOWEY.@$$FLOWEY the FLOWER!|Hmmm$.$.$.|You're new to the UNDERGROUND, $$aren'tcha?|Golly, $you must be so confused.|Someone ought to teach you how things work around here!|I guess little old me will have to do.|Ready?$$@Here we go!|");
		eventQueueType = "pattern";
		eventQueue = "TUTORIAL";
	});
}

function pattern_tutorial()
{
	change_gametype("PLANE");

	say("See that heart?@$That is your SOUL,$@the very culmination of your being!|Your SOUL starts off weak, $but can grow strong if you gain a lot of LV.|What's LV stand for?@$$Why, $LOVE, $of course!|Don't worry,@$I'll share some with you!|");
	eventQueueType = "pattern";
	eventQueue = "TUTORIAL_01";
}

var Timer_flowey_love_blink;
var flowey_love_blink_bool = false;

function pattern_tutorial_01()
{
	var gameRaid_wCenter = $('.game_raidimg').position().left + parseFloat($('.game_raidimg').width()) / 2;
	$('.game_screen').append("<div id=\"love01\" class=\"gameObject_love_flowey\"></div>");
	$('#love01').css({
		"top": $('.game_raidimg').position().top,
		"left": gameRaid_wCenter - 84
	});

	$('.game_screen').append("<div id=\"love02\" class=\"gameObject_love_flowey\"></div>");
	$('#love02').css({
		"top": $('.game_raidimg').position().top - 20,
		"left": gameRaid_wCenter - 44
	});
	
	$('.game_screen').append("<div id=\"love03\" class=\"gameObject_love_flowey\"></div>");
	$('#love03').css({
		"top": $('.game_raidimg').position().top - 30,
		"left": gameRaid_wCenter - 4
	});
	
	$('.game_screen').append("<div id=\"love04\" class=\"gameObject_love_flowey\"></div>");
	$('#love04').css({
		"top": $('.game_raidimg').position().top - 20,
		"left": gameRaid_wCenter + 36
	});
	
	$('.game_screen').append("<div id=\"love05\" class=\"gameObject_love_flowey\"></div>");
	$('#love05').css({
		"top": $('.game_raidimg').position().top,
		"left": gameRaid_wCenter + 76
	});

	Timer_flowey_love_blink = setInterval(function()
	{
		if (flowey_love_blink_bool)
		{
			$('.gameObject_love_flowey').css({
				"width": 4,
				"height": 8
			});
			flowey_love_blink_bool = false;
		}
		else
		{
			$('.gameObject_love_flowey').css({
				"width": 8,
				"height": 4
			});
			flowey_love_blink_bool = true;
		}
	}, 100);
	Collider.push("#love01", "#love02", "#love03", "#love04", "#love05");

	$('.gameObject_love_flowey').fadeIn(1000);

	say("Down here, $LOVE is shared through...|Little white...@$$$$\"friendliness pellets.\"|Are you ready?|Move around!$@Get as many as you can!$$");
	eventQueueType = "pattern";
	eventQueue = "TUTORIAL_02";
	
	return;
}

function pattern_tutorial_02()
{
	$('.gameObject_love_flowey').animate({
		"top": $('.game_console').position().top + parseFloat($('.game_console').height()),
		"left": $('._character').position().left
	},
	{
		duration: 3000,
		easing: "linear",
		complete: function()
		{
			if (Collider.length != 0)
			{
				audioVal++;
				if (audioVal >= 5) audioVal = 0;

				audio_damage[audioVal].play();

				current_HP = 1;
				score = 0;
				ui_refresh();

				say("Get all LOVEs.$$@Try again!|");
				eventQueueType = "pattern";
				eventQueue = "TUTORIAL_02_AGAIN";

			}
			else
			{
				say("Good!@$$Now your SOUL is filled with LOVE.|Now, $recover your HP with given $\"Fresh water\".|");
				eventQueueType = "pattern";
				eventQueue = "TUTORIAL_03";
			}

			Collider = [];
			clearInterval(Timer_flowey_love_blink);
			$('.gameObject_love_flowey').remove();

			
		}
	});
}

function pattern_tutorial_02_again()
{
	var gameRaid_wCenter = $('.game_raidimg').position().left + parseFloat($('.game_raidimg').width()) / 2;
	$('.game_screen').append("<div id=\"love01\" class=\"gameObject_love_flowey\"></div>");
	$('#love01').css({
		"top": $('.game_raidimg').position().top,
		"left": gameRaid_wCenter - 84
	});

	$('.game_screen').append("<div id=\"love02\" class=\"gameObject_love_flowey\"></div>");
	$('#love02').css({
		"top": $('.game_raidimg').position().top - 20,
		"left": gameRaid_wCenter - 44
	});
	
	$('.game_screen').append("<div id=\"love03\" class=\"gameObject_love_flowey\"></div>");
	$('#love03').css({
		"top": $('.game_raidimg').position().top - 30,
		"left": gameRaid_wCenter - 4
	});
	
	$('.game_screen').append("<div id=\"love04\" class=\"gameObject_love_flowey\"></div>");
	$('#love04').css({
		"top": $('.game_raidimg').position().top - 20,
		"left": gameRaid_wCenter + 36
	});
	
	$('.game_screen').append("<div id=\"love05\" class=\"gameObject_love_flowey\"></div>");
	$('#love05').css({
		"top": $('.game_raidimg').position().top,
		"left": gameRaid_wCenter + 76
	});

	Timer_flowey_love_blink = setInterval(function()
	{
		if (flowey_love_blink_bool)
		{
			$('.gameObject_love_flowey').css({
				"width": 4,
				"height": 8
			});
			flowey_love_blink_bool = false;
		}
		else
		{
			$('.gameObject_love_flowey').css({
				"width": 8,
				"height": 4
			});
			flowey_love_blink_bool = true;
		}
	}, 100);
	Collider.push("#love01", "#love02", "#love03", "#love04", "#love05");
	pattern_tutorial_02();
}

function pattern_tutorial_03()
{
	change_gametype("SELECT");
	notice("* FLOWEY is smiling.");
	
}

function pattern_undyne()
{
	audioCase = "UNDYNE";
	raidImage("UNDYNE");
	change_gametype("UNDYNE");
	Undyne_showNext = true;
	play_bgm("UNDYNE");

	$('.game_raid').fadeIn(1000);

	var noteSpeed = 1000;
	undyne_addnote(3000, noteSpeed, 1, 0);
	undyne_addnote(3120, noteSpeed, 0, 0);
	undyne_addnote(3240, noteSpeed, 0, 0);
	undyne_addnote(3360, noteSpeed, 0, 0);
	undyne_addnote(3480, noteSpeed, 0, 0);
	undyne_addnote(4000, noteSpeed, 3, 0);
	undyne_addnote(4120, noteSpeed, 0, 0);
	undyne_addnote(4240, noteSpeed, 0, 0);
	undyne_addnote(4360, noteSpeed, 0, 0);
	undyne_addnote(4480, noteSpeed, 0, 0);
	undyne_addnote(5000, noteSpeed, 1, 0);
	undyne_addnote(5120, noteSpeed, 0, 0);
	undyne_addnote(5240, noteSpeed, 0, 0);
	undyne_addnote(5360, noteSpeed, 0, 0);
	undyne_addnote(5480, noteSpeed, 0, 0);
	undyne_addnote(6000, noteSpeed, 3, 0);
	undyne_addnote(6120, noteSpeed, 0, 0);
	undyne_addnote(6240, noteSpeed, 0, 0);
	undyne_addnote(6360, noteSpeed, 0, 0);
	undyne_addnote(6480, noteSpeed, 0, 0);
	undyne_addnote(7000, noteSpeed, 1, 0);
	undyne_addnote(7120, noteSpeed, 0, 0);
	undyne_addnote(7240, noteSpeed, 0, 0);
	undyne_addnote(7360, noteSpeed, 0, 0);
	undyne_addnote(7480, noteSpeed, 0, 0);
	undyne_addnote(8000, noteSpeed, 3, 0);
	undyne_addnote(8120, noteSpeed, 0, 0);
	undyne_addnote(8240, noteSpeed, 0, 0);
	undyne_addnote(8360, noteSpeed, 0, 0);
	undyne_addnote(8480, noteSpeed, 0, 0);
	
}

function pattern_undyne_undying()
{
	audioCase = "UNDYNE";
	raidImage("UNDYNE_UNDYING");
	change_gametype("UNDYNE");
	Undyne_showNext = true;
	play_bgm("UNDYNE_UNDYING");

	$('.game_raid').fadeIn(1000);

	var noteSpeed = 2000;
	undyne_addnote(3000, noteSpeed, 0, 0);
	undyne_addnote(3500, noteSpeed, 0, 0);
	undyne_addnote(4000, noteSpeed, 0, 0);

	noteSpeed = 700;
	undyne_addnote(5200, noteSpeed, 3, 0);
	undyne_addnote(5450, noteSpeed, 2, 0);
	undyne_addnote(5700, noteSpeed, 1, 0);
	undyne_addnote(5950, noteSpeed, 0, 0);
	undyne_addnote(6200, noteSpeed, 1, 0);
	undyne_addnote(6450, noteSpeed, 2, 0);
	undyne_addnote(6700, noteSpeed, 3, 0);
	undyne_addnote(6950, noteSpeed, 2, 0);
	undyne_addnote(7200, noteSpeed, 1, 0);
	undyne_addnote(7450, noteSpeed, 0, 0);

	noteSpeed = 1000;
	undyne_addnote(10000, noteSpeed, 1, 0);
	undyne_addnote(10300, noteSpeed, 3, 0);
	undyne_addnote(10600, noteSpeed, 1, 0);
	undyne_addnote(10750, noteSpeed, 1, 0);
	undyne_addnote(11050, noteSpeed, 3, 0);
	undyne_addnote(11350, noteSpeed, 3, 0);
	undyne_addnote(11650, noteSpeed, 1, 0);
	undyne_addnote(11950, noteSpeed, 3, 0);
	undyne_addnote(12100, noteSpeed, 3, 0);
}

function pattern_undyne_undying_survival()
{
	audioCase = "UNDYNE";
	raidImage("UNDYNE_UNDYING");
	change_gametype("UNDYNE");
	Undyne_showNext = true;
	play_bgm("UNDYNE_UNDYING");

	$('.game_raid').fadeIn(1000);

	isSurvival = true;

	level = ff;
	ui_refresh();

	var sTiming = 3000;
	var noteSpeed = 2000;
	var ChangerCount = 5;
	var cCounter = 0;
	var revCount = 24;
	var isReversed = 0;

	for (var i = 0; i < 200; i++)
	{
		if (level < 20) revCount = 20 - level;
		else revCount = 1;

		cCounter++;
		sTiming += parseInt(Math.random() * (340 - level * 20) + 260 - (level * 20));

		if (parseInt(Math.random() * revCount) >= revCount - 1) isReversed = 1;
		else isReversed = 0;

		if (cCounter == ChangerCount)
		{
			noteSpeed = parseInt(Math.random() * (700 - level * 30) + 900 - (level * 30));
			ChangerCount = parseInt(Math.random() * 6 + 1);
			cCounter = 0;
		}

		undyne_addnote(sTiming, noteSpeed, parseInt(Math.random() * 4), isReversed);
	}
}

function pattern_undyne_undying_random(level)
{
	audioCase = "UNDYNE";
	raidImage("UNDYNE_UNDYING");
	change_gametype("UNDYNE");
	Undyne_showNext = true;
	play_bgm("UNDYNE_UNDYING");

	$('.game_raid').fadeIn(1000);

	var sTiming = 3000;
	var noteSpeed = 2000;
	var ChangerCount = 5;
	var cCounter = 0;
	var revCount = 24 - (level * 2);
	var isReversed = 0;
	for (var i = 0; i < 1000; i++)
	{
		undyne_addnote(sTiming, noteSpeed, parseInt(Math.random() * 4), isReversed);
		cCounter++;
		sTiming += parseInt(Math.random() * (320 - level * 20) + 260 - (level * 20));

		if (parseInt(Math.random() * revCount) >= revCount - 1) isReversed = 1;
		else isReversed = 0;

		if (cCounter == ChangerCount)
		{
			noteSpeed = parseInt(Math.random() * (800 - level * 30) + 900 - (level * 30));
			ChangerCount = parseInt(Math.random() * 6 + 1);
			cCounter = 0;
		}
	}
}

function undyne_addnote(timing, speed, tpos, type)
{
	// timing : when to note reach to characterObject (ms)
	// speed : animate time (ms)
	// tpos : from where? 0 : top, 1 : left, 2 : down, 3 : right
	// type : 0 : normal. 1 : reverse

	Undyne_notes.push([]);
	Undyne_notes[Undyne_notes.length - 1].push(timing, speed, tpos, type);
	return;
}

function pattern_sans()
{
	audioCase = "SANS";
	$('.game_raidimg').attr("src", "img/sans.gif");
	change_gametype("AWAIT");
	play_bgm("SANS");

	$('.game_raid').fadeIn(1000, function(){
			say("bla bla bla bla bla bla bla bla bla bla bla|lolololololololololol");
	});
}