const express = require('express');
const request = require('request-promise');
const cors = require('cors');
let os = require('os');
const { json, application } = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const { doesNotMatch } = require('assert');
const app = express();


const pool = new Pool({
    host: 'postgres',
    user: 'postgres',
    password: 'postgres',
    database: 'rutificador',
    port: '5432'
});

const sql = fs.readFileSync('./db/db.sql').toString();

const existsTable = pool.query(sql, function (err, result){
    if(err){
        console.log('error', err);
    }
});
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
    existsTable;
    console.log(process.env['DATABASE_URL']);
});

app.get('/', function(req, res){

});