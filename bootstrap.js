const dotenv = require('dotenv');
const log = require('loglevel');

module.exports = function() {
    dotenv.config();
    log.setLevel(process.env.LOG_LEVEL);
}
