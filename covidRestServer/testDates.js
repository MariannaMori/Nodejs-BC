'use strict';

const { dateToIsoDate, isoDateNow, addDays, addOneDay } =require('./datelibrary');

console.log(isoDateNow());

const test=new Date(Date.now());
console.log(test.toISOString())
console.log(test.toISOString().split('T'))

const someDate=new Date('2020-06-12');
console.log(dateToIsoDate(someDate));

console.log(addDays(dateToIsoDate(someDate),2));
console.log(addDays(dateToIsoDate(someDate), -2));
console.log('########');

for(let date=isoDateNow(), i=0; i<14; i++, date=addOneDay(date)) {
    console.log(date);
}

console.log('########');
const enddate = addDays(isoDateNow(), 6);
console.log('end:',enddate);

for(let date=isoDateNow(); date<=enddate; date=addOneDay(date)){
    console.log(date);
}



// let [a, b] = test.toISOString().split('T');
// console.log(a,'   ####   ', b)


// const [x,y,,...c]=[1,2,3,4,5,6,7];
// console.log(x);
// console.log(y);
// console.log(c);

// let w=2,t=3;
// console.log(w, t);
// [w,t]=[t,w];
// console.log(w,t);