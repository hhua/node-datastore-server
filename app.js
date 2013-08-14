var express = require('express');
var routes = require('./routes');
var datastore = require('./routes/datastore');
var visualization = require('./routes/visualization');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());        // enables gzip compression
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set("jsonp callback", true);
app.set('json spaces',0);           // setting this to 0 removes whitespace from json

// development only
if ('development' == app.get('env')) {
   app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/grapher/:deviceNickname/:channelName', routes.index);
app.get('/viz/:deviceNickname/:channelName', visualization.visual);
app.get('/users/:uid/sources/list', datastore.listSources);
app.get('/tiles/:uid/:deviceNickname.:channelName/:level.:offset.json', datastore.getTile);
app.post('/api/bodytrack/jupload', datastore.uploadJson);

var port = process.env.PORT | 3000;
app.listen(port);

console.log('Express server listening on port ' + port);