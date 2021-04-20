# Test cases for the method getTypes

## **getName(number)**

The method searches the given phone number from the phone registry. If the number if found, it returns an json object of form:

```json
{"firstname":"", "lastname":""}
```
If no phone with the given number is found, `null` is returned
If the parameter is missing `null` is returned

## Test cases

### Test 1: get the name of number "12345678"

call: 
```js
phoneRegister.getName("12345678");
```

expect to return: 
```json
{"firstname":"Leila", "lastname":"Hökki"}
```

### Test 2: get the name of the wrong number "0000"

call: 
```js
phoneRegister.getName("0000");
```

expect to return `null`

### 3: missing parameter
call: 
```js
phoneRegister.getName();
```

expect to return `null`

### 4: get name of numbers from default data

```js
const testValues=[
    //testvalue        expectedResult
    ["87654321",{"firstname":"Leila", "lastname":"Hökki"}],
    ["05040302", {"firstname":"Leila", "lastname":"Hökki"}],
    ["56834923", {"firstname":"Matt", "lastname":"River"}],
    ["32121367", {"firstname":"Matt", "lastname":"River"}],
    ["7635462", {"firstname":"Matt", "lastname":"River"}]
]