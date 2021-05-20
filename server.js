/**
 * Require
 */
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const { EDESTADDRREQ } = require('constants');
const { redirect } = require('statuses');

var app = express();

app.use(session({ // session
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

let result = "";
/**
 * Routes
 */
app.get('/', function(req, res){
    res.render('index', {result: result, their_num: req.body.guess});
});

app.post('/', function(req, res){
    if(!req.session.random_num){
        req.session.random_num = Math.floor(Math.random()*101);
    }
    console.log(req.session.random_num);
    if(req.body.guess > req.session.random_num){
        result = "lower";
    }else if(req.body.guess < req.session.random_num){
        result = "higher";
    }else{
        result = "congratulations";
    }
    res.render('index', {result: result, their_num: req.body.guess});
});

app.get('/play_again', function(req, res){
    req.session.destroy();
    result = "";
    res.redirect('/');
});

app.listen(8000, function(){
    console.log("Listening to port 8000");
});