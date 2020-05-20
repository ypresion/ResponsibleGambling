var fs = require('fs');

let files = ['betting.json', 'bingo.json', 'blackjack.json', 'casino.json', 'gambling.json', 'lottery.json', 'poker.json', 'roulette.json', 'scratch cards.json', 'slots.json', 'sports betting.json', 'spread betting.json'];
let all = [];

for(i=0; i<files.length; i++) {

    let rawData = fs.readFileSync('../appleData/12.05/' + files[i]);
    let data = JSON.parse(rawData);
    all.push(...data)

}

fs.writeFileSync('../appleData/12.05/all.json', JSON.stringify(all, null, 1));