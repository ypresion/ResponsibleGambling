var fs = require('fs');
const { Parser } = require('json2csv');

//Parse JSON to csv
//@param file file name
//platform google or apple
function parseData(file, platform) {
    const parser = new Parser();
    let path;
    switch(platform) {
        case 'apple':
        path = '../appleStoreData/' + file + '.json';
        break;
        
        case 'google':
        path = '../googleStoreData/' + file + '.json';
        break;
    }
    let rawData = fs.readFileSync(path);
    let data = JSON.parse(rawData);
    
    let csv = parser.parse(data);
    fs.writeFileSync('../test.csv', csv);
}

parseData('bet', 'apple');