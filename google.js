var scraper = require('google-play-scraper');
var fs = require('fs');

var logStream = fs.createWriteStream('gamble.json', {flags: 'a'});

scraper.search({
    term: "gamble",
    num: 2,
    country: "gb",
    price: "free",
    throttle: 10,
    fullDetail: true 
})
.then(function(result) {
    const newResult = result.map(({url, descriptionHTML, minInstalls, scoreText, free, currency, priceText, offersIAP, size, androidVersion, androidVersionText, developerId, developerEmail, developerWebsite, developerAddress, privacyPolicy, developerInternalID, genreId, icon, headerImage, screenshots, adSupported, comments, editorsChoice, ...details}) => details)
    saveResult(newResult);
})
.catch(console.log);


function saveResult(r) {
    logStream.write(JSON.stringify(r));
    logStream.end();
}