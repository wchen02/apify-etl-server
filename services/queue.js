const Queue = require('better-queue');
const apifyLib = require('apify-etl-lib')();

const queue = new Queue(async function (input, cb) {
    console.log(input);
    await apifyLib.processDataset(process.env);
});

modules.exports = queue;
