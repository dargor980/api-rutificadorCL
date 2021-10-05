const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getPerson, getPersonByName } = require('../indexController');

router.get('/rut/:rut', getPerson);
router.get('/buscar/:nombre', getPersonByName);
app.use('/', router);

module.exports = app;