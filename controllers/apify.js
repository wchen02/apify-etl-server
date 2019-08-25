const log = require('../bootstrap/log');
const queue = require('../services/queue');

exports.processDataset = (req, res) => {
    log.info('Enquing tasks: ');
    log.info(req.body);
    queue.publish('', 'apify-task', Buffer.from(JSON.stringify(req.body)));
    res.send('Acknowledged');
};
