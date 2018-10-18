const trello = require("./src/trello.js");
const utils = require("./src/utils");

async function doOnHold() {
  const cards = await trello.getOnHoldCards()
    .catch((err) => console.log(err));
  if (cards === undefined) return;
  let output = utils.turnCardsIntoCsv(cards);
  utils.sendStringToFile("onHoldCards.csv", output);
}

async function doRetirement() {
  const cards = await trello.getRetirementCards()
    .catch((err) => console.log(err));
  if (cards === undefined) return;
  let output = utils.turnCardsIntoCsv(cards);
  utils.sendStringToFile("retirementCards.csv", output);
}

// doOnHold();
doRetirement();

//const cards = trello.getOnHoldCards();

