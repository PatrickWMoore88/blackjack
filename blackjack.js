$(function domReady() {
  $("#play-again").hide();
  $("#hit-button").hide();
  $("#stand-button").hide();

  var deck, dealerHand, playerHand;

  setupNewGame();

  updateScoreDisplay();

  // Deal Cards
  $("#deal-button").click(function() {
    dealCards(playerHand, "#player-hand");
    dealCards(dealerHand, "#dealer-hand");
    dealCards(playerHand, "#player-hand");
    dealCards(dealerHand, "#dealer-hand");
    var dealerPoints = calculateAce(dealerHand, calculatePoints(dealerHand));
    $("#dealer-points").show(dealerPoints);
    var playerPoints = calculateAce(playerHand, calculatePoints(playerHand));
    $("#player-points").show(playerPoints);

    $("#deal-button").hide();
    $("#hit-button").show();
    $("#stand-button").show();
  });

  // Player Hit
  $("#hit-button").click(function() {
    dealCards(playerHand, "#player-hand");
    if (calculateAce(playerHand, calculatePoints(playerHand)) > 21) {
      $("#messages").text("Sorry you bust! House Wins!");
      gameOver();
    }
  });

  // Player Stand
  $("#stand-button").click(function() {
    while (calculateAce(dealerHand, calculatePoints(dealerHand)) < 17) {
      dealCards(dealerHand, "#dealer-hand");
    }
    if (calculateAce(dealerHand, calculatePoints(dealerHand)) > 21) {
      // dealer busts
      $("#messages").text("Dealer busts! You win!");
    } else if (calculateAce(playerHand, calculatePoints(playerHand)) > 21) {
      // player busts
      $("#messages").text("You bust! Sorry!");
    } else {
      // determine winner
      var dealerPoints = calculateAce(dealerHand, calculatePoints(dealerHand));
      var playerPoints = calculateAce(playerHand, calculatePoints(playerHand));
      var message;
      if (dealerPoints > playerPoints) {
        message = "The House Wins!";
      } else if (dealerPoints < playerPoints) {
        message = "Winner Winner Chicken Dinner!";
      } else {
        message = "Push";
      }
      $("#messages").text(message);
    }
    gameOver();
  });
  // Playing Again
  $("#play-again").click(function() {
    $("#deal-button").show();
    $("#hit-button").hide();
    $("#stand-button").hide();
    $("#play-again").hide();
    $("#player-hand").html("");
    $("#dealer-hand").html("");
    $("#messages").text("");
    $("#player-points").text("");
    $("#dealer-points").text("");
    setupNewGame();
  });

  // Correct Ace Value
  function calculateAce(arr, points) {
    arr.forEach(card => {
      if (card.face == "ace" && points < 10) {
        points += 10;
      }
      if (card.face == "ace" && points > 21) {
        points -= 10;
      }
    });
    return points;
  }

  // Game Over
  function gameOver() {
    $("#hit-button").hide();
    $("#stand-button").hide();
    $("#play-again").show();
  }

  // Score Display
  function updateScoreDisplay() {
    var dealerPoints = calculateAce(dealerHand, calculatePoints(dealerHand));
    $("#dealer-points").text(dealerPoints);
    var playerPoints = calculateAce(playerHand, calculatePoints(playerHand));
    $("#player-points").text(playerPoints);
  }

  // Deal The Cards
  function dealCards(handArray, elementSelector) {
    card = deck.pop();
    handArray.push(card);
    cardUrl = getCardImage(card);
    $(elementSelector).append('<img src="' + cardUrl + '">');
    updateScoreDisplay();
  }

  // New Game
  function setupNewGame() {
    deck = createDeck();
    deck = _.shuffle(deck);
    dealerHand = [];
    playerHand = [];
  }
});
