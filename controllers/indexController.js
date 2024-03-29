const request = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');
const logger = require('../utils/logger');


const getPerson = async (req, res) => {
    try{
        const rut = req.params.rut;
        const options = {
            method: 'POST',
            uri: 'https://rutificador.org/backend.php',
            formData: {
                action: "search_by_rut",
                rut: rut
            },
            transform: function(body){

                return cheerio.load(body);
            }
        
        }
        var data = [];
        const $ = await request(options);
        
        $("tbody tr").each((index, element) => {
            if($($(element).find("td")[1]).text() == "")
                return        
            var persona = {
                RUT: $($(element).find("td")[1]).text(),
                Nombre: $($(element).find("td")[0]).text(),
                Sexo: $($(element).find("td")[2]).text(),
                Direccion: $($(element).find("td")[3]).text(),
                Ciudad: $($(element).find("td")[4]).text()
            }
            data.push(persona);
        }); 
       
        
        res.status(200).json(data[0]);
    } catch(err) {
        logger.error(`[GET] /api/v1/persona/rut [400] Error al encontrar el rut \n [Stacktrace] \n ${err.stack}`);
        res.status(404).json({
            message: 'Not Found'
        });
    }
}


const getPersonByName = async (req, res) => {
    try{
        const nombre = req.params.nombre;
        const options = {
            method: 'POST',
            uri: 'https://rutificador.org/backend.php',
            formData: {
                action: "search_by_name",
                name: nombre
            },
            transform: function(body){

                return cheerio.load(body);
            }
        
        }
        var data = [];
        const $ = await request(options);
        $("tbody tr").each((index, element) => {
            if($($(element).find("td")[0]).text() == "")
                return
            var Persona = {
                RUT: $($(element).find("td")[0]).text(),
                Nombre: $($(element).find("td")[1]).text(),
                Sexo: $($(element).find("td")[2]).text(),
                Direccion: $($(element).find("td")[3]).text(),
                Ciudad: $($(element).find("td")[4]).text()
            }
            data.push(Persona);
        });
        res.status(200).json(data);
    } catch(err) {
        logger.error('[GET] /api/v1/persona/buscar/ [500] Error al encontrar persona por nombre. \n [Stacktrace] \n ${err.stack}')
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getImg = async (req, res) => {
    var dir = path.parse(__dirname);
    res.sendFile(dir.dir + `/src/img/${req.params.img}`);
}

module.exports = {
    getPerson,
    getPersonByName,
    getImg
}