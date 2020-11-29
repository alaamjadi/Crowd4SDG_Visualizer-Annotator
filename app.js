const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('test1.csv')
    .pipe(csv())
    .on('data', (row) => {
        results.push(row);
    })
    .on('end', () => {
        results.forEach(element => {
            console.log(element['id'])
        });
        //console.log(results[0]['id']);
        console.log('CSV file successfully processed');
    });