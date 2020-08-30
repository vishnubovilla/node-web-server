const path = require('path');
const express = require('express');
// const { response, request } = require('express');
const hbs = require('hbs');
const { request } = require('http');
const { response } = require('express');

const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);
// console.log(__directorypath);

// define paths for express configs
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../public/templates/views');
const partialsPath = path.join(__dirname, '../public/templates/partials');


// set up handler bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directories location
app.use(express.static(publicDirPath));


app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        createdBy: 'Vishnu Bovilla'
    })
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        createdBy: 'Vishnu Bovilla'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        message: 'This is sample message',
        createdBy: 'Vishnu Bovilla'
    });
});

// app.get('', (request, response) => {
//     response.send('<h1>Home</h1>');
// });

// app.get('/help', (request, response) => {
//     response.send([
//         { name: 'Vishnu' },
//         { name: 'Harini' }
//     ])
// });

// app.get('/about', (request, response) => {
//     response.send('<h1>About Us</h1>')
// });

app.get('/weather', (request, response) => {
    console.log(request.query.address);
    if (!request.query.address) {
        return response.send({
            error: 'You must provide a address'
        })
    }

    geoCode(request.query.address, (error, data) => {
        if (error) {
            console.log(error);
            return response.send({
                error: error
            });
        } else {
            const { placeName: place, latitude, longitude } = data;
            forecast(latitude, longitude, (error, { actualTemperature, feelslikeTemperature, weatherDesc, placeName } = {}) => {
                if (error) {
                    console.log(error);
                    return response.send({
                        error: error
                    })
                } else {
                    // const { temperature: actualTemperature, feelslike: feelslikeTemperature } = data;
                    // console.log('It is currently ' + actualTemperature + ' degrees out. It feels like ' + feelslikeTemperature + ' degrees out.');
                    return response.send({
                        place: place,
                        weatherDesc: weatherDesc,
                        actualTemperature: actualTemperature,
                        feelslikeTemperature: feelslikeTemperature,
                        location: place,
                        forecast: weatherDesc + " " + actualTemperature + " " + feelslikeTemperature,
                    })
                }
            });
        }
    })

    // response.send({
    //     place: request.query.address,
    //     forecast: '98 degress'
    // })
});

app.get('/products', (request, response) => {
    console.log(request.query.search);
    if (!request.query.search) {
        // console.log('You must provide a search text.');
        return response.send({
            error: 'You must provide a search text',
        })
    }

    response.send({
        products: []
    })
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        errorMessage: 'Help Article Not Found',
        createdBy: 'Vishnu Bovilla'
    })
});


app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        errorMessage: 'Page Not Found',
        createdBy: 'Vishnu Bovilla'
    })
});

app.listen(port, () => {
    console.log('starting web server at port # '+port)
});