const dotenv = require('dotenv');
const log = require('loglevel');

dotenv.config();
log.setLevel(process.env.LOG_LEVEL);

module.exports = log;
