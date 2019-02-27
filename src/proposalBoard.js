const myTrello = require("./trello");
const utils = require("./utils");

const GREENLIGHT_LIST_ID = "55c3cdfb267cd03b23d104c6";
const GET_CARDS_FROM_GREENLIGHT_LIST = utils.getCardsFromListIdCmd(GREENLIGHT_LIST_ID);
//add ?fields=name,desc,due to get specific fields only
const UPDATE_REQUEST_LIST_ID = "5b0734d86abee8350c62ab29";
const GET_CARDS_FROM_UPDATE_REQUEST_LIST = utils.getCardsFromListIdCmd(UPDATE_REQUEST_LIST_ID);
//`/1/lists/${UPDATE_REQUEST_LIST_ID}/cards`;
const DEAL_DESK_LIST_ID = "5b44ef57881fb70345ed8428";
const GET_CARDS_FROM_DEAL_DESK_LIST = utils.getCardsFromListIdCmd(DEAL_DESK_LIST_ID);//`/1/lists/${DEAL_DESK_LIST_ID}/cards`;
const REVS_FROM_AUTHOR_LIST_ID = "54662de0da8604d37ec7dadf";
const GET_CARDS_FROM_REVS_FROM_AUTHOR_LIST = utils.getCardsFromListIdCmd(REVS_FROM_AUTHOR_LIST_ID);
//`/1/lists/${REVS_FROM_AUTHOR_LIST_ID}/cards`;
const REVIEW_BY_CL_LIST_ID = "54662de33dc0248cbaa7393b";
const GET_CARDS_FROM_REVIEW_BY_CL_LIST = utils.getCardsFromListIdCmd(REVIEW_BY_CL_LIST_ID);
//`/1/lists/${REVIEW_BY_CL_LIST_ID}/cards`;
const CL_IN_PROGRESS_LIST_ID = "54662de592e0840d9e46e6a7";
const GET_CARDS_CL_IN_PROGRESS_LIST = utils.getCardsFromListIdCmd(CL_IN_PROGRESS_LIST_ID);
//`/1/lists/${CL_IN_PROGRESS_LIST_ID}/cards`;
const FOLLOWUP_REQ_LIST_ID = "546e652160ccdd0a3c7cb76b";
const GET_CARDS_FOLLOW_UP_REQ_LIST = utils.getCardsFromListIdCmd(FOLLOWUP_REQ_LIST_ID); //`/1/lists/${FOLLOWUP_REQ_LIST_ID}/cards`;
const SOW_PENDING_LIST_ID = "54662e487bae60f2e8f730f6";
const GET_CARDS_SOW_PENDING_LIST = utils.getCardsFromListIdCmd(SOW_PENDING_LIST_ID); //`/1/lists/${SOW_PENDING_LIST_ID}/cards`;
const ON_HOLD_LIST_ID = "54861b6695e42d55ce6de7f2";
const GET_CARDS_ON_HOLD_LIST = utils.getCardsFromListIdCmd(ON_HOLD_LIST_ID); //`/1/lists/${ON_HOLD_LIST_ID}/cards`;

function getGreenlightCards() {
  return myTrello.trelloGet(GET_CARDS_FROM_GREENLIGHT_LIST);
}

function getUpdateRequestCards() {
  return myTrello.trelloGet(GET_CARDS_FROM_UPDATE_REQUEST_LIST);
}

async function getDealDeskCards() {
  return await myTrello.trelloGet(GET_CARDS_FROM_DEAL_DESK_LIST)

}

async function getRevsFromAuthorCards() {
  return await myTrello.trelloGet(GET_CARDS_FROM_REVS_FROM_AUTHOR_LIST);
}

async function getReviewByClCards() {
  return await myTrello.trelloGet(GET_CARDS_FROM_REVIEW_BY_CL_LIST);
}

async function getInProgressByClCards() {
  return await myTrello.trelloGet(GET_CARDS_CL_IN_PROGRESS_LIST);
}

async function getFollowUpReqCards() {
  return await myTrello.trelloGet(GET_CARDS_FOLLOW_UP_REQ_LIST);
}

async function getSowPendingCards() {
  return await myTrello.trelloGet(GET_CARDS_SOW_PENDING_LIST);
}

async function getOnHoldCards() {
  return await myTrello.trelloGet(GET_CARDS_ON_HOLD_LIST);
}

async function cardsToTsv(cards, type = "") {
  if (cards !== undefined) {
    return await utils.turnCardsIntoTsv(cards, type);
  }
}
async function getAllProposalCards() {
  console.log(">>>");
  let cards = await getGreenlightCards()
    .catch((err) => {return err;})
  let type = "Greenlit Cards";
  console.log("CARDS RETURNED: " + cards.length);

  let output = await cardsToTsv(cards, type);

  type = "Update Request Cards";
  cards = await getUpdateRequestCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);

  type = "Deal Desk Cards";
  cards = await getDealDeskCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);

  type = "Revisions Pending From Author"
  cards = await getRevsFromAuthorCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);

  type = "Needs Review by CL";
  cards = await getReviewByClCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);

  type = "Review in Progress by CL";
  cards = await getInProgressByClCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);

  type = "Follow up Required";
  cards = await getFollowUpReqCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);

  type = "SOW Pending";
  cards = await getSowPendingCards()
    .catch((err) => {return err;})
  output += await cardsToTsv(cards, type);
  return output;
}

module.exports = {
  getGreenlightCards,
  getUpdateRequestCards,
  getDealDeskCards,
  getRevsFromAuthorCards,
  getReviewByClCards,
  getInProgressByClCards,
  getFollowUpReqCards,
  getSowPendingCards,
  getOnHoldCards,
  getAllProposalCards
}
