
const utils = require("./src/utils.js");
const retire = require("./src/retirementBoard.js");
const proposal = require("./src/proposalBoard");

async function doRetireOnHold() {
  const cards = await retire.getOnHoldCards()
    .catch((err) => console.log(err));
  if (cards === undefined) return;
  let output = utils.turnCardsIntoTsv(cards);
  utils.sendStringToFile("onHoldCards.csv", output);
}

async function doRetirement() {
  const cards = await retire.getRetirementCards()
    .catch((err) => console.log(err));
  if (cards === undefined) return;
  let output = utils.turnCardsIntoTsv(cards);
  utils.sendStringToFile("retirementCards.csv", output);
}

// doOnHold();
// doRetirement();
async function doAllProposalCards() {
  let output = await proposal.getAllProposalCards()
    .catch(error => console.log(error));
  utils.sendStringToFile("proposalCards.csv", output);
}

async function doDealDesk() {
  let output = await proposal.getDealDeskCards()
    .catch(error => console.log(error));
  // console.log(">>>", output);
  let result = await utils.turnCardsIntoTsv(output, "Deal Desk");
  console.log(result);
}


async function doProposalGreenlight() {
  let output = await proposal.getGreenlightCards()
    .catch(error => console.log(error));
  let result = await utils.turnCardsIntoTsv(output, "Greenlit");
  console.log(result);
}

doAllProposalCards();
//doDealDesk();
//utils.setTest();
// doProposalGreenlight();