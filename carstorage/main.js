'use strict';

const {getWithLicence, getWithModel} = require('./carstorage');

const car=getWithLicence('ABC-1');
if(car) {
    console.log(car.model);
}

for(let car of getWithModel('Hoppa')) {
    console.log(car);
}
