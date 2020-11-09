'use strict';

const http=require('http');

const cars=require('./cars.json');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end(createHtml(cars));

    // res.write(createHtml(cars));
    // res.end();
});

server.listen(port, host, ()=>console.log(`Server ${host}, port ${port}`));

//functions
function createHtml(data){
    let htmlString=`<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Car data</title>
            <style>
            h1{color:green;}
            </style>
        </head>
        <body>
            <h1>Cars</h1>`;
    for(let car of data) {
        htmlString += `<h2>${car.model}: ${car.licence}</h2>\n`
    }
    htmlString+=`   </body>
    </html>`;

    return htmlString;
}