const request = require('request-promise');
const cheerio = require('cheerio');
const { Pool } = require('pg');

const getPerson = async (req, res) => {
    try{
        const rut = req.params.rut;
        const persona = await request.get(`https://nombrerutyfirma.com/rut?term=${rut}`);
        const $ = cheerio.load(persona);
        var datosPersona = {Nombre: '', RUT: '', Sexo: '', Direccion: '', Ciudad: ''};
        $("tbody tr").each((index, element) => {
            datosPersona.Nombre = $($(element).find("td")[0]).text(),
            datosPersona.RUT = $($(element).find("td")[1]).text(),
            datosPersona.Sexo = $($(element).find("td")[2]).text(),
            datosPersona.Direccion = $($(element).find("td")[3]).text(),
            datosPersona.Ciudad = $($(element).find("td")[4]).text()
        }); 
        res.status(200).json(datosPersona);
    } catch {
        res.status(404).json({
            message: 'Not Found'
        });
    }
}

const savePerson = async (req, res) => {
    try{
        const rut = req.params.rut;
        const persona = await request.get(`https://nombrerutyfirma.com/rut?term=${rut}`);
        const $ = cheerio.load(persona);
        var datosPersona = {Nombre: '', RUT: '', Sexo: '', Direccion: '', Ciudad: ''};
        $("tbody tr").each((index, element) => {
            datosPersona.Nombre = $($(element).find("td")[0]).text(),
            datosPersona.RUT = $($(element).find("td")[1]).text(),
            datosPersona.Sexo = $($(element).find("td")[2]).text(),
            datosPersona.Direccion = $($(element).find("td")[3]).text(),
            datosPersona.Ciudad = $($(element).find("td")[4]).text()
        }); 
        const response = await pool.query('insert into personas (rut, nombre, sexo, direccion, ciudad) values ($1, $2, $3, $4, $5)', [datosPersona.RUT,datosPersona.Nombre, datosPersona.Sexo, datosPersona.Direccion, datosPersona.Ciudad ]);
        console.log(response);
        res.status(200).json({
            mesage: 'OK'
        });
    } catch {
        res.status(412).json({
            message: 'Precondición Fallida'
        });
    }
}

const pool = new Pool({
    host: 'postgres',
    user: 'postgres',
    password: 'postgres',
    database: 'rutificador',
    port: '5432'
});

const getPersonByName = async (req, res) => {
    try{
        const nombre = req.params.nombre;
        const persona = await request.get(`https://nombrerutyfirma.com/buscar?term=${nombre}`);
        const  $ = cheerio.load(persona);
        var array = [];
        $("tbody tr").each((index, element) => {
            var Persona = {
                Nombre: $($(element).find("td")[0]).text(),
                Rut: $($(element).find("td")[1]).text(),
                Sexo: $($(element).find("td")[2]).text(),
                Direccion: $($(element).find("td")[3]).text(),
                Ciudad: $($(element).find("td")[4]).text()
            }
            array.push(Persona);
        });
        res.status(200).json(array);
    } catch {
        res.status(500).json({

            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    getPerson,
    getPersonByName,
    savePerson,
}