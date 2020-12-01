'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const {port,host,storage} = require('./serverConfig.json');

const { createDataStorage} = require(path.join( __dirname,
                                                storage.storageFolder,
                                                storage.dataLayer));

const dataStorage = createDataStorage();   

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'pageviews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const menuPath=path.join(__dirname,'menu.html');

app.get('/', (req,res)=>res.sendFile(menuPath));

app.get('/allCat', (req,res)=>
    dataStorage.getAll()
        .then(data => 
            res.render('allCat',{result:data.map(cat=>createCat(cat))}))
);

app.get('/getone', (req,res)=>
    res.render('getone', {
        title:'Get',
        header:'Get',
        action: '/getCat'
    })
);

app.post('/getCat', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    
    const catId = req.body.catId;
    dataStorage.get(catId)
        .then(cat=>
            res.render('catPage',{result:createCat(cat)}))
        .catch(error=>sendErrorPage(res,error));
});

app.get('/inputform', (req,res)=>
    res.render('form',{
        title:'Add cat',
        header:'Add a new cat',
        action:'/insert',
        catId:{value:'', readonly:''},
        name:{value:'', readonly:''},
        length:{value:'', readonly:''},
        breed:{value:'', readonly:''},
        yearOfBirth:{value:'', readonly:''}
    })
);

app.post('/insert', (req,res)=>{
    if(!req.body) res.sendStatus(500);

    dataStorage.insert(createCat(req.body))
        .then(status=> sendStatusPage(res,status))
        .catch(error => sendErrorPage(res,error));
});

app.get('/updateform', (req,res)=>
    res.render('form',{
        title:'Update cat',
        header:'Update cat data',
        action:'/updatedata',
        catId:{value:'', readonly:''},
        name:{value:'', readonly:'readonly'},
        length:{value:'', readonly:'readonly'},
        breed:{value:'',readonly:'readonly'},
        yearOfBirth:{value:'', readonly:'readonly'}
    })
);

app.post('/updatedata', (req,res)=>{
    if (!req.body) res.sendStatus(500);
    dataStorage.get(req.body.catId)
        .then(cat =>createCat(cat))
        .then(cat => res.render('form', {
                title:'Update cat',
                header:'Update cat data',
                action:'/updatecat',
                catId:{value:cat.catId, readonly:'readonly'},
                name:{value:cat.name, readonly:''},
                length:{value:cat.length, readonly:''},
                breed:{value:cat.breed, readonly:''},
                yearOfBirth:{value:cat.yearOfBirth, readonly:''}
            }))
        .catch(error=>sendErrorPage(res,error));
});

app.post('/updatecat',(req,res)=>{
    if(!req.body) res.sendStatus(500);
    else dataStorage.update(createCat(req.body))
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error));
});

app.get('/remove', (req,res)=>
    res.render('remove',{
        title:'Remove',
        header:'Remove a cat',
        action:'/remove'
    })
);

app.post('/remove', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    const catId=req.body.catId;
    dataStorage.remove(catId)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error));
});

server.listen(port, host, 
    ()=>console.log(`Server ${host}:${port} running`));

function sendErrorPage(res,error, title='Error', header='Error') {
    sendStatusPage(res, error, title, header);
}

function sendStatusPage(res, status, title='Status', header='Status'){
    return res.render('statusPage', {title,header,status});
}


function createCat(cat){
    return {
        catId: cat.catId,
        name: cat.name,
        length: cat.length,
        breed: cat.breed,
        yearOfBirth: cat.yearOfBirth
    }
}

