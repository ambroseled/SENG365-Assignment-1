const express = require('express');
const bodyParser = require('body-parser');

const allowCrossOriginRequests = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
};

module.exports = function () {
    const app = express();
    app.rootUrl = '/api/v1';

    // MIDDLEWARE
    app.use(allowCrossOriginRequests);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: ['text/plain', 'image/png', 'image/jpeg'] }));  // for the /executeSql endpoint

    // ROUTES
    require('../app/routes/backdoor.routes')(app);
    require('../app/routes/venues.routes')(app);
    require('../app/routes/users.routes')(app);


    return app;
};
