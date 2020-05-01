var apple = require('app-store-scraper');
var google = require('google-play-scraper');
var fs = require('fs');

function getAppleReviews(id) {
    
    apple.reviews({
        appId: id.toString(),
        country: "gb",
        num: 1, 
        sort: apple.sort.HELPFUL
    })
    .then(function(result) {
        const data = result.map(({id, userUrl, url, ...details}) => details)

        fs.writeFileSync('../appleData/01.05/' + id + '.json', JSON.stringify(data, null, 1));
    })
    .catch(console.log);
}

function getGoogleReviews(id) {
    
    google.reviews({
        appId: id.toString(),
        lang: 'en',
        country: 'gb',
        sort: google.sort.HELPFULNESS,
        num: 50
    })
    .then(function(result) {
        let data = result.map(({id, userImage, scoreText, url, criterias, ...details}) => details);
        fs.writeFileSync('../googleData/01.05/' + id + '.json', JSON.stringify(data, null, 1));
    })
    .catch(console.log);
}

getGoogleReviews('com.pokerstars.uk');
getAppleReviews('co.uk.camelot');