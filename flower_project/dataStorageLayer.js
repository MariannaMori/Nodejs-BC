'use strict';

const Database = require('./database');

const options = require('./databaseOptions.json');

const sql=require('./sqlStatements.json');

const {toArray} = require('./parameters');

const getAllSql = sql.getAll.join(' ');
const getSql = sql.get.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');


class Datastorage{
    constructor(){
        this.db=new Database(options);
    }

    getAll() {
        return new Promise(async (resolve, reject)=>{
            try{
                const result=await this.db.doQuery(getAllSql);
                resolve(result.queryResult);
            }
            catch(err) {
                reject(err);
            }
        });
    }
} //class ends here

