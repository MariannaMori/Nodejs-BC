'use strict';
const toArrayInsert = customer =>[
    +customer.customerID,
     customer.firstname, 
     customer.lastname, 
     customer.favouriteIceCream, 
     +customer.customerClass
]

const toArrayUpdate = customer => [
    customer.firstname, 
    customer.lastname, 
    customer.favouriteIceCream, 
    +customer.customerClass, 
    +customer.customerID
]

module.exports={toArrayInsert, toArrayUpdate}