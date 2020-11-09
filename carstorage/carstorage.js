'use strict';

const cars = require('./cars.json');

function getWithLicence(licence){
    for(let car of cars) {
        if(car.licence===licence) {
            return car;
        }
    }
    return null;
}

function getWithModel(model){
    const found=[];
    for(let car of cars){
        if(car.model===model) {
            found.push(car);
        }
    }
    return found;
}

module.exports={
    getWithLicence, getWithModel
}