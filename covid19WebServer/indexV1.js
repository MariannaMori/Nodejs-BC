'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const {port,host} = require('./config.json');

const app = express();
const server = http.createServer(app);
//paths
const cumulativeLinePath=path.join(__dirname,'cumulativeLine.html');
const cumulativeBarsPath = path.join(__dirname,'cumulativeBars.html');
const dailyBarsPath=path.join(__dirname,'dailyBars.html');
const dailyLinePath=path.join(__dirname,'dailyLine.html');
const summaryPath = path.join(__dirname,'summary.html');
const menuPath = path.join(__dirname,'menu.html');

app.use(cors());
app.use(express.static(path.join(__dirname,'public'))); //told where to find public files in public folder

//roots to send different webpages
app.get('/', (req,res)=>res.sendFile(menuPath));
app.get('/cumulativeline', (req,res)=>res.sendFile(cumulativeLinePath))
app.get('/cumulativebars', (req,res)=>res.sendFile(cumulativeBarsPath));
app.get('/dailybars', (req,res)=>res.sendFile(dailyBarsPath));
app.get('/dailyline', (req,res)=> res.sendFile(dailyLinePath));
app.get('/summary', (req,res)=>res.sendFile(summaryPath));

server.listen(port,host,()=>console.log(`Server ${host}:${port} is running`));

