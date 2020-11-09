'use strict';

const persons = require('./phones,json');

for(let person of persons) {
    console.log(`${person.firstname} ${person.lastname}`);
    for(let phone of person.phones) {
        console.log(`\t${phone.type} ${phone.number}`);
    }
}

for(let person of persons) {
    console.log(person.lastname);
    const types= [];
    for(let phone of person.phones) {
        if(!types.includes(phone.type)) {
            types.push(phone.type);
        }
    }
    console.log(types.join(`\n\t`));
}



//example testing:
const numbers=[1,2,3,4,5];

console.log(numbers.includes(2));
console.log(numbers.includes(123));

for(let i=0; i<10;i++) {

if(numbers.includes(i)) {
    console.log(`number ${i} is in the array`)
}

else {
    console.log(`number ${i}is not in the array`);
}
}
for(let i=0; i<10; i++){
    if(!numbers.includes(i)) {
        numbers.pushi();
    }
    else {
        console.log(`number ${i} was already in the array)
    }
}

console.log(numbers);