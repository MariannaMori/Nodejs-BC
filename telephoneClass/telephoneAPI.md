# Phone API

## json-storage file
### phones.json

```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home", "number":"12345678"},
            {"type":"work", "number":"87654321"},
            {"type":"mobile", "number":"05040302"}
        ]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[
            {"type":"home", "number":"56834923"},
            {"type":"work", "number":"32121367"},
            {"type":"work", "number":"7635462"}
        ]
    }
]
```

## constractor

Phones json object is passed as a parameter to the constructor. If the parameter is missing, the exception `'phone info missing'` is thrown.

## methods

### **getTypes()**
returns all phone types found in the phone data. A type is added only once in the result array. If there are no types, the method returns an empty array.

Example: ["home","work","mobile"]

### **getNumbersByType(firstname, lastname, type)**

Method returns an array of phone numbers of given `type`, `firstname` and `lastname`.
-   if no person with given `type`, `firstname` and `lastname` is found, an empty array is returned
-   if at least one parameter is missing, an exception
     `'missing parameter'` is thrown

Example: for home of Leila Hökki: ["12345678"]
Example: for work numbers of Matt River: ["32121367","7635462"]

### **getAllNumbersByType(type)**
Returns an array of names and numbers of given type. If no number of given type is found, returns an epty array. If same person have multiple numbers of the given type, each of them will be in it's own object

If the type parameter is missing, the method throws an exception 
`'type missing'`

The format of the returned object:
```json
[
    {"firstname":"", "lastname":"", "number":{"type":"", "tel":""}},
    {"firstname":"", "lastname":"", "number":{"type":"", "tel":""}}
]
```

### **getAllNumbers()**

Return all numbers in an array objects. The format of the object is:
```json
{"firstname":"", "lastname":"","phones":[]}
```

The format of the phone object is:
```json
 {"type":"", "number":""}
 ```

If a person doesn't have a phone (phones-field is an empty array), then the person is not added to the result array.

If all phones are missing (for all persons) an empty array is returned

### **getName(number)**

The method searches the given phone number from the phone registry. If the number if found, it returns an json object of form:

```json
{"firstname":"", "lastname":""}
```
If no phone with the given number is found, `null` is returned
If the parameter is missing `null` is returned
