const express = require("express");
var ejs = require('ejs');
const path = require("path");
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const app = express();
mongoose.connect('mongodb://localhost:27017/login1', { useUnifiedTopology: true, useNewUrlParser: true });


const PORT = process.env.PORT || 3000;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
});


app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));


app.get("/gg", (req, res) => {
  res.send("hii");
  console.log("AB");
})

var index = require('./routes/index');
app.use('/', index);

app.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


//local
// initiateMultichain = function () {

//   var multichain = require("multichain-node")({
//     port: 2672,
//     host: "127.0.0.1",
//     user: "multichainrpc",
//     pass: "38avbzDndriTRb7BRUbencMyhUzC9u2vz3DfrTVZno6P",
//   });
//   return multichain;
// }

//AWS->
// initiateMultichain = function() {
// let multichain = require("multichain-node")({
//   port: 9734,
//   host: '127.0.0.1',
//   user: "multichainrpc",
//   pass: "96yXUaCkE9Szq1nAjK6zTkvNchRNik3Vq7Khv8bqJGAC"
//  });
//         return multichain;
// }
///////APIS

// app.post("/addproduct", function (req, res) {

//  var multichain = initiateMultichain();

//    var p={};
//    p=req.body;
//    JSON.stringify(p);
//    	multichain.publish(p, (err, info) => {
//        if(err)
//         res.send(err);
//     console.log('Response: '+info);
//     res.status(200).json({"Success":  info});
//    })
// });





app.listen(PORT, () => console.log(` Listening to port ${PORT} `));

