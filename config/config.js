var express = require('express'); //passo 6
var consign = require('consign'); //passo 8
var bodyParser = require('body-parser'); //passo 11


//passo 6
module.exports = function(){
    var app = express();

    app.use(bodyParser.json()); //passo 11

    consign()
    .include('routes')
    .into(app); //passo 8
    return app;
}