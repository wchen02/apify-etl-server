const express = require('express');
const apify = require('./controllers/apify');

const app = express();
const apifyApp = express();
const port = 3000;

app.get('/', (req, res) => res.send('Welcome to apify handler!'));
apifyApp.get('/', (req, res) => res.send('Welcome to apify handler!'));
apifyApp.get('/process-dataset', async (req, res) => {
    try {
        await apify.processDataset(req, res);
        res.send('Done processing!');
    } catch(err) {
        res.status(500).send({ error: 'Something failed!' });
    }
});
app.use('/apify', apifyApp);
app.listen(port, () => console.log(`Server listening on port ${port}!`));
