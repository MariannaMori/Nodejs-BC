# Database API

This database class is a general purpose class for creating and usin mariadb/mysql databases. It depends on mariadb library.
This layer is used between database engine and our application.

## **constructor**

The constructor is given all necessary information needed to open database connection as on json object.

For example:

```json
{
    "host":"localhost",
    "port":3306,
    "user":"zeke",
    "password":"secret",
    "database":"employeedb"
}
```

## **doQuery(sql,parameters,connection)**

This methdod queries the database engine. 
Parameters:
-   sql
    -   sql-statement string
-   parameters
    -   parameters for sql statement as an array
-   connection
    -   optional, used in transactions

### method usage
#### select

```js
const result = await db.doQuery('select * from employee');
```
Query criterion is employeeId=1

```js
const result = 
    await db.doQuery('select * from employee where employeeId=?',[1]);
```

The ? is a placeholder for an employeeId. So the sql that is send to database engine will be
```sql
    select * from employee where employeeId=1;
```

Return value is an object with two fields:
```json
{
    "queryResult":[
        {
            "employeeId":1,
            "firstname":"Matt",
            "lastname":"River",
            "department":"ict",
            "salary":3000
        }
    ],
    "resultSet":true
}
```

#### insert, delete or update
returns status object

```json
{
    "queryResult":{"rowsChanged":1, "insertId":0, "status":0},
    "resultSet:false
}
```

