var fs = require('fs');

let files = ['bet.json', 'betting.json', 'casino.json', 'gamble.json', 'gambling.json'];
let all = [];

for(i=0; i<files.length; i++) {

    let rawData = fs.readFileSync('../appleStoreData/24.03/' + files[i]);
    let data = JSON.parse(rawData);
    all.push(...data)

}

fs.writeFileSync('../appleStoreData/24.03/test.json', JSON.stringify(all, null, 1));