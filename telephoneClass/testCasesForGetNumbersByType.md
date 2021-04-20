# Test cases for the method getNumbersByType

## getNumbersByType(firstname, lastname, type) API

Method returns an array of phone numbers of given `type`, `firstname` and `lastname`.
-   if no person with given `type`, `firstname` and `lastname` is found, an empty array is returned
-   if at least one parameter is missing, an exception
     `'missing parameter` is thrown

Example: for home of Leila Hökki: ["12345678"]
Example: for work numbers of Matt River: ["32121367","7635462"]

## Test cases:

### Test 1: for home of Leila Hökki
expect to get ["12345678"]

### Test 2: for work numbers of Matt River
expect to get ["32121367","7635462"]

### Test 3: firstname or lastname or type not found
```js
phoneRegister.getNumbersByType('Leila','Hökki','x');
phoneRegister.getNumbersByType('Leila','x','home');
phoneRegister.getNumbersByType('x','Hökki','home');
phoneRegister.getNumbersByType('x','y','home');
phoneRegister.getNumbersByType('x','Hökki','y');
phoneRegister.getNumbersByType('Leila','x','y');
phoneRegister.getNumbersByType('x','y','z');
```

expect to get an empty array []

### Test 4: Missing parameter throws an exception
```js
phoneRegister.getNumbersByType('Leila','Hökki');
phoneRegister.getNumbersByType('Leila');
phoneRegister.getNumbersByType();
```


expect `'missing parameter'` to be thrown