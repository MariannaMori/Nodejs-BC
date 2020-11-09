'use strict';

const {getTypes, getNumbersByType, getAllNumbersByType} = require('./telephones');

console.log(getTypes());

console.log(getNumbersByType('Leila', 'Hökki','home'));
console.log(getNumbersByType('Matt', 'River', 'work'));

try {
console.log(getNumbersByType()); //gives error if run as it is
}


catch(err){
    console.log("Error:"+err.message);
}