# Car storage API

This library has functions to get cars by model or licence
or get all cars.

Result will be returned asd an array.

## getAllCars() 
first function:
returns all car objects as an array. If none is found, 
it returnes an empty array.

## getWithLicence(licence)
second function
returns a car object which has the same licence than the licence given as a parameter. The object is returned in an array,. If car is not found, it returns an empty array.

## getWithModel(model)
third function
returns all cars in an array that has the same model than the model given as a parameter. If none is found, 
it returnes an empty array.

