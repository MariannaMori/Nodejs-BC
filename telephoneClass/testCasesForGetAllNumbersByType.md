# Test cases for the method getAllNumbersByType

## getAllNumbersByType(type) API
Returns an array of names and numbers of given type. If no number of given type is found, returns an empty array. If same person have multiple numbers of the given type, each of them will be in it's own object

If the type parameter is missing, the method throws an exception 
`'type missing'`

The format of the returned object:
```json
[
    {"firstname":"", "lastname":"", "number":{"type":"", "tel":""}},
    {"firstname":"", "lastname":"", "number":{"type":"", "tel":""}}
]
```

### Test 1: All home numbers

```js
phoneRegister.getAllNumbersByType('home');
```

expect to return

```json
[
    {"firstname":"Leila", "lastname":"Hökki", "number":{"type":"home", "tel":"12345678"}},
    {"firstname":"Matt", "lastname":"River", "number":{"type":"home", "tel":"56834923"}}
]

```

### Test 2: All work numbers

```js
phoneRegister.getAllNumbersByType('work');
```

expect to return

```json
[
    {"firstname":"Leila", "lastname":"Hökki", "number":{"type":"work", "tel":"87654321"}},
    {"firstname":"Matt", "lastname":"River", "number":{"type":"work", "tel":"32121367"}},
    {"firstname":"Matt", "lastname":"River", "number":{"type":"work", "tel":"7635462"}}
]

```

### Test 3: given type not found

```js
phoneRegister.getAllNumbersByType('x');
```
expect to get []

### Test 4: missing parameter throws an exception 
```js
phoneRegister.getAllNumbersByType();
```

expect to throw 'type missing'