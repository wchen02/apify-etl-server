const apify = require('apify-etl-lib')();
const log = require('../bootstrap/log');
const queue = require('../services/queue');

exports.processDataset = (req, res) => {
    log.info('Enquing tasks: ');
    log.info(req.body);
    queue.publish('', 'jobs', Buffer.from(JSON.stringify(req.body)));
    res.send('Acknowledged');
};

exports.archive = (req, res) => {
    log.info('Archiving');
    res.json(process.env);
    apify.archive(process.env);
};
