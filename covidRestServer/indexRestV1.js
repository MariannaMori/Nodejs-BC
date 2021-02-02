'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const {writeStorage} = require('./jsonReaderWriter.js');
const { dateToIsoDate, isoDateNow, addDays, addOneDay} = require('./datelibrary');

const covidDataFile = path.join(__dirname, 'covid19DataFIN.json');

let covidData = require(covidDataFile);

const {port,host,countryCode} = require('./config.json');

function checkUpdate() {
    return false;//covidData.lastupdate !== isoDateNow();
}

function updateCovidData(){
    return new Promise(async (resolve,reject)=>{
        try{
            const result = await fetch(`https://covidapi.info/api/v1/country/${countryCode}`);
            const data = await result.json();
            data.lastupdate = isoDateNow();
            console.log('updated'); //just for debuging
            await writeStorage(covidDataFile,data);
            resolve(data);
        }
        catch(err) {
            reject(new Error(err.message));
        }
    });
}

const app = express();
const server = http.createServer(app);

app.use(cors());

//endpoints
app.get('/api/v1/cases/cumulative', async(req,res)=>{
    if(checkUpdate()) {
        covidData = await updateCovidData();
    }
    const dateStrings=Object.keys(covidData.result);
    const data=dateStrings.map(date=>covidData.result[date].confirmed);
    // const data = dateStrings.map(date => ({date,confirmed:covidData.result[date].confirmed}));
    res.json(data);
});

app.get('/api/v1/cases/daily', async (req,res)=>{
    if(checkUpdate()) {
        covidData = await updateCovidData();
    }
    const dateStrings = Object.keys(covidData.result);
    const data = dateStrings.map(date => covidData.result[date].confirmed);
    const dailyCases = [];
    for (let i = 0; i < data.length - 1; i++) {
        dailyCases.push(data[i + 1] - data[i]);
    }
    res.json(dailyCases);
});

//begindate, enddate and date are in ISO format.
//returns an array of objects like {date:"2021-01-01", confirmed:36403}
app.get('/api/v1/cases/daily/interval/:begindate/:enddate',async (req,res)=>{
    if(checkUpdate()) {
        covidData = await updateCovidData();
    }
    const beginISO = req.params.begindate;
    const endISO = req.params.enddate;
    const cases=[];
    for(let date=beginISO; date<=endISO; date=addOneDay(date)){
        cases.push({date:date, confirmed:covidData.result[date].confirmed});
    }
    res.json(cases);
});

//returns number of cumulative cases up to given day: for example if the 
//date is 2021-01-01 it returns 36403
app.get('/api/v1/cases/cumulative/:enddate', async (req,res)=>{
    if (checkUpdate()) {
        covidData = await updateCovidData();
    }
    if (covidData.result[req.params.enddate]) {
        res.json({data:covidData.result[req.params.enddate].confirmed});
    }
    else {
        res.json({error:'not found'});
    }
    
});

//returns daily number of new cases. The number is the difference of todays and yesterdays
//cumulative confirmed cases. For example difference of confirmed cumulative cases 
//2021-01-01 and 2020-12-31 so it would be 36403-36107=296
app.get('/api/v1/cases/daily/:date', async (req,res)=>{
    if (checkUpdate()) {
        covidData = await updateCovidData();
    }
    const confirmedToday=covidData.result[req.params.date].confirmed;
    const confirmedYesterday=covidData.result[addDays(req.params.date,-1)].confirmed;
    res.json(confirmedToday-confirmedYesterday);
});

server.listen(port,host,()=>console.log(`Server ${host}:${port} is running`));

