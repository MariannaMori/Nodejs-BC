'use strict';

const {getCar} = require('./carstorage');

console.log(getCar('model','Hoppa'));

console.log(getCar('licence', 'ABC-1'));

console.log(getCar('model', 'x'));

console.log(getCar('price',1000));