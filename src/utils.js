const fs = require('fs');

function sendStringToFile(filename, data) {
  fs.writeFileSync(filename, data);
}

function turnCardsIntoCsv(cards) {
  let output = "";
  cards.forEach(card => {
    let re = /(https:[^\s]*)(.*)/gs;
    let result = re.exec(card.desc);
    output += card.name;
    if (result !== null) {
      console.log(result[1] + "   ->" + result[0]);
      output += "\t" + result[1];
      if (result.length > 1) {
        let cleanDesc = result[2].replace(/\n/g, "--");
        output += "\t" + cleanDesc + "\n";
      }
    } else {
      let cleanDesc = card.desc.replace(/\n/g, "--");
      output += "\t" + cleanDesc + "\n";
    }
  });
  return output;
}

module.exports = {
  sendStringToFile,
  turnCardsIntoCsv
}
