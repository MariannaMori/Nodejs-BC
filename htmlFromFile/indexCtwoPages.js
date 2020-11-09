'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const {port, host} = require('./config');

const homePath=path.join(__dirname, 'home.html');
const pageA = path.join(__dirname, 'pageA.html');

const server = http.createServer( (req,res)=>{
    const urlData=url.parse(req.url, true);
    const route = decodeURIComponent(urlData.pathname);
    if(route==='/') {
        sendFile(res, homePath);
    }
    else if(route==='/pagea'){
        sendFile(res, pageA);
    }
    else if(route.startsWith('/styles/')){
        console.log(route);
        sendStyles(res, path.join(__dirname, route));
    }
    else {
        res.statusCode=404;
        res.end('Error: page not found' );
    }
    
});

server.listen(port, host, 
    ()=>console.log(`Server running, ${host}:${port}`));

async function sendFile(res, filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch (err) {
        res.statusCode = 404;
        res.end(`Error: ${err.message}`);
    }
}

async function sendStyles(res, filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/css',
            'Content-Length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch (err) {
        res.statusCode = 404;
        res.end(`Error: ${err.message}`);
    }
}