'use strict';

const cars = require('./cars.json');

function getWithLicence(licence){
    if (!licence) throw new Error('licence number missing');

    for(let car of cars){
        if(car.licence===licence){
            return car;
        }
    }
    return null;
}

module.exports={
    getWithLicence
}