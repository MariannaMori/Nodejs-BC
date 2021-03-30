# subtract API

## **subtract(a,b)**

Returns the difference a - b of two numbers. The number are passed to the function as parameters

*parameters*: a and b are numbers
*returns*: difference of a-b as a number

-   if parameter is missing, throws an exception: `'parameter missing'`
-   if parameters are not numbers, throws an exception ``'only numbers allowed'`

## Test cases for subtract

### 1. test if function subtract defined

### 2. subtract

#### 2.1 Integers
[1, 1, 0],
[2, 3, -1],
[-2, -4, 2],
[-2, 4, -6],
[2, -4, 6],
[0, 0, 0],
[0, 3, -3],
[3, 0, 3],
[0, -3, 3],
[-3, 0, -3]


#### 2.2 Floats
[10, 11.5, -1.5],
[11.5, 10, 1.5],
[-2.3, 3, -5.3],
[-3, -2.5, -0.5],
[2.5, 2.5, 0],
[-2.5, -2.5, 0],
[0, 10.5, -10.5],
[10.5, 0, 10.5],
[0.0, 0.0, 0.0]



### 3. Missing parameter
-   subtract() throws an exception `'parameter missing'`
-   subtract(1) throws an exception `'parameter missing'`
-   subtract('x') throws an exception `'parameter missing'`
-   subtract('') throws an exception `'parameter missing'`

### 4. Parameters are not numbers
-   subtract('x',2) throws an exception `'only numbers allowed'`
-   subtract(1,'x') throws an exception `'only numbers allowed'`
-   subtract('a','b') throws an exception `'only numbers allowed'`
-   subtract(' ',' ') throws an exception `'only numbers allowed'`
-   subtract(null,1) throws an exception `'parameter missing'`
-   subtract(undefined, 1) throws an exception `'parameter missing'`