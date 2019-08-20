const queue = require('../services/queue');

exports.processDataset = function(req, res) {
    const ticket = queue.push(req.body);
    res.send(ticket.status);
}