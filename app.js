const express = require('express');
const app = express();
const apify = express();
const port = 3000;

app.get('/', (req, res) => res.send('HEY THERE!'));
app.get('/', (req, res) => res.send('Hello World!'));
apify.get('/process-dataset', (req, res) => {
    res.send('Hello from process-dataset!');
});
app.use('/apify', apify);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
