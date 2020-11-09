'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const qs=require('querystring'); //build in node data form

const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';

const formPath=path.join(__dirname,'form.html');

const server=http.createServer((req,res)=>{
    if(req.method.toUpperCase()==='GET') { //read a file and send it to the browser, form itself
        fs.readFile(formPath, 'utf8', (err,data)=>{
            if(err) {
                res.statusCode=404;
                res.end(err.message);
            }
            else {
                res.writeHead(200, {
                    'Content-Type':'text/html',
                    'Content-Length': Buffer.byteLength(data,'utf8')
                });
                res.end(data);
            }
        });
    }
    else if(req.method.toUpperCase()==='POST') {
        if(req.headers['content-type']!='application/x-www-form-urlencoded'){  //data from the form. ! means not equals then...
            res.statusCode=400;
            res.end('error');
        }
        else {
            const databuffer=[];
            req.on('data', messageFragment=>databuffer.push(messageFragment));  //if event is data it will be added to data buffer, next data is handled

            req.on('end', ()=>{
                let tempdata = qs.parse(Buffer.concat(databuffer).toString());
                res.writeHead(200,{
                    'Content-Type':'application/json'
                });
                res.end(JSON.stringify(tempdata));
            });
            req.on('error', err=>console.log('Error:'+err.message));
        }
    }
});

server.listen(port,host, ()=>console.log(`Running ${host}:${port}`));