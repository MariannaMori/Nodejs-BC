'use strict';

const phoneRegister = require('./phones.json');

function getTypes() {
    const types=[];  //to give array and not list
    for(let person of phoneRegister) {
        for(let phone of person.phones) {
            if(!types.includes(phone.type)) {
                types.push(phone.type);
            }
        }
    }
    return types;

}

function getNumbersByType(firstname, lastname, type){
    if(firstname && lastname && type) {
        const numbers=[];
        for(let person of phoneRegister) {
            if(person.firstname===firstname && person.lastname===lastname){
                for(let phone of person.phones) {
                    if(phone.type===type) {
                        numbers.push(phone.number);
                    }
                }
            }
        }
        return numbers;

    }
    else {
        throw new Error('missing parameter');
    }

}

function getAllNumbersByType(type) {
    if(!type) throw new Error ('missing parameter');

    const numbersFound=[];
    for(let person of phoneRegister) {
        for(let phone of person.phones) {
            if(phone.type===type) {
                numbersFound.push ({
                    firstname:person.firstname,
                    lastname: person.lastname,
                    number:{type:phone.type, tel:phone.number}
                });
            }
        }
    }
    return numbersFound;
}


module.exports={
    getTypes, getNumbersByType, getAllNumbersByType
}