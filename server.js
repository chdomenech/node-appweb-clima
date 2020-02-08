/**
 * Author: Christian Domenech
 * Email : chdomavi@gmail.com
 * Server.js
 * 
 * Levanta un server express y crea servicios rest
 * y sirve una web con Handlebars
 * 
 */
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs');
const clima = require('./clima.js');
require('./server/config/config')
require('./hbs/helpers');

const app = express()

app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Rutas web
app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Christian Domenech'
    });
})

app.get('/info', (req, res) => {
    res.render('info');
});

//Rutas servicios rest
app.post('/wheater', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre de la ciudad es necesario'
        });
    } else {
        clima.getInfo(body.nombre)
            .then(respuesta => {
                res.render('respuesta', {
                    nombre: `El clima de ${respuesta.place}`,
                    clima: respuesta.weather.weather[0].description,
                    tipo_clima: respuesta.weather.weather[0].main,
                    temperatura: respuesta.weather.main.temp,
                    temp_min: respuesta.weather.main.temp_min,
                    temp_max: respuesta.weather.main.temp_max,
                    presion: respuesta.weather.main.pressure,
                    humedad: respuesta.weather.main.humidity
                });
            })
            .catch(error => {
                res.render('respuesta', {
                    nombre: error
                });
            });
    }
})

app.listen(process.env.PORT, () => { console.log(`Escuchango en el puerto ${process.env.PORT}`) })