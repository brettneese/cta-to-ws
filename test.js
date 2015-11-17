require(["esri/layers/StreamLayer"], function(StreamLayer){
  var layerDefinition = {
    "geometryType": "esriGeometryPoint",
    "fields": [{
      name: "ObjectId",
      type: "esriFieldTypeOID",
      alias: "ObjectId"
    }, {
      name: "AltitudeFeet",
      type: "esriFieldTypeDouble",
      alias: "AltitudeFeet"
    }, {
      name: "ACID",
      type: "esriFieldTypeString",
      alias: "Aircraft ID"
    }]
  };

  var featureCollection = {
    layerDefinition: layerDefinition,
    featureSet: null
  };

  var layer = new StreamLayer(featureCollection, {
    socketUrl: "ws://ec2-54-224-125-57.compute-1.amazonaws.com:8080/faatrackinfo",
    purgeOptions: {
      displayCount: 1000
    }
  };

});
