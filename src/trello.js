
const creds = require("../_local/trello-credentials");
const nodeTrello = require("node-trello");
const trello = new nodeTrello(creds.appKey, creds.token);
const ON_HOLD_LIST_ID = "5b2c2aaa28a197dc7ce34b92";
const GET_CARDS_FROM_ON_HOLD_LIST = `/1/lists/${ON_HOLD_LIST_ID}/cards`;
const RETIREMENT_LIST_ID = "5b2c2a7d7da44c73dd1c7175";
const GET_CARDS_FROM_RETIREMENT_LIST = `/1/lists/${RETIREMENT_LIST_ID}/cards`;


function getOnHoldCards() {
  return new Promise((resolve, reject) => {
    trello.get(GET_CARDS_FROM_ON_HOLD_LIST, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function getRetirementCards() {
  return new Promise((resolve, reject) => {
    trello.get(GET_CARDS_FROM_RETIREMENT_LIST, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
}

module.exports = {
  getOnHoldCards,
  getRetirementCards
}