'use strict';

//javascript object
const person={
    firstname:'Leila',
    lastname:'Hökki',
    phone:'040123456' 
};

console.log(person.firstname);
console.log(person.lastname);
console.log(person.phone);
console.log(person['phone']);

person.age=30;
console.log(person);

person['second name']='Mary';
console.log(person);
console.log(person['second name']);

console.log(`My name is ${person.firstname} ${person['second name']}`);

let field='lastname';
console.log(field,person[field]);
field='age'
console.log(field,person[field]);

