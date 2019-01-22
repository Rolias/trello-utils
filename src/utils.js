const fs = require('fs');
const trello = require("./trello");
let memberCache = {};

function sendStringToFile(filename, data) {
  fs.writeFileSync(filename, data);
}

function extractMembers(memberObject) {
  console.log("Members");
  console.log(memberObject);
}

function getMemberFullName(id) {
  `/1/members`
}

async function turnCardsIntoTsv(cards, type = "") {
  let output = "";

  for (const card of cards) {
    let cardElementArray = await getArrayOfCardElements(card, type);
    output += cardElementArray.join("\t");
    output += "\n"
  }
  return output;
}

async function getArrayOfCardElements(card, type) {
  let cells = [];
  if (type !== "") {
    cells.push(type);
  }
  cells.push(card.name);

  let re = /(https:[^\s]*)(.*)/gs;
  // result [0] will end up with url if it exists, result[1] will have the rest of the description
  let result = re.exec(card.desc); //look for URL

  let cleanDesc = "";
  if (result !== null) {
    cells.push(result[1]);
    if (result.length > 1) {
      cleanDesc = result[2].replace(/\n/g, "--");
    }
  } else {
    cleanDesc = card.desc.replace(/\n/g, "--");
  }
  cells.push(cleanDesc);
  cells.push(card.due);
  //console.log(cells);
  if (card.idMembers !== undefined && card.idMembers.length !== 0) {
    const members = await extractMembers(card.idMembers);
    for (member of members) {
      cells.push(member);
    }
    return cells;
  }
}


async function extractMembers(idArray) {

  const MEMBER_GET = "/1/members/";
  let nameArray = await Promise.all(idArray.map(async element => {
    if (memberCache.hasOwnProperty(element)) {
      console.log("cache hit");
      return memberCache[element];
    }
    let member = await trello.trelloGet(MEMBER_GET + element);
    memberCache[element] = member.fullName;
    return member.fullName;
  }));
  return nameArray;

}

module.exports = {
  sendStringToFile,
  turnCardsIntoTsv,
}
