'use strict';

const { search } = require('./personsDatalayer');

console.log(search());
console.log(search('firstname'));
console.log(search('firstname','Matt'));
console.log(search('lastname','River'));
console.log(search('age',30));
console.log(search('age', '50'));
console.log(search('x', 30));
console.log(search('age', 300));