const express = require('express');
const request = require('request-promise');
const cors = require('cors');
const { json, application } = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(require('./controllers/routes/index'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE', 'OPTIONS', 'HEAD');
    next();
});

app.listen(port, () =>{
    console.log(`Server iniciado en el puerto ${port}`);
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/src/views/index.html");
});

