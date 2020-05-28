var apple = require('app-store-scraper');
var google = require('google-play-scraper');
var fs = require('fs');

//const keywords = ['gamble', 'gambling', 'bet', 'betting', 'casino'];
//const keywords = ['gambling', 'betting', 'casino', 'slots', 'roulette', 'blackjack', 'poker', 'lottery', 'scratch cards', 'bingo'];
const keywords = ['gambling', 'betting', 'casino', 'slots', 'roulette', 'blackjack', 'poker', 'lottery', 'scratch cards', 'bingo', 'sports betting', 'spread betting'];
const applePATH = '../appleData/12.05/';
const googlePATH = '../googleData/12.05/';


function getAppleData(searchTerm, path) {
    
    apple.search({
        term: searchTerm.toString(),
        num: 100, 
        country: "gb",
    })
    .then(function(result) {
        const newResult = result.map(({id, url, icon, genreIds, primaryGenre, primaryGenreId, languages, size, requiredOsVersion, currency, free, developerId, developerUrl, developerWebsite, screenshots, ipadScreenshots, appletvScreenshots, supportedDevices, ...details}) => details)
        let data = newResult.map(function(o) {
            o.searchTerms = searchTerm.toString();
            return o;
          });
        fs.writeFileSync(path.toString() + searchTerm + '.json', JSON.stringify(data, null, 1));
    })
    .catch(console.log);
}

function getGoogleData(searchTerm, path) {
    
    google.search({
        term: searchTerm.toString(),
        num: 100,
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
        fs.writeFileSync(path + searchTerm + '.json', JSON.stringify(data, null, 1));
    })
    .catch(console.log);
}

keywords.forEach(function(keyword) {
    getAppleData(keyword, applePATH);
    getGoogleData(keyword, googlePATH);
});

