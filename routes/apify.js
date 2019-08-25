const express = require('express');
const apifyController = require('../controllers/apify');
const { version } = require('../package.json');

const router = express.Router();

router.get('/', (req, res) => res.send(`Welcome to apify-etl-server v${version}!`));
router.post('/process-dataset', async (req, res) => {
    try {
        await apifyController.processDataset(req, res);
    } catch (err) {
        res.status(500).send({ error: 'Something failed!' });
    }
});

module.exports = router;
