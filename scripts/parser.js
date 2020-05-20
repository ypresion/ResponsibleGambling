var fs = require('fs');
const { Parser } = require('json2csv');
const xls = require('json2xls');

//Parse JSON to csv
//@param file file name
//@param platform google or apple
//@date date string in DD.MM format
//@format csv or xls
function parseData(file, platform, date, format) {
    let path;
    switch(platform) {
        case 'apple':
            path = '../appleData/' + date + '/' + file + '.json';
            break;
            
        case 'google':
            path = '../googleData/' + date + '/' + file + '.json';
            break;
        }

    let rawData = fs.readFileSync(path);
    let data = JSON.parse(rawData);
            
    switch(format) {
        case 'csv':
            const parser = new Parser();
            let csv = parser.parse(data);
            fs.writeFileSync('../' + file + '.csv', csv);
        break;

        case 'xls':
            let xlsx = xls(data);
            fs.writeFileSync(file + '.xlsx', xlsx, 'binary');   
        break;     
    }              
}

//example
parseData('all', 'apple', '12.05', 'csv');