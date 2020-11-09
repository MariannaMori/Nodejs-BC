'use strict';

const cars=require('./cars.json');

// console.log(cars);

// for(let car of cars) {
//     if(car.model.toLowerCase()==='hoppa') {
//         console.log(car);
//     }
// }
// console.log('##################');
// for(let car of cars) {
//     if(car.licence==='ABC-1') {
//         console.log(car);
//     }
// }

function getWithLicence(licence) {
    for(let car of cars){
        if(car.licence===licence) {
            return car;
        }
    }
    return null;
}

console.log(getWithLicence('ABC-1'));
console.log(getWithLicence('x'));
if(getWithLicence('someCar')){
    console.log('car was found');
}
else {
    console.log('car was not found');
}
console.log('####');
const found=getWithLicence('ABC-1');
if(found) {
    console.log(found.model);
}
//failure!
// const notThere=getWithLicence('someCar');
//console.log(notThere.model);


function getWithModel(model) {
    const found=[];
    for(let car of cars) {
        if(car.model===model) {
            found.push(car);
        }
    }
    return found;
}

console.log(getWithModel('Hoppa'));
console.log('###############');
console.log(getWithModel('x'));
console.log('###############');
console.log(getWithModel('Ovlov'));
console.log('###############');

for(let car of getWithModel('Hoppa')) {
    console.log('Model: ${car.model}: licence: ${car.licence}');
}