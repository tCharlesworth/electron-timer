const fs = require('fs');

module.exports = {
    SaveTimers: (timers) => {
        fs.writeFileSync('./timers.txt', JSON.stringify(timers));
    },
    ReadTimers: () => {
        let filepath = './timers.txt';
        try {
            let data = fs.readFileSync(filepath, {encoding: 'utf8'});
            return JSON.parse(data);
        } catch ( err ) {
            console.log(`Could not process: ${filepath}`, err);
            return [];
        }
    }
};