// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//{"ipaddress":"183.83.170.121","language":"en-GB,en-US;q=0.9,en;q=0.8",
//"software":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"}

app.get('/api/whoami', function(req, res){
  
  console.log(req.headers["x-forwarded-for"].split(",")[0]);
  console.log(req.headers["accept-language"]);
  console.log(req.headers["user-agent"]);
  
  res.json({"ipaddress": req.headers["x-forwarded-for"].split(",")[0],
            "language": req.headers["accept-language"],
             "software": req.headers["user-agent"]})
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
