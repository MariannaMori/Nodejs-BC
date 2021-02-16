'use strict';

const Database = require('./database.js');

const getAllSql='select employeeId, firstname,lastname,'+
                'department,salary from employee';

const getSql='select employeeId, firstname,lastname,department,'+
                    'salary from employee where employeeId=?';

const insertSql='insert into employee (firstname,lastname,'+
                'department,salary,employeeId) values (?,?,?,?,?)';

const updateSql='update employee set firstname=?,lastname=?,'+
                'department=?,salary=? where employeeId=?';

const removeSql='delete from employee where employeeId=?';

const parameters= employee =>[
    employee.firstname, employee.lastname, employee.department,
    +employee.salary, +employee.employeeId
];

const DEFAULT_OPTIONS ={
    host:'localhost',
    port:3306,
    user:'zeke',
    password:'secret',
    database:'employeedb'
};

module.exports= class EmployeeDb{

    constructor(options=DEFAULT_OPTIONS){
        this.db=new Database(options);
    }

    getAll() {
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.db.doQuery(getAllSql);
                if(result.resultSet) {
                    resolve(result.queryResult);
                }
                else {
                    reject('Something went wrong');
                }
            }
            catch(err) {
                reject(err);
            }
        });
    }//end of getAll

    get(employeeId) {
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.db.doQuery(getSql,[+employeeId]);
                if(result.resultSet) {
                    if(result.queryResult.length>0) {
                        resolve(result.queryResult[0]);
                    }
                    else {
                        resolve(`Employee ${employeeId} not found`);
                    }
                }
                else {
                    reject('Something went wrong');
                }
            }
            catch(err) {
                reject(err);
            }
        });
    }//end of get

    insert(employee){
        return new Promise(async (resolve,reject)=>{
            try{
                const status = 
                    await this.db.doQuery(insertSql,parameters(employee));
                if (status.queryResult.rowsChanged===1){
                    resolve('insert OK');
                }
            }
            catch(err){
                reject(err);
            }
        })

    }//end of insert

    remove(employeeId){
        return new Promise(async (resolve,reject)=>{
            try{
                const status = await this.db.doQuery(removeSql,[+employeeId]);
                if(status.queryResult.rowsChanged===1) {
                    resolve('Remove OK');
                }
                else{
                    resolve(`Employee ${employeeId} was not removed`);
                }
            }
            catch(err){
                reject(err);
            }
        });
    }//end of remove

    update(employee){
        return new Promise(async (resolve,reject)=>{
            try{
                const status = 
                    await this.db.doQuery(updateSql, parameters(employee));
                if(status.queryResult.rowsChanged===1){
                    resolve('Update OK');
                }
                else {
                    resolve('Not updated');
                }
            }
            catch(err){
                reject(err);
            }
        })

    }//end of update

} //end of class


