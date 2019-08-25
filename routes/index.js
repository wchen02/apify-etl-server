const apifyRoutes = require('./apify');

module.exports.initRoutes = (app) => {
    app.get('/', (req, res) => res.send('Welcome to apify handler!'));
    app.use('/apify', apifyRoutes);
};
