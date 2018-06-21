const fs = require('fs');

const FILE_TIMERS = './timers.txt';
const FILE_LINE_ITEMS = './lineItems.txt';

module.exports = {
    SaveTimers: (timers) => {
        fs.writeFileSync(FILE_TIMERS, JSON.stringify(timers));
    },
    ReadTimers: () => {
        try {
            let data = fs.readFileSync(FILE_TIMERS, {encoding: 'utf8'});
            return JSON.parse(data);
        } catch ( err ) {
            console.log(`Could not process: ${FILE_TIMERS}`, err);
            return [];
        }
    },
    ReadLineItems: () => {
        try {
            let data = fs.readFileSync(FILE_LINE_ITEMS, { encoding: 'utf8'});
            return JSON.parse(data);
        } catch ( err ) {
            if(err.errno == -2) {
                console.log('Line Item File Not Found')
            } else {
                console.log(`Could not process: ${FILE_LINE_ITEMS}`, err);
            }
            return [];
        }
    },
    SaveLineItems: (items) => {
        fs.writeFileSync(FILE_LINE_ITEMS, JSON.stringify(items));
    }
};