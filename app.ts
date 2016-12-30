﻿import express = require('express');
import routes = require('./routes/index');
import api = require('./routes/api');
import http = require('http');
import path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

import stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/query', routes.query);

app.get('/api/summary', api.getSummaryByUser);
app.get('/api/server', api.getSummaryFromServer);
app.get('/api/user', api.getSummaryFromUser);
app.get('/api/serverList', api.getServerList);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
