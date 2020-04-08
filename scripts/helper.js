var fs = require('fs');

let files = ['betting.json', 'bingo.json', 'blackjack.json', 'casino.json', 'gambling.json', 'lottery.json', 'poker.json', 'roulette.json', 'scratch cards.json', 'slots.json'];
let all = [];

for(i=0; i<files.length; i++) {

    let rawData = fs.readFileSync('../googleData/07.04/' + files[i]);
    let data = JSON.parse(rawData);
    all.push(...data)

}

fs.writeFileSync('../googleData/07.04/all.json', JSON.stringify(all, null, 1));