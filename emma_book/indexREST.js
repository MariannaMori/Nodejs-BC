'use strict';

const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

const Datastorage = require('./dataStorageLayer');
const db = new Datastorage();

const {port, host, resource} = require('./configREST.json');
const { debug } = require('console');

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get(`/${resource}`,(req,res)=>
db.getAll()
.then(result=>res.json(result))
.catch(error=>res.json(error)));

app.route(`/${resource}/:value`)

.get((req,res)=>
db.get(req.params.value)
 .then(result=>res.json(result))
 .catch(error=>res.json(error)))

 .delete((req,res)=> debug.remove(req.params.value)
  .then(result=>res.json(result))
  .catch(error=>res.json(error)))
  .put((req,res)=>{
      if(!req.body) res.sendStatus(400);
      if(req.body[idKey]===req.params.value){
          db.update(req.body)
          .then(result=>res.json(result))
          .catch(error=>res.json(error));
      }
      else {
          res.sendStatus(400);
      }
     
  });

  app.post(`/${resource}`,)


server.listen(port,host, 
    ()=>console.log(`Rest server ${host}:${port} running`));