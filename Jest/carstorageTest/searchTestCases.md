# **search(key,value)** tests cases

```json
[
    {"model":"Bored T-Model", "licence":"XYZ-987", "type":"XL"},
    {"model":"Nova", "licence":"ABC-1", "type":"GT"},
    {"model":"Bored T-Model", "licence":"ABE-13", "type":"XL"},
    {"model":"Nova", "licence":"DFG=123", "type":"GTX"}
]
```

Function returns all cars which matches the given (key, value) pair.

Parameters:
`key`: search criterion. Valit keys are `model`, `licence`, `type`
`value`: value to be searched

- if one or both paramaters are missing, function throws an exception: `'parameter missing'`
- if the key is not valid, function throws an exception: `'key not found'`

Function returns:
-   function returns all cars matching the given (key,value) pair as an array of car objects
-   if no car matches the given criterion, an empty array is returned

### Test 1: Search with model 'Nova'
call: search('model', 'Nova')
expect: [
    {"model":"Nova", "licence":"ABC-1", "type":"GT"},
    {"model":"Nova", "licence":"DFG=123", "type":"GTX"}
]

#### Test 2: Search with model 'X'
call: search ('model', 'X')
expect: []

#### Test 3: Seach with licence 'ABC-1'
call: search('licence', 'ABC-1')
expect: [
    {"model":"Nova", "licence":"ABC-1", "type":"GT"}
]

#### Test 4: Search with licence 'X-1'
call: search('licence', 'X-1');
expect: []


#### Test 5: Search with type 'GT'
call: search('type', 'GT')
expect:[
    {"model":"Nova", "licence":"DFG=123", "type":"GTX"}
]

#### Test 6: search with type 'XL'
call: search('type','XL')
expect:[
    {"model":"Bored T-Model", "licence":"XYZ-987", "type":"XL"},
    {"model":"Bored T-Model", "licence":"ABE-13", "type":"XL"}
]

#### Test 7: search with type 'X'
call: search('type', 'X')
expect: []

#### Test 8: Key not valid
call: search('x','y')
expect: to throw an exception: `'key not found'`

#### Test 9: One parameter missing  
call: search('model')
expect: to throw an exception: `'parameter missing'`

#### Test 10: Both parameters are missing
call: search()
expect: to throw an exception: `'parameter missing'`

You shoud inform the designer of the API that this should be clarified
#### Test 11: key is an empty string
call: search('', 'Nova')
expect: to throw an exception: `'parameter missing'`

#### Test 12: key is string of spaces
call: search('', 'Nova')
expect: to throw an exception: ´'key not found'`