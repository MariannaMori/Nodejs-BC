'use strict';
const toArrayInsert = customer =>[
    +customer.customerID,
     customer.firstname, 
     customer.lastname, 
     customer.favouriteIceCream, 
     customer.customerclass
]

const toArrayUpdate = customer => [
    customer.firstname, 
    customer.lastname, 
    customer.favouriteIceCream, 
    customer.customerclass, 
    +customer.customerID
]

module.exports={toArrayInsert, toArrayUpdate}