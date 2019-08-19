const apifyLib = require('apify-etl-lib')();

exports.processDataset = async function(req, res) {
    await apifyLib.processDataset(process.env);
}