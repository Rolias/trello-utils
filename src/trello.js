
const nodeTrello = require("node-trello");
const creds = require("../_local/trello-credentials");

const trello = new nodeTrello(creds.appKey, creds.token);

function trelloGet(cmd) {
  return new Promise((resolve, reject) => {
    trello.get(cmd, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
}

module.exports = {
  trelloGet
}
