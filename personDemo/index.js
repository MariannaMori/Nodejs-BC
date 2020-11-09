'use strict';

const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const {search} = require('./personsDatalayer');

const server = http.createServer((req,res)=>{
    const urlData=url.parse(req.url, true);
    const value=urlData.query.value;
    console.log(urlData.pathname);
    const route = decodeURIComponent(urlData.pathname).toLowerCase();
    console.log(route);
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
        result = search('age',value);
    }
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(createHtmlPage(result));
});

server.listen(port, host, ()=>console.log(`Listening ${host}:${port}`));

function createHtmlPage(resultArray) {
    let htmlPage=`
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Persons</title>
            </head>
            <body>
                <h1>Search result</h1>
                <table>
                    <thead>
                        <tr><th>First name</th><th>Last name</th><th>Age</th></tr>
                    </thead>
                    <tbody>`;
    for(let person of resultArray) {
        htmlPage+=`<tr>
        <td>${person.firstname}</td><td>${person.lastname}</td><td>${person.age}</td>
        </tr>`;
    };
    htmlPage+=`</tbody>
            </table>
        </html>`;
    return htmlPage;
}