'use strict';

const customers = require('./customers.json');

console.log(customers[0].firstname);
console.log(`We have ${customers.length} customers`);
console.log(customers[2].bonus);

let sum=customers[0].bonus+customers[1].bonus+customers[2].bonus;
console.log(sum);

for(let customer of customers) {
    console.log(customer.firstname);
}

for(let i=0; i<customers.length; i++) {
    console.log(customers[i].lastname);
}

customers.forEach( customer => console.log(customer.bonus));


