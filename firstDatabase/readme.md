# Databases

1.  create project folder
2.  open that folder
3.  create package.json

```shell
npm init -y
```
4.  install dependencies

```shell
npm install mariadb
```
5. create database create statements

6. run the create statements

```shell
mysql -u root -p <"path-to-the-create-statement-file"
```


## database "backup" as create statements
```shell
mysqldump -u root --databases employeedb >empdb.sql
```
## restoring from backup
```shell
mysql -u root -p <"path-to-the-file\emp.sql"
```