var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
});

var PORT = process.env.NODE_ENV || 3000;

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:false}));



app.get('/', function (req, res){
    res.render('index');
});

app.post('/register', function (req,res){
    console.log(req.body.email, req.body.password);
    connection.query("INSERT INTO user_table (email, password) VALUES (? , ?)", [req.body.email, req.body.password]);

});



app.listen(PORT, function(){
    console.log("Listening at %s", PORT);
});