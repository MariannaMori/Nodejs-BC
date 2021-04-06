### **getWithLicence(licence)**

```json
[
    {"model":"Bored T-Model", "licence":"XYZ-987", "type":"XL"},
    {"model":"Nova", "licence":"ABC-1", "type":"GT"},
    {"model":"Bored T-Model", "licence":"ABE-13", "type":"XL"},
    {"model":"Nova", "licence":"DFG=123", "type":"GTX"}
]
```

Return a car with the given licence number. Licence number is unique.

Parameter:

`licence`: licence number. 

If no parameter is given, function throws an exception:`'licence number missing'`;

Function returns:
-   if the car is found, function returns that car object
-   if no car with the given licence was found, function returns `null`.

#### Test 1: test with licence "XYZ-987"
call: getWithLicence("XYZ-987")
expect: {"model":"Bored T-Model", "licence":"XYZ-987", "type":"XL"}

#### Test2: test with licence 'X-1'
call: getWithLicence("X-1")
expect: null

### Test3: Test without parameters
call: getWithLicence()
expect: throw an exception:`'licence number missing'`