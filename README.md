# Trello Utilities

This project leverages the node-trello npm package to communicate with a Trello board to retrieve data. The original purpose was to pull cards off a list and export them into a tab-separated value file. The one critical piece missing from the repo is the API authorization credentials. You should create a folder named  
`_local`  
and create a file named  
`trello-credentials.js`  
That file should contains the following JSON object (except it needs valid values for each property)

```json
module.exports = {
  appKey: "putyourappkeyhere",
  token: "putyourtokenhere",
};
```

You will also need to replace the IDs of any Trello item with the IDs of your trello items.

## Node Issues

Uses the await/async keywords which at the moment ESLint seems to object to.  

## Duct Tape Programming

This was written to solve an immediate need and at the moment has no unit tests. I also don't consider it production ready but it's still useful as an example of how to get this done. Just don't get testy about best-practice violations.  

## Trello API

https://developers.trello.com/reference
https://developers.trello.com/reference#cardsid-1