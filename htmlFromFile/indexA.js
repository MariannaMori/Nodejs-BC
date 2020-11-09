'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const {port, host} =require('./config.json');

const homePath=path.join(__dirname,'home.html');

//console.log(homePath);

const server = http.createServer((req,res)=>{
    fs.readFile(homePath, 'utf8', (err,data) =>{  //err,data is a call back function
        if(err) {
            res.statusCode = 404;
            res.end( err.message ); //only for debbugging
        }
        else {
            res.writeHead(200, {  //if its no error, then happens this:
                'Content-Type' : 'text/html',
                'Content-Length':Buffer.byteLength(data,'utf8') //now browser needs to know how much data is coming
            });
            res.end(data);  //writing the data  //res.write(data); then res.end();
        }
    });
});

server.listen(port,host, 
    ()=>console.log(`${host}:${port} is running`));