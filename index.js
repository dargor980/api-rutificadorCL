const express = require('express');
const request = require('request-promise');
const cors = require('cors');
let os = require('os');
const { json, application } = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE', 'OPTIONS', 'HEAD');
    next();
});

app.use(require('./controllers/routes/index'));

app.listen(3000, () =>{
    console.log("Servidor iniciado en el puerto 3000");
});

app.get('/', function(req, res){

});