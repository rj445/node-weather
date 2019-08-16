const express = require('express');
const path = require('path');
const hbs = require('hbs');
const utils = require('./utils/util');

const app = express();

//configure path
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setting up template engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setting up static content
app.use(express.static(publicPath));

//Routings

app.get('/weather', (req, res) => {
    let callback = function ({ latitude, longitude }) {
        console.log('Latitude in api: ' + latitude);
        utils.getWeather(latitude, longitude, (response) => {
            console.log('-- Final Response --');
            console.log(response);
            res.send(response);
        });
    }
    utils.getGeoCode(req.query.address, callback);
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Main Page'
    });
});
app.get('*', (req, res) => {
    res.send('404, Page Not Found');
})

setTimeout(() => console.log('Setting time out'), 0);
app.listen(3000, () => {
    console.log('Listening on port 3000');
});