var scraper = require('app-store-scraper');
var fs = require('fs');

var logStream = fs.createWriteStream('test.json', {flags: 'a'});
const keywords = ['gamble', 'gambling', 'bet', 'betting', 'casino'];



scraper.search({
  term: "casino",
  num: 10,
  country: "gb",
})
.then(function(result) {
  const newResult = result.map(({id, url, icon, genreIds, primaryGenre, primaryGenreId, languages, size, requiredOsVersion, currency, free, developerId, developerUrl, developerWebsite, screenshots, ipadScreenshots, appletvScreenshots, supportedDevices, ...details}) => details)
  saveResult(newResult);
})
.catch(console.log);

function saveResult(r) {
  logStream.write(JSON.stringify(r, null, 1));
  logStream.end();
}