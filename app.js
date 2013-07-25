var express = require('express');
var routes = require('./routes');
var datastore = require('./routes/datastore');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
   app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/grapher/:deviceNickname/:channelName', routes.index);
app.get('/users/:uid/sources/list', datastore.listSources);
app.get('/tiles/:uid/:deviceNickname.:channelName/:level.:offset.json', datastore.getTile);
app.post('/api/bodytrack/jupload', datastore.uploadJson);

http.createServer(app).listen(app.get('port'), function() {
   console.log('Express server listening on port ' + app.get('port'));
});