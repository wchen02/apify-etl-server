const amqp = require('amqplib/callback_api');
const log = require('../bootstrap/log');

// if the connection is closed or fails to be established at all, we will reconnect
let amqpConn = null;
let pubChannel = null;
const offlinePubQueue = [];


function work(msg, cb) {
    log.info('Got msg ', msg.content.toString());
    cb(true);
}

function closeOnErr(err) {
    if (!err) return false;
    log.error('[AMQP] error', err);
    amqpConn.close();
    return true;
}

function publish(exchange, routingKey, content) {
    try {
        pubChannel.publish(exchange, routingKey, content, {
            persistent: true,
        },
        (err, ok) => {
            if (err) {
                log.error('[AMQP] publish', err);
                offlinePubQueue.push([exchange, routingKey, content]);
                pubChannel.connection.close();
            }
        });
    } catch (e) {
        log.error('[AMQP] publish', e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}

function startPublisher() {
    amqpConn.createConfirmChannel((err, ch) => {
        if (closeOnErr(err)) return;
        ch.on('error', (err2) => {
            log.error('[AMQP] channel error', err2.message);
        });
        ch.on('close', () => {
            log.info('[AMQP] channel closed');
        });

        pubChannel = ch;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const m = offlinePubQueue.shift();
            if (!m) break;
            publish(m[0], m[1], m[2]);
        }
    });
}

// A worker that acks messages only if processed succesfully
function startWorker() {
    amqpConn.createChannel((err, ch) => {
        function processMsg(msg) {
            work(msg, (ok) => {
                try {
                    if (ok) ch.ack(msg);
                    else ch.reject(msg, true);
                } catch (e) {
                    closeOnErr(e);
                }
            });
        }

        if (closeOnErr(err)) return;
        ch.on('error', (err2) => {
            log.error('[AMQP] channel error', err2.message);
        });

        ch.on('close', () => {
            log.info('[AMQP] channel closed');
        });

        ch.prefetch(10);
        ch.assertQueue('jobs', {
            durable: true,
        }, (err2, _ok) => {
            if (closeOnErr(err)) return;
            ch.consume('jobs', processMsg, {
                noAck: false,
            });
            log.info('Worker is started');
        });
    });
}

function whenConnected() {
    startPublisher();
    startWorker();
}

function start() {
    amqp.connect(`${process.env.CLOUDAMQP_URL}?heartbeat=60`, (err, conn) => {
        if (err) {
            log.error('[AMQP]', err.message);
            return setTimeout(start, 1000);
        }
        conn.on('error', (err2) => {
            if (err2.message !== 'Connection closing') {
                log.error('[AMQP] conn error', err.message);
            }
        });
        conn.on('close', () => {
            log.error('[AMQP] reconnecting');
            return setTimeout(start, 1000);
        });
        log.info('[AMQP] connected');
        amqpConn = conn;
        whenConnected();

        return null;
    });
}

module.exports = {
    start,
    publish,
};
