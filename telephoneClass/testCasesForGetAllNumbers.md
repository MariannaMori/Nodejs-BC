# Test cases for the method getAllNumbers()

## getAllNumbers() API

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

## Test cases

### test 1: get All numbers fron the default json

```js
phoneRegister.getAllNumbers()
```

expect to get the default json object

### Test 2: some phones are missing

Testdata is:
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
        "phones":[]
    }
]
```
expect to get

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
    }
]
```

### Test 3: all phones are missing

testData:

```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[]
    }
]
```

expect to get []

### Test 4: if the json data is []
expect to get []