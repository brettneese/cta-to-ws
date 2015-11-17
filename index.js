// var _ = require('lodash');
// var app = require('express')();
// var Firebase = require('firebase');
// var ArcGIS = require('terraformer-arcgis-parser');
// var GeoJSON = require('geojson');

// var server = require('http').createServer()
//   , url = require('url')
//   , WebSocketServer = require('ws').Server
//   , wss = new WebSocketServer({ server: server })
//   , port = 4080;


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


// app.get('/map', function (req, res) {
//   res.sendFile(__dirname + '/map.html');
// });

// app.get('/streamserver', function (req, res) {
//   res.sendFile(__dirname + '/schema.json');
// });

// server.listen(port, function () { console.log('Listening on ' + server.address().port)});

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
