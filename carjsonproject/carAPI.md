# car API

## **getWithLicence**

Function get the car with the given licence number. The licence number is unique, so there can be only one car with that licence.

Function takes the licence as a parameter.

Function returns:
-   if the car if found, the function returns that car object
-   if no car with the given licence was found, the function returns `null`

## **getWithModel**

Function get all cars with the given model.

Function takes the model as a parameter

Function returns:
-   the function returns all cars of the given model as an array of car objects
-   if no car matches the given model, an empty array is returned.
