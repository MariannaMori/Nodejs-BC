'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const {port,host} = require('./serverConfig.json');

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'pageviews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const fields = require('./fields.json');
const fieldsFI = require('./fieldsFI.json');

app.get('/', (req,res)=>{
    //console.log(req.headers['accept-language']); //pure node solution
    const lang=req.acceptsLanguages('en','fi');
    // console.log(lang);
    if(lang==='fi'){
        res.render('menu', { 
            language: 'fi', 
            title: 'Valikko', 
            header: 'Valikko',
            css:'menuStyles' 
        });
    }
    else {
        res.render('menu', { 
            language: 'en', 
            title: 'Menu', 
            header: 'Menu',
            css:'menuStyles' 
        });
    } 
});

app.route('/en')
    .get((req,res)=>res.render('form',{
        language:'en',
        title:'Data',
        header:'Fill',
        menuLabel:'Menu',
        submitLabel:'Submit',
        css:'styles',
        action:'/en',
        fields
    }))
    .post((req,res)=> res.render('datapage', {
        language:'en',
        title:'Data',
        header:'Data',
        menuLabel:'Menu',
        css:'styles',
        data:convertToLabelValuePairs(req.body,fields)
    }));
    // .post((req,res)=>res.json(req.body));

app.route('/fi')
    .get((req,res)=>res.render('form', {
        language:'fi',
        title:'Tiedot',
        header:'Syötä tiedot',
        menuLabel:'Valikko',
        submitLabel:'Lähetä',
        css:'styles',
        action:'/fi',
        fields:fieldsFI
    }))
    .post((req,res)=>res.render('datapage',{
        language:'fi',
        title:'Tiedot',
        header:'Syötit tiedot',
        menuLabel:'Valikko',
        css:'styles',
        data:convertToLabelValuePairs(req.body,fieldsFI)
    }));
    // .post((req,res)=>res.json(req.body));

server.listen(port,host,()=>console.log(`Listening ${host}:${port}`));

function convertToLabelValuePairs(data,fields){
    let labelValues={}
    for(let field of fields) {
        labelValues[field.label]=data[field.name];
    }
    return labelValues;
}


