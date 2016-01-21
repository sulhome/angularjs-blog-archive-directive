var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/../dist'));

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('application started on port ' + port + ' and host' + host);
});