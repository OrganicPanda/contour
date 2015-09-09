var path = require('path')
  , hgt = require('node-hgt')
  , express = require('express')
  , app = express()
  , tileset = new hgt.TileSet(path.resolve(__dirname, 'data/'))
  , host = process.argv[2] || 'localhost'
  , port = process.argv[3] || 3000;

app.get('/api/elevation', function(req, res) {
  var lat = 50.846793899999994
    , long = -0.1114635;

  tileset.getElevation([lat, long], function(err, elevation) {
    if (err) {
      console.log('getElevation failed:', err.message);
      res.send('Failed! ' + err.message);
    } else {
      console.log('getElevation:', elevation);
      res.send('elevation! ' + elevation);
    }
  });
});

var server = app.listen(port, host, function() {
  console.log('API listening at http://%s:%s', host, port);
});