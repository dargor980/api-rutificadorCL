const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getPerson, getPersonByName, savePerson } = require('../indexController');

router.get('/rut/:rut', getPerson);
router.get('/buscar/:nombre', getPersonByName);
router.get('/rut/:rut/guardar', savePerson);
app.use('/', router);

module.exports = app;