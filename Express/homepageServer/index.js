'use strict';

const http = require('http');
const path= require('path');
const express=require('express');

const app = express(); //initiate express

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer(app);

const homePath=path.join(__dirname,'home.html');
const pageBpath=path.join(__dirname,'pageB.html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>res.sendFile(homePath)); //request handler so we could respond to coming request from a website. get is a type of http request, / indicates "for the home page". in function (request, response), 


app.get('/someotherpage', (req,res)=>res.sendFile(pageBpath));

server.listen(port, host, ()=>console.log(`Server ${host}:${port} serving`));