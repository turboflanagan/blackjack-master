var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;


function shuffleDeck(){
	var deck = [];
	//fill our deck, in order (for now)
	//suit 
	var suit = "";
	for(s = 1; s <= 4; s++){
		if(s === 1){
			suit = "h";
		}else if(s === 2){
			suit = "s";
		}else if(s === 3){
			suit = "d";
		}else if(s === 4){
			suit = "c";
		}
		//card number
		for(i = 1; i <= 13; i++){   //took royalties out of the iteration to
									//deal with their name/value seperately.
			deck.push(i+suit);
		}
	}
	console.log(deck);



// ----------------------------------------------------------------------------
// 	for(i = 1; i <= 13; i++){   //took royalties out of the iteration to
// 			if(i <= 10){						//deal with their name/value seperately.
// 			deck.push(i+suit);
// 			}else if(i = 11){
// 				deck.push("J "+suit);
// 			}else if(i = 12){
// 				deck.push("Q "+suit);
// 			}else if(i = 13){
// 				deck.push("K "+suit);
// 			}
// 	}
// ----------------------------------------------------------------------------




	var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	var numberOfTimesToShuffle = 2000;

// Math.random() // Create a random 16 digit number between 0 and 1
// //eg .89745839857324985
// .89745839857324985 * 500 = 450.745839857324985
// 450.745839857324985 + 500 = 950.745839857324985
// 950

	//Shuffle the deck
	for(i = 0; i < numberOfTimesToShuffle; i++){
		//pick 2 random cards from the deck. And switch them.
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}
	//Shuffled Deck
	console.log(deck);
	return deck;
}

function placeCard(card, who, slot){
	var currId = '#' + who + '-card-' + slot;
	$('#' + currId).removeClass("empty");
	$(currId).html(card);
	//above line of jQuery replaced line below
	//document.getElementById(currId).className = "card";
	$('#' + currId).id = card;
	//above line of jQuery replaced line below
	//document.getElementById(currId).innerHTML = card;

}

function bust(who){
	if(who === "player"){
		//player lost!!! Dealer won!!!
		$('#message').html("You have busted! Better luck next time!")
	}else{
		$('#message').html("The dealer has busted! You won!")
	}
	//above lines replace lines below.
// 		document.getElementById('message').innerHTML = "You have busted! Better luck next time!"
// 	}else{
// 		document.getElementById('message').innerHTML = "The dealer has busted! You won!"
// 	}
// }

function calculateTotal(hand, who){
	var total = 0;
	for(i=0; i<hand.length; i++){
		var cardValue = Number(hand[i].slice(0, -1));
		total = total + cardValue;
		// total += cardValue;
	}
	var idWhoToGet = who + '-total';
	$('#' + 'idWhoToGet').html(total);

	//document.getElementById(idWhoToGet).innerHTML = total;

	//check for bust
	if(total > 21){
		bust(who);
	}
	return total;
}

function deal(){
	reset();
	//Shuffled deck from function shuffleDeck
	deck = shuffleDeck();
	playerHand = [ deck[0], deck[2] ];
	dealerHand = [ deck[1], deck[3] ];
	placeInDeck = 4;

	placeCard(playerHand[0], 'player', 'one');
	placeCard(dealerHand[0], 'dealer', 'one');
	placeCard(playerHand[1], 'player', 'two');
	placeCard(dealerHand[1], 'dealer', 'two');

	calculateTotal(playerHand, 'player');
	calculateTotal(dealerHand, 'dealer');

}

function hit(){
	var slot;
	if(playerTotalCards === 2){ slot = "three";}
	else if(playerTotalCards === 3){ slot = "four";}
	else if(playerTotalCards === 4){ slot = "five";}
	else if(playerTotalCards === 5){ slot = "six";}

	placeCard(deck[placeInDeck],'player',slot);
	playerHand.push(deck[placeInDeck]);
	playerTotalCards++;
	placeInDeck++;
	calculateTotal(playerHand, 'player');

}

function checkWin(){

    //Get player total
    // get dealer total
    //who is higher but less than 21
    //set up a message
}
// ------------------------------------------------------------------
function reset(){
    //empty the deck
    deck = [];
    //reset the place in the deck
    placeInDeck = 0;
    //reset the players total cards
    playerTotalCards = 2;
    //reset the dealers total cards
    dealerTotalCards = 2;
    //reset the players hand array
    playerHand = [];
    //reset the dealers hand array
    dealerHand = [];
    //reset the message
    $('#message').html("");
    //document.getElementById("message").innerHTML="";
    //reset all the cards (divs and the empty class)
    var cards = document.getElementsByClassName("card");
    for(i = 0; i < cards.length; i++){
    	cards[i].className = cards[i].className + " empty";
    	cards[i].innerHTML = "";
    }
}

function stand(){
	//var dealerHas = calculateTotal(dealerHand, 'dealer');
	var dealerHas = Number(document.getElementById('dealer-total').innerHTML);
	var slot;
	while(dealerHas < 17){
		//keep hitting ... keep drawing ... get more cards
		if(dealerTotalCards === 2){ slot = "three";}
		else if(dealerTotalCards === 3){ slot = "four";}
		else if(dealerTotalCards === 4){ slot = "five";}
		else if(dealerTotalCards === 5){ slot = "six";}
		placeCard(deck[placeInDeck], 'dealer', slot);
		dealerHand.push(deck[placeInDeck]);
		dealerHas = calculateTotal(dealerHand, 'dealer');
		placeInDeck++;
		dealerTotalCards++;
	}
	//WE KNOW the dealer has more than 17
	checkWin();
}

function setName(){
	var name = "Rob";
	return name;
}

var name = setName();



// complete checkWin.
// compare dealer win with player win and if player win increment win counter.

// Homework Ideas: 
// 1.    Fix 11-13 and 1
// 2.    Create a delay on the draw
// 3.    Change it from wins to $wager amount
// 4.    Add a wager dialogue (prompt or form)
// 5.    Color code the card based on suit
// 7.    Add 1 or 11 logic to player
// 8.  Add 1 or 11 logic to dealer
// 9.    Add multiple players 




// var cards = document.getElementsByClassName("card");
// //both above and below lines do the same thing.
// var cards = $(.card).html("card");





















