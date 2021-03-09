'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const fetch=require('node-fetch');

const {port,host} = require('./config.json');

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'pageviews'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>res.render('menu'));

app.get('/all', async (req,res)=>{
    try{
        const result = 
            await fetch('http://localhost:4000/customers',{mode:'cors'});
        const data = await result.json();
        res.render('allpage',{data});
    }
    catch(error){
        fetchError(res);
    }
});

app.route('/getone')
    .get((req,res)=>res.render('getform',{title:'Get',header:'Get', action:'/getone'}))
    .post(async (req,res)=>{
        try{
            const customerId=req.body.customerID;
            const result = 
                await fetch(`http://localhost:4000/customers/${customerId}`, { mode: 'cors' });
            const data = await result.json();
            res.render('customerpage',{data})
        }
        catch(error){
            fetchError(res)
        }      
});

app.route('/remove')
    .get((req, res) => res.render('getform', {
        title: 'Remove', 
        header: 'Remove', 
        action: '/remove' }))
    .post(async (req, res) => {
        try {
            const customerId = req.body.customerID;
            const options={
                method:'DELETE',
                mode: 'cors'
            };
            const result =
                await fetch(`http://localhost:4000/customers/${customerId}`,options);
            const data = await result.json();
            res.render('statuspage', { status:data });
        }
        catch (error) {
            fetchError(res)
        }
});

app.get('/insertform', (req,res)=>
    res.render('form',{
        title:'Add a customer',
        header:'Customer data',
        action:'/insert',
        customerId:{value:'', readonly:''},
        firstname: { value: '', readonly:'' },
        lastname: { value: '', readonly:'' },
        favouriteIceCream: { value: '', readonly:'' },
        customerclass: { value: '', readonly:'' }
    })
);

app.post('/insert', async (req,res)=>{ 
    try{
        const options={
            method:'POST',
            body:JSON.stringify(req.body),
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            }
        };

        const result = await fetch('http://localhost:4000/customers',options);
        const data= await result.json();
        res.render('statuspage', { status: data });
    }
    catch(error){
        fetchError(res);
    }
});

app.get('/updateform', (req, res) =>
    res.render('form', {
        title: 'Update a customer',
        header: 'Customer data',
        action: '/updatedata',
        customerId: { value: '', readonly: '' },
        firstname: { value: '', readonly: 'readonly' },
        lastname: { value: '', readonly: 'readonly' },
        favouriteIceCream: { value: '', readonly: 'readonly' },
        customerclass: { value: '', readonly: 'readonly' }
    })
);

app.post('/updatedata', async (req,res)=>{
    try{
        const customerId = req.body.customerID;
        const result =
            await fetch(`http://localhost:4000/customers/${customerId}`, { mode: 'cors' });
        const data = await result.json();
        if(data.message) {
            res.render('statuspage', { status: data });
        }
        else {
            res.render('form', {
                title: 'Update a customer',
                header: 'Customer data',
                action: '/update',
                customerId: { value: data.customerID, readonly: 'readonly' },
                firstname: { value: data.firstname, readonly: '' },
                lastname: { value: data.lastname, readonly: '' },
                favouriteIceCream: { value: data.favouriteIceCream, readonly: '' },
                customerclass: { value: data.customerclass, readonly: '' }
            });
        }  
    }
    catch(error){
        fetchError(res);
    }
});

app.post('/update', async (req,res)=>{
    try {
        const options = {
            method: 'PUT',
            body: JSON.stringify(req.body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const result = await fetch(`http://localhost:4000/customers/${req.body.customerID}`, options);
        const data = await result.json();
        res.render('statuspage', { status: data });
    }
    catch (error) {
        fetchError(res);
    }
});

server.listen(port,host,
    ()=>console.log(`Server ${host}:${port} running`));


function fetchError(res) {
        const status = { message: 'Failed to fetch', type: 'error' }
        res.render('statuspage', { status })
    }
































