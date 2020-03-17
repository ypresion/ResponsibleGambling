var scraper = require('app-store-scraper');
var fs = require('fs');

var logStream = fs.createWriteStream('gamble.json', {flags: 'a'});

scraper.search({
  term: "gamble",
  num: 10,
  country: "gb",
})
.then(function(result) {
  //const newResult = result.map(({url, ...details}) => details)
  saveResult(result);
})
.catch(console.log);

function saveResult(r) {
  logStream.write(JSON.stringify(r));
  logStream.end();
}