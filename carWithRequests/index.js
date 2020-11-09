'use strict';

const http = require('http');
const url = require('url');

const config = require('./config.json');
const {
    getWithLicence, getWithModel, getAllCars
} =require('./carstorage');

const server= http.createServer((req,res)=>{
    const urldata=url.parse(req.url,true);
    const route=urldata.pathname;  //url pathname localhost:3000/seach everything after3000/ is a path like search or other
    let result=[];
    if(route==='/cars') {
        result=getAllCars();
    }
    else if(route==='/search/bylicence' && 
            urldata.query.licence){
        result=getWithLicence(urldata.query.licence);
    }
    else if(route==='/search/bymodel' &&
            urldata.query.model){
        result=getWithModel(urldata.query.model);  //our result, path is in serverusage search by licence
    }
   // res.writeHead(200, {'Content-Type':'application/json'});
  //  res.end(JSON.stringify(result,null,4)); //one of the pairs needs to be commented out to work
    res.writeHead(200,{'Content-Type':'text/html;charset-utf-8'});
    res.end(createHtml(result));
});

server.listen(config.port, config.host, 
    ()=>console.log(`Server ${config.host}, port:${config.port}`));

function createHtml(resultArray) {  //needed to split string, html turned into JS function
    let htmlString=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cars</title>
    </head>
    <body>
        <h1>Search result</h1>
        <table>
           <thread>
            <th>Model</th>
            <th>Licence</th>
           </thread>
           <tbody>`;

           for(let car of resultArray) {
               htmlString+=`<tr>
               <td>${car.model}</td><td>${car.licence}</td>
               </tr>`;
           }
           
          htmlString+= `  
               
           </tbody>
        </table>
        
    </body>
    </html>`
}