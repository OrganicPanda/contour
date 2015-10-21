var path = require('path')
  , hgt = require('node-hgt')
  , express = require('express')
  , app = express()
  , tileset = new hgt.TileSet(path.resolve(__dirname, 'data/'))
  , host = process.argv[2] || 'localhost'
  , port = process.argv[3] || 3000;

app.get('/api/elevation/:lat/:long', function(req, res) {
  var lat = req.params.lat
    , long = req.params.long;

  tileset.getElevation([lat, long], function(err, elevation) {
    if (err) return res.send({ error: err.message });

    return res.send({ elevation: elevation });
  });
});

app.use('/vendor', express.static(path.resolve(__dirname, '../vendor')));
app.use('/jspm.js', function(req, res) {
  res.sendfile(path.resolve(__dirname, '../jspm.js'));
});
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist')));

var server = app.listen(port, host, function() {
  console.log('API listening at http://%s:%s', host, port);
});