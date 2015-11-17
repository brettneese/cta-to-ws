var _ = require('lodash');
var Firebase = require('firebase');
var ArcGIS = require('terraformer-arcgis-parser');
var GeoJSON = require('geojson');
var express = require('express');
var app = express();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.get('/map', function (req, res) {
  res.sendFile(__dirname + '/map.html');
});

app.get('/streamserver', function (req, res) {
  res.sendFile(__dirname + '/schema.json');
});



function parseAndSendData(data){
  var trains = [];
  var trainsArray = [];

  _.each(data, function(item){
    var point = [];
    point.push(item);

    geojson = GeoJSON.parse(point, {Point: ['lat', 'lon']});
    arcgis = ArcGIS.convert(geojson);
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(arcgis));
      });
  });

}

// theoretically we'd just to update things from here down
// send data when changed
var firebaseRef = new Firebase("https://cta-rt.firebaseio.com/");

firebaseRef.child("data").on("child_changed", function(snapshot) {
  parseAndSendData(snapshot.val()); 
});


//send data to start
wss.on('connection', function connection(ws) {
  firebaseRef.child("data").once("value", function(snapshot) {
      _.each(snapshot.val(), function(item){
        parseAndSendData(item); 
     });
  });

});

