'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const port = 3000;
const host = 'localhost';

const { readStorage, writeStorage} = require('./jsonReaderWriter');

const app = express();
const server = http.createServer(app);

const dataPath = 'vantaaData.json';

function checkUpdate() {
    //here some complicated code to check if it is time to update local data
    return false; //return true; //only for debugging
}

app.get('/', (req,res)=>
    res.sendFile(path.join(__dirname,'vantaaJobsHome.html')));

app.get('/json', async (req,res)=>{
    try{
        if(checkUpdate()) {
            const result = await fetch('http://gis.vantaa.fi/rest/tyopaikat/v1');
            const data = await result.json();
            await writeStorage(dataPath,data);
            res.json(data);
            console.log('Updated'); //for debug
        }
        else {
            const storage = await readStorage(dataPath);
            res.json(storage);
        }
    }
    catch(err) {
        res.sendStatus=404;
    }
});

server.listen(port, host, ()=>console.log(`Server ${host} listens ${port}`));