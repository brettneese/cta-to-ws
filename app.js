var _ = require('lodash');
var app = require('express')();
var Firebase = require('firebase');
var ArcGIS = require('terraformer-arcgis-parser');
var GeoJSON = require('geojson');

var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 4080;

var firebaseRef = new Firebase("https://cta-rt.firebaseio.com/");

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.get('/map', function (req, res) {
  res.sendFile(__dirname + '/map.html');
});

app.get('/streamserver', function (req, res) {
  res.sendFile(__dirname + '/schema.json');
});



app.get('/static', function (req, res) {

  firebaseRef.child("data").once("value", function(snapshot) {
    data = snapshot.val();
    var trains = [];
    var trainsArray = [];

    _.each(data, function(item){
      trains.push(item);
     });

     trains = _.flatten(trains);
     geojson = GeoJSON.parse(trains, {Point: ['lat', 'lon']});
     trains = ArcGIS.convert(geojson);
     res.send(trains);
  });

});


wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  ws.send('connected');

});




firebaseRef.child("data").on("child_changed", function(snapshot) {
  data = snapshot.val();
  var trains = [];
  var trainsArray = [];

  _.each(data, function(item){
    var point = [];
    point.push(item);

    geojson = GeoJSON.parse(point, {Point: ['lat', 'lon']});
    arcgis = ArcGIS.convert(geojson);
    console.log(arcgis);

      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(arcgis));
      });

  });




});




///server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port)});