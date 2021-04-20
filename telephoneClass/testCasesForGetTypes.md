# Test cases for the method getTypes

## getTypes() API

returns all phone types found in the phone data. A type is added only once in the result array. If there are no types (phones), the method returns an empty array.

Example: ["home","work","mobile"]

## Test cases

### test 1 get the types of default json

expect to get  ["home","work","mobile"]

## test 2: person have no phones (no types)

testData is following:
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

expect to get an empty array []

## test 3: no persons in phoneRegister

testData is []
expect to get []