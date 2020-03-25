var fs = require('fs');
const { Parser } = require('json2csv');

//Parse JSON to csv
//@param file file name
//@param platform google or apple
//@date date string in DD.MM format
function parseData(file, platform, date) {
    const parser = new Parser();
    let path;
    switch(platform) {
        case 'apple':
        path = '../appleStoreData/' + date + '/' + file + '.json';
        break;
        
        case 'google':
        path = '../googleStoreData/' + date + '/' + file + '.json';
        break;
    }
    let rawData = fs.readFileSync(path);
    let data = JSON.parse(rawData);
    
    let csv = parser.parse(data);
    fs.writeFileSync('../' + file + '.csv', csv);
}

//example
parseData('ganble', 'apple', '24.03');