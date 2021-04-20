# Test cases for the constructor

## constractor API

Phones json object is passed as a parameter to the constructor. If the parameter is missing, the exception `'phone info missing'` is thrown.

Let's name the class as PhoneRegister

### test 1: Object created with json object as a parameter

```js
const register=new PhoneRegister(jsonobject);
```
test if the field to store the jsonobject has the same object as given as parameter.

```js
register.jsonData === jsonobject
```

### test 2: Missing parameter throws an exception 

```js
const register = new PhoneRegister();
```
throws an exception `'phone info missing'`
