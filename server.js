// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
var writeGood = require('write-good');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/suggestions", function (request, response) {
  var checks = {
    passive: true,
    illusion: true,
    so: true,
    thereIs: true,
    weasel: true,
    adverb: true,
    tooWordy: true,
    cliches: true,
    eprime: false
  }
  
  if (request.query.checks) {
    checks = request.query.checks.split('|').reduce(function (agg, check) {
      if (check in agg) {
        agg[check] = !agg[check]
      }
      return agg
    }, checks)
  }
  
  var suggestions = writeGood(request.query.sentence, checks);
  
  response.send(JSON.stringify(suggestions));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
