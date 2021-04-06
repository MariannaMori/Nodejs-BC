# Carstorage API

Carstorage module `carstorage.js`. 

Module exports two functions: `getWithLicence` and `search`.

Data is stored in a `cars.json` file.

## cars.json

```json
[
    {"model":"Bored T-Model", "licence":"XYZ-987", "type":"XL"},
    {"model":"Nova", "licence":"ABC-1", "type":"GT"},
    {"model":"Bored T-Model", "licence":"ABE-13", "type":"XL"},
    {"model":"Nova", "licence":"DFG=123", "type":"GTX"}
]
```

## Functions

### **getWithLicence(licence)**

Return a car with the given licence number. Licence number is unique.

Parameter:

`licence`: licence number. 

If no parameter is given, function throws an exception:`'licence number missing'`;

Function returns:
-   if the car is found, function returns that car object
-   if no car with the given licence was found, function returns `null`.

### **search(key, value)**

Function returns all cars which matches the given (key, value) pair.

Parameters:
`key`: search criterion. Valit keys are `model`, `licence`, `type`
`value`: value to be searched

- if one or both paramaters are missing, function throws an exception: `'parameter missing'`
- if the key is not valid, function throws an exception: `'key not found'`

Function returns:
-   function returns all cars matching the given (key,value) pair as an array of car objects
-   if no car matches the given criterion, an empty array is returned

