const express = require('express');
const apifyController = require('../controllers/apify');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to apify handler!'));
router.get('/process-dataset', async (req, res) => {
    try {
        await apifyController.processDataset(req, res);
        res.send('Done processing!');
    } catch(err) {
        res.status(500).send({ error: 'Something failed!' });
    }
});

module.exports = router;