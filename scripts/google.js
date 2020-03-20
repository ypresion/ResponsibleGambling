var scraper = require('google-play-scraper');
var fs = require('fs');

var logStream = fs.createWriteStream('casino_Google.json', {flags: 'a'});

scraper.search({
    term: "casino",
    num: 250,
    country: "gb",
    price: "free",
    throttle: 10,
    fullDetail: true 
})
.then(function(result) {
    const newResult = result.map(({url, descriptionHTML, minInstalls, scoreText, free, currency, priceText, offersIAP, size, androidVersion, androidVersionText, developerId, developerEmail, developerWebsite, developerAddress, privacyPolicy, developerInternalID, genreId, icon, headerImage, screenshots, adSupported, comments, editorsChoice, histogram, video, videoImage, ...details}) => details)
    saveResult(newResult);
})
.catch(console.log);


function saveResult(r) {
    logStream.write(JSON.stringify(r, null, 1));
    logStream.end();
}