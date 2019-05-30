const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocoding = require('./utils/geocoding');
const weather = require('./utils/weather');

//console.log(path.join(__dirname, '../public'));
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.set('x-powered-by', false);
hbs.registerPartials(partialsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        currDate: new Date()
    });
});
app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help Page'
    })
});
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Page'
    })
});
app.get('/weather', (req, res)=>{
    if(!!req.query.address){ 
        geocoding(req.query.address, (geoResp) => {
            if(!geoResp.error) {
                weather.getWeatherReport(geoResp.lat, geoResp.lon, (weatherResp)=>{
                    weatherResp.location = geoResp.displayName;
                    res.send(weatherResp);
                })
            }
            else {
                res.send(geoResp);
            }
        });
    }
    else {
        res.send({
            error: 'Please provide an address.'
        });
    }
});
app.get('/help/*', (req,res)=> {
    res.render('404', {
        message: 'Help Page not found'
    })
});
app.get('*',(req,res)=> {
    res.render('404', {
        message: 'Page not found'
    })
});
app.listen('3000', ()=>{
    console.log("Server started on port 3000");
});