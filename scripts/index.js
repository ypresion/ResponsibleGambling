var apple = require('app-store-scraper');
var google = require('google-play-scraper');
var fs = require('fs');

const keywords = ['gamble', 'gambling', 'bet', 'betting', 'casino'];


function getAppleData(searchTerm) {
    
    apple.search({
        term: searchTerm.toString(),
        num: 199, 
        country: "gb",
    })
    .then(function(result) {
        const newResult = result.map(({id, url, icon, genreIds, primaryGenre, primaryGenreId, languages, size, requiredOsVersion, currency, free, developerId, developerUrl, developerWebsite, screenshots, ipadScreenshots, appletvScreenshots, supportedDevices, ...details}) => details)
        fs.writeFileSync('../appleStoreData/' + searchTerm + '.json', JSON.stringify(newResult, null, 1));
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
        const newResult = result.map(({url, descriptionHTML, minInstalls, scoreText, free, currency, priceText, offersIAP, size, androidVersion, androidVersionText, developerId, developerEmail, developerWebsite, developerAddress, privacyPolicy, developerInternalID, genreId, icon, headerImage, screenshots, adSupported, comments, editorsChoice, histogram, video, videoImage, ...details}) => details)
        fs.writeFileSync('../googleStoreData/' + searchTerm + '.json', JSON.stringify(newResult, null, 1));
    })
    .catch(console.log);
}

keywords.forEach(function(keyword) {
    getAppleData(keyword);
    getGoogleData(keyword);
});

