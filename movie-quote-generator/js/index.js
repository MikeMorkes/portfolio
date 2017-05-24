// globals	
var displayQuote = "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.";
var displayCharacter = "Carl Denham, King Kong";

var quoteArray = [{
		quote: "Frankly, my dear, I don't give a damn.",
		character: "Rhett Butler, Gone With The Wind"
	}, {
		quote: "My mama always said life was like a box of chocolates. You never know what you're gonna get.",
		character: "Forrest Gump"
	}, {
		quote: "Gentlemen, you can't fight in here! This is the War Room!",
		character: "Dr. Strangelove"
	}, {
		quote: "Take your stinking paws off me, you damned dirty ape!",
		character: "Taylor, Planet of the Apes"
	}, {
		quote: "Life is a banquet, and most  poor suckers are starving to death!",
		character: "Auntie Mame"
	}, {
		quote: "The Force will be with you, always.",
		character: "Obi-Wan Kenobi, Star Wars: A New Hope"
	}, {
		quote: "What does God need with a starship?",
		character: "James T. Kirk, Star Trek V"
	}, {
		quote: "Dead or alive, you’re coming with me!",
		character: "RoboCop"
	}, {
		quote: "We’re not hosting an intergalactic kegger down here.",
		character: "Zed, Men In Black"
	}, {
		quote: "Six years of college down the drain.",
		character: "Bluto, Animal House"
	}, {
		quote: "Never apologize, mister, it's a sign of weakness.",
		character: "Capt. Nathan Cutting Brittles, She Wore A Yellow Ribbon"
	}, {
		quote: "I'm not locked in here with you. You're locked in here with me!",
		character: "Rorschach, Watchmen"
	}, {
		quote: "Yeah, well, you know, that's just like, your opinion, man.",
		character: "The Dude, The Big Lewbowski"
	}, {
		quote: "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.",
		character: "Carl Denham, King Kong"
	}

];

$('#quoteButton').click(function(evt) {

	evt.preventDefault();

	// generate a random number to pick a quote from the array
	var randomQuote = Math.floor(Math.random() * (quoteArray.length - 1 + 1));

	// drop new quote and character into these variables that we'll use in the quote box and for any tweets
	displayQuote = quoteArray[randomQuote].quote;
	displayCharacter = quoteArray[randomQuote].character;

	// populate the html objects with their corresponding data, then animate them
	document.getElementById("quoteText").innerHTML = displayQuote;
	document.getElementById("quoteCharacter").innerHTML = "- " + displayCharacter;
	$("#quoteBox").addClass("animated zoomIn").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
		function(e) {
			$(this).removeClass('animated zoomIn');
		}
	);

});

// tweet this quote
function twitter() {
	window.open('https://twitter.com/intent/tweet?text=' + displayQuote + ' - ' + displayCharacter); // open new twitter window and populate tweet area with current quote and character name
}

// run twitter function when tweet button is clicked
$("#twitter-button").on("click", twitter);