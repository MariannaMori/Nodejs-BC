'use strict';

const phones=require('./phone');

console.log(phones);

//first number of the first person
console.log(phones[0].numbers[0]);
//second number of the first person
console.log(phones[0].numbers[1]);

console.log(phones[0].firstname, phones[0].numbers[0]);
console.log('\n##################\n');
for(let person of phones) {
    for(let number of person.numbers) {
        console.log(`${person.firstname} ${person.lastname}: ${number}`);
    }
}

console.log('\n##################\n');
//Matt River: 0401234567, 1234567
//Mary Smith: 987654
//Vera River has no numbers

for(let person of phones) {
    if(person.numbers.length===0) {
        console.log(`${person.firstname} ${person.lastname} has no numbers`);
        console.log('\n##################\n');
        for(let person of phones) {
            
        }
    }
}