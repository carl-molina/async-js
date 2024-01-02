'use strict';

const $cardImageDiv = $("#card-images");
const $drawCardForm = $("#draw-card");

const CARD_DECK_API = 'https://deckofcardsapi.com/api/deck';
let deckId;


async function shuffle(){
  const response = await fetch(`${CARD_DECK_API}/new/shuffle`);
  const deckObj = await response.json();
  deckId = deckObj["deck_id"];
}


async function drawCard(evt){
  evt.preventDefault();
  const response = await fetch(`${CARD_DECK_API}/${deckId}/draw/?count=1`);
  const cardObj = await response.json();
  const cards = cardObj["cards"]
  for(let card of cards){
    $cardImageDiv.append(
      $(`<img src=${card["image"]}>`)
    );
  }
}

$drawCardForm.on("submit", drawCard);
shuffle();