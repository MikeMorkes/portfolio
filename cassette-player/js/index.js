var totalTime = 0;

$(document).ready(function () {
 // hacky bit of code to force page to rotate 90 degrees when phone is held in portrait mode - we want the phone to look and be held like a Walkman!
	
	/*  function reorient(e) {
    var portrait = (window.orientation % 180 == 0);
    $("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
  }
  window.onorientationchange = reorient;
  window.setTimeout(reorient, 0);
 */
	
	// this code figures out total tape length and uses that to calculate the tape spin speed
	setTimeout(function() {	
			for (var i=0; i <= totalTracks; i++) {
				var trackDuration = $('audio[id^="sound"]')[i].duration;
				trackDuration = Math.round(trackDuration);
				totalTime += trackDuration;
			}
			
	}, 2000);
	setTimeout(function() {
		totalTime *= 1000;
		document.getElementById("loading").style.display = "none";
	}, 3000);
});

// ****GLOBALS****
var totalTime = 0;
var trackCount = 0;
var trackList = [
	["Vintage Electro Pop", "Frankum"],
	["80s Mean", "FurbyGuy"],
	["Techno 80", "Frankum & Frankumjay"],
	["Neutrino", "K-Alpha"],
	["No Solution", "K-Alpha"],
	["Combustion (Experiment)", "K-Alpha"],
	["Pathologically (loop)", "K-Alpha"],
	["Next Step Into the Darkness", "K-Alpha"]
];
var totalTracks = trackList.length;
var rotateAngle = [0,0]; // we'll need this later in the pause button for the gears


// cassette player sounds
var ffSound = new Audio(
	"http://www.mikemorkes.com/codepen/cassette/fast-forward.mp3"
);
var stopSound = new Audio(
	"http://www.mikemorkes.com/codepen/cassette/buttonClunk.mp3"
);


// RESET
var reset = function() {
	$("#playBtn").removeClass("pressed");
	$("#pauseBtn").removeClass("pressed");
	document.getElementById("title").innerHTML = "Vintage Electro Pop";
	document.getElementById("artist").innerHTML = "Frankum";
	trackCount = 0;
	rotateAngle = [0,0];
	$("#leftTape").css({ width: '100px', height: '100px' });
	$("#rightTape").css({ width: '300px', height: '300px' });
};


// *** PLAYER FUNCTIONS ***
function playSound() {
	if (trackCount < totalTracks - 1) {
		trackCount++;
		$('audio[id^="sound"]')[trackCount].play();
		document.getElementById("title").innerHTML = trackList[trackCount][0];
		document.getElementById("artist").innerHTML = trackList[trackCount][1];
		$('audio[id^="sound"]')[trackCount].addEventListener("ended", playSound);
	} else {
		$('audio[id^="sound"]')[trackCount].removeEventListener("ended", playSound);
		playClunk();
		reset();
	}
}

function stopGears() {
	$( "#leftTape" ).stop();
	$( "#rightTape" ).stop();
	$( ".play-gear" ).stopRotate();
	rotateAngle = $( ".play-gear" ).getRotateAngle();	
}

// functions to play cassette player sounds
function playFF() {
	ffSound.play();
}
function playClunk() {
	stopSound.play();
}

// this function loads and unloads styles for play button states
function playBtnPressed() {
	// change button states
	$("#playBtn").addClass("pressed");
	$("#pauseBtn").removeClass("pressed");
}



// *** ANIMATION STUFF ***
// gears animated using https://rawgit.com/wilq32/jqueryrotate/master/jQueryRotate.js

function gearAnimation() {
	var rotation = function (){
		var angleCombo = rotateAngle[0] + 360;
  	$(".play-gear").rotate({	
    	angle:rotateAngle[0],
    	animateTo:angleCombo,
			duration: 12000,
    	callback: rotation,
    	easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
      	return c*(t/d)+b;
    	}
  	});
	}
	rotation();		
}

function gearAnimationFast() {
	var rotation = function (){
		var angleCombo = rotateAngle[0] + 360;
  	$(".play-gear").rotate({	
    	angle:rotateAngle[0],
    	animateTo:angleCombo,
			duration: 1000,
    	callback: rotation,
    	easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
      	return c*(t/d)+b;
    	}
  	});
	}
	rotation();		
}

function gearAnimationReverse() {
	var rotation = function (){
		var angleCombo = rotateAngle[0] + 360;
  	$(".play-gear").rotate({	
    	angle:angleCombo,
    	animateTo:rotateAngle[0],
			duration: 1000,
    	callback: rotation,
    	easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
      	return c*(t/d)+b;
    	}
  	});
	}
	rotation();		
}

function tapeAnimation() {
	$("#leftTape").animate({width: '300px', height: '300px'}, totalTime, 'linear');
	$("#rightTape").animate({width: '100px', height: '100px'}, totalTime, 'linear');	
}

