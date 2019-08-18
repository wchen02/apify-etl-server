const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/process-dataset', (req, res) => {
    res.send('Hello from process-dataset!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
