var fs = require('fs');
const { Parser } = require('json2csv');
const xls = require('json2xls');

//Parse JSON to csv
//@param save path to save file
//@param read path of the file to parse
//@format csv or xls
function parseData(save, read, format) {

    let rawData = fs.readFileSync(read);
    let data = JSON.parse(rawData);
            
    switch(format) {
        case 'csv':
            const parser = new Parser();
            let csv = parser.parse(data);
            fs.writeFileSync(save, csv);
        break;

        case 'xls':
            let xlsx = xls(data);
            fs.writeFileSync(save, xlsx, 'binary');   
        break;     
    }              
}

//example
parseData('../csv/slots.csv', '../appleData/12.05/slots.json', 'csv');