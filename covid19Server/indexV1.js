'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const covidData = require('./covid19DataFIN.json');

const {port,host} = require('./config.json');

const app = express();
const server = http.createServer(app);

const homePath=path.join(__dirname,'home.html');
const cumulativeBarsPath = path.join(__dirname,'cumulativeBars.html');
const dailyBarsPath=path.join(__dirname,'dailyBars.html');

app.use(cors());

app.get('/', (req,res)=>res.sendFile(homePath));
app.get('/cumulativebars', (req,res)=>res.sendFile(cumulativeBarsPath));
app.get('/dailybars', (req,res)=>res.sendFile(dailyBarsPath));

//endpoints
app.get('/api/v1/data', async(req,res)=>{
    const dateStrings=Object.keys(covidData.result);
    const data=dateStrings.map(date=>covidData.result[date].confirmed);
    // const data = dateStrings.map(date => ({date,confirmed:covidData.result[date].confirmed}));
    res.json(data);
});

app.get('/api/v1/daily',(req,res)=>{
    const dateStrings = Object.keys(covidData.result);
    const data = dateStrings.map(date => covidData.result[date].confirmed);
    const dailyCases = [];
    for (let i = 0; i < data.length - 1; i++) {
        dailyCases.push(data[i + 1] - data[i]);
    }
    res.json(dailyCases);
});

server.listen(port,host,()=>console.log(`Server ${host}:${port} is running`));

