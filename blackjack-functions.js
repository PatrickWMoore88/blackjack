// Create Deck
function createDeck(deck) {
  var deck = [];

  // Building Suits
  for (var i = 1; i < 14; i++) {
    deck.push({ points: i, suit: "spades" });
    deck.push({ points: i, suit: "clubs" });
    deck.push({ points: i, suit: "hearts" });
    deck.push({ points: i, suit: "diamonds" });
  }
  // Correcting Values
  deck.forEach(card => {
    card.face = card.points;
    if (card.face == 1) {
      card.face = "ace";
      card.altPoints = 1;
      card.points = 11;
    }
    if (card.face == 11) {
      card.face = "jack";
      card.points -= 1;
    }
    if (card.face == 12) {
      card.face = "queen";
      card.points -= 2;
    }
    if (card.face == 13) {
      card.face = "king";
      card.points -= 3;
    }
  });
  return deck;
}

// Calculate Points
function calculatePoints(arr) {
  let total = 0;
  arr.forEach(card => {
    total += card.points;
  });
  return total;
}

// Get Card Image URL
function getCardImage(card) {
  var face = card.face;
  var suit = card.suit;
  return "images/" + face + "_of_" + suit + ".png";
}
