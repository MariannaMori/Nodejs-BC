'use strict';

const path = require('path');
const fs=require('fs').promises;

const storageConfig = require('./storageConfig.json');

const storageFile = path.join(__dirname, storageConfig.storageFile);

function createDataStorage(){
    const {CODES,MESSAGES}=require(path.join(__dirname,storageConfig.errorCodes));

    

    async function readStorage(){
        try{
            const data = await fs.readFile(storageFile,'utf8');
            return JSON.parse(data);
        }
        catch(err) {
            return [];
        }
    }
    async function writeStorage(data){
        try{
            await fs.writeFile(storageFile, JSON.stringify(data, null,4),{encoding:'utf8', flag:'w'});
            return MESSAGES.WRITE_OK();

        }
        catch(err) {
            return MESSAGES.WRITE_ERROR(err.message);
        }
    }
//Getting data from file
    async function getFromStorage(id) {
        return (await readStorage()).find(cat =>cat.catId==id) || null;
    }
//adding data
    async function addToStorage(newCat){
        const storage = await readStorage();
        if(storage.find(cat=>cat.catId == newCat.catId)) {
            return false;
        }
        else {
            storage.push({
                catId: +newCat.catId,
                name: newCat.name,
                length: newCat.length,
                breed: newCat.breed,
                yearOfBirth: +newCat.yearOfBirth
            });
            await writeStorage(storage);
            return true;
            //with checks
            //version 1:
            // return (await writeStorage(storage)).code===CODES.WRITE_OK; 
            //version 2:
            // const writeResult=await writeStorage(storage);
            // if(writeResult.code === CODES.WRITE_OK){
            //     return true
            // }
            // else {
            //     return false;
            // }
        }
    } //end of addStorage

    async function removeFromStorage(id){
        let storage = await readStorage();
        const i = storage.findIndex(cat=>cat.catId==id);
        if(i<0) return false;
        storage.splice(i,1);
        await writeStorage(storage);
        return true;
    }

    async function updateStorage(cat){
        let storage = await readStorage();
        const oldCat = 
            storage.find(oldCat => oldCat.catId == cat.catId);
        if(oldCat) {
            Object.assign(oldCat, {
                catId: +newCat.catId,
                name: newCat.name,
                length: newCat.length,
                breed: newCat.breed,
                yearOfBirth: +newCat.yearOfBirth 
            });
            await writeStorage(storage);
            return true;
        }
        else {
            return false;
        }
    }

    

    class Datastorage{
        get CODES() {
            return CODES;
        }

        getAll() {
            return readStorage();
        }
//get cat by id (number)

        get(id){
            return new Promise(async (resolve,reject) =>{
                if(!id) {
                    reject(MESSAGES.NOT_FOUND('<empty id>'));
                }
                else {
                    const result = await getFromStorage(id);
                    if(result) {
                        resolve(result);
                    }
                    else{
                        reject(MESSAGES.NOT_FOUND(id));
                    }
                }
            });
        }
        insert(cat){
            return new Promise(async (resolve,reject)=>{
                if(!(cat && cat.catId &&
                     cat.name && cat.breed)){
                         reject(MESSAGES.NOT_INSERTED());
                }
                else{
                    if( await addToStorage(cat)) {
                        resolve(MESSAGES.INSERT_OK(cat.catId));
                    }
                    else {
                        reject(MESSAGES.ALREADY_IN_USE(cat.catId));
                    }
                }
            });
        }

        remove(catId){
            return new Promise(async (resolve, reject)=>{
                if(!catId) {
                    reject(MESSAGES.NOT_FOUND('<empty>'));
                }
                else {
                    if(await removeFromStorage(catId)) {
                        resolve(MESSAGES.REMOVE_OK(catId));
                    }
                    else {
                        reject(MESSAGES.NOT_REMOVED());
                    }
                }
            });
        }

        update(cat) {
            return new Promise( async (resolve, reject)=>{
                if(!(cat && cat.catId &&
                     cat.name && cat.breed)){
                         reject(MESSAGES.NOT_UPDATED());
                }
                else {
                    if(await updateStorage(cat)){
                        resolve(MESSAGES.UPDATE_OK(cat.catId));
                    }
                    else {
                        reject(MESSAGES.NOT_UPDATED());
                    }
                }
            });
        }

    } 

    return new Datastorage();

} 

module.exports = {
    createDataStorage
}