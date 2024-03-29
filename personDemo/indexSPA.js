'use strict';

//another way
const http = require('http');
const url = require('url');
const fs=require('fs').promises;
const path = require('path');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const homePath=path.join(__dirname, 'home.html');

const {search} = require('./personsDatalayer');

const server = http.createServer((req,res)=>{
    const urlData=url.parse(req.url, true);
    const value=urlData.query.value;
    const route = decodeURIComponent(urlData.pathname).toLowerCase(); //now need to decide how case sentitive in path it is for a result, can add .toLowerCase()
    if(route==='/') {
        //sendFile
        sendFiles(res, homePath); //uses default value for contentType, send Files(res, homePath, 'text/html')
    }
    else if(route.startsWith('/styles/')) {
        sendFiles(res, path.join(__dirname, route), 'text/css');
    }
    else if (route.startsWith('/js/')) {
        sendFile(res, path.join(__dirname, route), 'text/javascript');
    }
    else {
        let result=[];
    if(route==='/persons') {
        result=search();
    }
    else if(route === '/persons/firstname') {
        result=search('firstname',value);
    }
    else if(route === '/persons/lastname') {
        result = search('lastname', value);
    }
    else if(route === '/persons/age') {
        result = search('age', value)
    }
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(result));

    }    
});

server.listen(port, host, ()=>console.log(`Listening ${host}:${port}`)); //default vaue for contentType

async function sendFile(res, filePath, contentType='text/html') {
    try{
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch(err) {
        res.statusCode=404;
        res.end(`Error: ${err.message}`);

    }
}






