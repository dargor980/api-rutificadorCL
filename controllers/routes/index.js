const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getPerson, getPersonByName, getImg } = require('../indexController');

router.get('/api/v1/persona/rut/:rut', getPerson);
router.get('/api/v1/persona/buscar/:nombre', getPersonByName);
router.get('/:img', getImg)
app.use('/', router);

module.exports = app;