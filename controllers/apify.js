const dotenv = require('dotenv');
const log = require('loglevel');
const apify = require('../lib/apify-client')();

exports.processDataset = async function(req, res) {
    dotenv.config();
    const options = process.env;
    log.setLevel(options.LOG_LEVEL);
    await apify.processDataset(options);
}