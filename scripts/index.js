var apple = require('app-store-scraper');
var google = require('google-play-scraper');
var fs = require('fs');

//const keywords = ['gamble', 'gambling', 'bet', 'betting', 'casino'];
const keywords = ['gambling', 'betting', 'casino', 'slots', 'roulette', 'blackjack', 'poker', 'lottery', 'scratch cards', 'bingo'];

function getAppleData(searchTerm) {
    
    apple.search({
        term: searchTerm.toString(),
        num: 199, 
        country: "gb",
    })
    .then(function(result) {
        const newResult = result.map(({id, url, icon, genreIds, primaryGenre, primaryGenreId, languages, size, requiredOsVersion, currency, free, developerId, developerUrl, developerWebsite, screenshots, ipadScreenshots, appletvScreenshots, supportedDevices, ...details}) => details)
        let data = newResult.map(function(o) {
            o.searchTerms = searchTerm.toString();
            return o;
          });
        fs.writeFileSync('../appleData/07.04/' + searchTerm + '.json', JSON.stringify(data, null, 1));
    })
    .catch(console.log);
}

function getGoogleData(searchTerm) {
    
    google.search({
        term: searchTerm.toString(),
        num: 199,
        country: "gb",
        price: "free",
        throttle: 10,
        fullDetail: true 
    })
    .then(function(result) {
        let newResult = result.map(({url, descriptionHTML, minInstalls, scoreText, free, currency, priceText, offersIAP, size, androidVersion, androidVersionText, developerId, developerEmail, developerWebsite, developerAddress, privacyPolicy, developerInternalID, genreId, icon, headerImage, screenshots, adSupported, comments, editorsChoice, histogram, video, videoImage, ...details}) => details);
        let data = newResult.map(function(o) {
            o.searchTerms = searchTerm.toString();
            return o;
          });
        fs.writeFileSync('../googleData/07.04/' + searchTerm + '.json', JSON.stringify(data, null, 1));
    })
    .catch(console.log);
}


keywords.forEach(function(keyword) {
     getAppleData(keyword);
     getGoogleData(keyword);
});

