const express = require('express');
const apifyController = require('../controllers/apify');
const { version } = require('../package.json');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to apify-etl-server v' + version + '!'));
router.get('/process-dataset', async (req, res) => {
    req.setTimeout(2 * 60 * 60 * 1000); // 2 hours
    try {
        await apifyController.processDataset(req, res);
        res.send('Done processing!');
    } catch(err) {
        res.status(500).send({ error: 'Something failed!' });
    }
});

module.exports = router;