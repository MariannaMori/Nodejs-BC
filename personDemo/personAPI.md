# Person API

## persons.json
```json
[
    {"firstname":"Matt", "lastname":"River", "Age":30},
    {"firstname":"Jesse", "lastname":"River", "Age":10},
    {"firstname":"Mary", "lastname":"Smith", "Age":50}
]
```

## Datalayer for persons

## function **search**

Function returns person objects in an array. Search criterion is passed to the function as parameters. If parameters are missing, all persons will be returned.

- search() returns all person objects in an array
- search(key, value) returns all matching persons as an array

If no person is found, an empty array is returned.

# Usage

## search all persons
http://localhost:3000/persons

## search by firstname
http://localhost:3000/persons/firstname?value=Matt

## search by lastname
http://localhost:3000/persons/lastname?value=River

## search by age
http://localhost:3000/persons/age?value=30

Server sends a web page to the browser. Use table element to show the data