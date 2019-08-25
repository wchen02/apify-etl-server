const express = require('express');
const bodyParser = require('body-parser');
const log = require('./bootstrap/log');
const { initRoutes } = require('./routes');
const services = require('./services');

const app = express();
const port = 3000;
app.use(bodyParser.json());

initRoutes(app);
services.init();

app.listen(port, () => log.info(`Server listening on port ${port}!`));
