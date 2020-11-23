'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const {port,host,storage} = require('./serverConfig.json');

const {createDataStorage} = require(path.join(__dirname,storage.storageFolder,storage.dataLayer));



const dataStorage = createDataStorage();

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageviews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const menuPath=path.join(__dirname,'menu.html');

app.get('/', (req,res)=>res.sendFile(menuPath));

app.get('/all', (req,res)=>
dataStorage.getAll()
.then(data => 
    res.render('allPersons',{result:data.map(emp=>createPerson(emp))}))
    );

app.get('/getPerson', (req,res)=>
res.render('getPerson',{
    title:'Get',
    header:'Get',
    action: 'getPerson'
})
);

app.post('/getPerson', (req,res)=>{
    if(!req.body) res.sendStatus(500);

    const personId = req.body.personId;
    dataStorage.get(personId)
    .then(employee=>res.render('personPage',{result:createPerson(employee)}))
    .catch(error=>sendErrorPage(res,error));
})

server.listen(port, host, ()=>console.log(`Server ${host}:${port} running`));

function sendErrorPage(res,error) {
    res.end();
}

//from employee to person

function createPerson(employee){
    return {
        personId: employee.employeeId,
        firstname: employee.firstname,
        lastname: employee.lastname,
        department: employee.department,
        salary: employee.salary
    }
}
//from person to employee
function createEmployee(person) {
    return {
        employeeId: person.personId,
        firstname: person.firstname,
        lastname:person.lastname,
        department: person.department,
        salary: person.salary
    }
}