var fs = require('fs');
const json2xls = require('json2xls');

let rawData = fs.readFileSync('../googleStoreData/24.03/bet.json');
let data = JSON.parse(rawData);

let xls = json2xls(data);
fs.writeFileSync('data.xlsx', xls, 'binary');

