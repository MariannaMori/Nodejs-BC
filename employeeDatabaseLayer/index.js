'use strict';

const http=require('http');
const express=require('express');
const cors = require('cors');
const path = require('path');

const app= express();
const port=3000;
const host='localhost'

const DataLayer = require('./datastorageLayer');
const db=new DataLayer();

const server=http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/employees', async (req,res)=>res.json(await db.getAll()));

app.get('/employees/:employeeId',...)

server.listen(port,host,()=>console.log(`${host}:${port} running`));
