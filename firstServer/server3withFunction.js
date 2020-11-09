'use strict';

const person = require('./person.json');

const http = require('http');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.write(createHtml(person));
    res.end();
});

server.listen(port,host, ()=>console.log(`Server ${host}, port:${port}`));

function createHtml(data) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Person data</title>
        </head>
        <body>
            <h1>Person</h1>
            <h2>${data.firstname} ${data.lastname}</h2>
        </body>
    </html>`;
}