// calculations for FF and RW tape are fairly accurate; however, they don't account for how far into playing the current song you are when you hit FF or RW. This could probably be accounted for by doing a .currentTime check and plugging that into the calculation. Will work on that later...
function tapeAnimationFast() {
	var trackDurationFF = $('audio[id^="sound"]')[trackCount].duration;
	trackDurationFF = Math.round(trackDurationFF);
	// get current height of both tape spools and round them off
	var widthFF = $( '#leftTape' ).height(); 
	var widthFFright = $( '#rightTape' ).height();
	widthFF = Math.round(widthFF);
	widthFFright = Math.round(widthFFright);
	//calculate the amount of scaling to do based on length of song
	// initial clculation divides the total time by the difference between an empty spool and a full spool, then removes the extra zeros
	var durAdd = Math.round((totalTime / 200) * .001);
	// then we divide the track length by the previous calculation and round it off, which tells us how much to scale up or down in the time it takes for the FF sound to play
	durAdd = Math.round(trackDurationFF / durAdd);
	// add or subtract durAdd to or from width amount, and plug them into the animation variables for the FF animation
	widthFF += durAdd;
	widthFFright -= durAdd;
	$("#leftTape").animate({width: widthFF, height: widthFF}, 4500, 'linear');
	$("#rightTape").animate({width: widthFFright, height: widthFFright}, 4500, 'linear');	
}

function tapeAnimationReverse() {
	var trackDurationRV = $('audio[id^="sound"]')[trackCount-1].duration;
	trackDurationRV = Math.round(trackDurationRV);
	// get current height of both tape spools and round them off
	var widthRV = $( '#leftTape' ).height(); 
	var widthRVright = $( '#rightTape' ).height();
	widthRV = Math.round(widthRV);
	widthRVright = Math.round(widthRVright);
	//calculate the amount of scaling to do based on length of song
	// initial clculation divides the total time by the difference between an empty spool and a full spool, then removes the extra zeros
	var durAdd = Math.round((totalTime / 200) * .001);
	// then we divide the track length by the previous calculation and round it off, which tells us how much to scale up or down in the time it takes for the FF sound to play
	durAdd = Math.round(trackDurationRV / durAdd);
	// add or subtract durAdd to or from width amount, and plug them into the animation variables for the FF animation
	widthRV -= durAdd;
	widthRVright += durAdd;
	$("#leftTape").animate({width: widthRV, height: widthRV}, 4500, 'linear');
	$("#rightTape").animate({width: widthRVright, height: widthRVright}, 4500, 'linear');		
}



// ***cassette player button functions***

//play button
$("#playBtn").click(function() {
	// var $this = $(this); // I might use this to recombine the play and pause buttons
	trackCount--;
	playBtnPressed();
	
	//animations
	tapeAnimation();
	gearAnimation();		
	
	// $this.text('PAUSE'); // save this if I want to make play/pause one button
	playSound();

});

// fast forward button
$("#fastForwardBtn").click(function() {
	$('audio[id^="sound"]')[trackCount].pause();
	if (trackCount < totalTracks - 1) {
	playFF();
		
	// run fast forward animation	
	setTimeout(function() {	
		stopGears();
		//animations
		tapeAnimationFast();
		gearAnimationFast();	
		
	}, 800);
		
	// restart normal playback animation	
		//this bit keeps overanxious people from repeatedly click the forward button, which makes the audio get completely out of sync. Want to be able to fast forward more quickly? Get an iPod, this is a CASSETTE PLAYER, man!
		var input = this;
        input.disabled = true;
		setTimeout(function() {
			// second bit of the var input code
			input.disabled = false;
			playBtnPressed();
			stopGears();
		//animations
			tapeAnimation();
			gearAnimation();
			
			$('audio[id^="sound"]')[trackCount].currentTime = 0;
			playSound();
		}, 4500);
		
	} else {
		// end of tape. Real life tape player would stop (unless you could afford the fancy ones that auto-rewound or played the back side), so we'll do the same.
		$('audio[id^="sound"]')[trackCount].removeEventListener("ended", playSound);
		stopGears();		
		playClunk();
		reset();
	}
});



//rewind button
$("#rewindBtn").click(function() {
	// var $this = $('#btn1'); // save this if I want to make play/pause one button
	$('audio[id^="sound"]')[trackCount].pause();
	playFF();
	setTimeout(function() {	
		stopGears();
		
		//animations
		tapeAnimationReverse();
		gearAnimationReverse();	
		
	}, 800);	
	

		//this bit keeps overanxious people from repeatedly click the forward button, which makes the audio get completely out of sync. Want to be able to fast forward more quickly? Get an iPod, this is a CASSETTE PLAYER, man!
		var input = this;
        input.disabled = true;	
	setTimeout(function() {
			// second bit of the var input code
			input.disabled = false;		
		if (trackCount == 0) {
			// $this.text('PAUSE');
			
			$('audio[id^="sound"]')[trackCount].currentTime = 0;
			trackCount--;		
			
			stopGears();
			
		//animations
			tapeAnimation();
			gearAnimation();			
			
			playSound();
		} else {
			
			$('audio[id^="sound"]')[trackCount].currentTime = 0;
			trackCount = trackCount - 2;
			
			stopGears();
			
		//animations
			tapeAnimation();
			gearAnimation();			
		
			playSound();
		}
	}, 5000);
});

// pause button
$("#pauseBtn").click(function() {
	
	// var $this = $(this); // save this if I want to make play/pause one button
	$('audio[id^="sound"]')[trackCount].pause();

	// adjust button states
	$("#playBtn").removeClass("pressed");
	$("#pauseBtn").addClass("pressed");
	stopGears();
});