const express = require('express');
const { response, request } = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('<h1>Home</h1>');
});

app.get('/help', (request, response) => {
    response.send([
        { name: 'Vishnu' },
        { name: 'Harini' }
    ])
});

app.get('/about', (request, response) => {
    response.send('<h1>About Us</h1>')
});

app.get('/weather', (request, response) => {
    response.send({
        place: 'Kadapa, YSR District, India',
        forecast: '98 degress'
    })
})



app.listen(3000);