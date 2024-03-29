'use strict';

const path = require('path');

function createDataStorage(baseDir, config) {
    const libPath = path.join(baseDir, config.storageLibraries.folder);
    const {CODES, MESSAGES} = require(path.join(libPath, config.storageLibraries.errorCodes));
    const {initLayerFunctions} = require(path.join(libPath, config.storageLibraries.layerFunctions));
    const {getAllFromStorage, getFromStorage} = initLayerFunctions(baseDir, config.storage);

    class Datastorage {
        //getter
        getCODES() {
            return CODES;
        }
        //methods
        getAll() {
            return getAllFromStorage();
        }

        get(id) {
            return new Promise(async (resolve, reject)=>{
                if(!id) {
                    reject(MESSAGES.NOT_FOUND('<empty Id>'));
                }
                else{
                    const result = await getFromStorage('bookID', id);
                    if(result) {
                        resolve(result);
                    }
                    else {
                        reject(MESSAGES.NOT_FOUND(id));
                    }
                }
            });
        }
    }; //end of class

    return new Datastorage()
}

module.exports = {createDataStorage};