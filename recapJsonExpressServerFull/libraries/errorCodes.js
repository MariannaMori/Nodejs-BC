'use strict';

const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    INSERT_OK:2,
    NOT_INSERTED:3,
    DELETE_OK:5,
    NOT_DELETED:6
};

const MESSAGES = {
    PROGRAM_ERROR: ()=>({
        message: 'Sorry! Error in the program.',
        code: CODES.PROGRAM_ERROR,
        type:'error'
    }),
    NOT_FOUND: (key,value) => ({
        message: `No resource found with ${key} ${value}`,
        code: CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: (key,value) => ({
        message:`Resource with ${key} ${value} was inserted`,
        code: CODES.INSERT_OK,
        type: 'info'
    }),
    NOT_INSERTED: ()=>({
        message:'Resource was not inserted',
        code:CODES.NOT_INSERTED,
        type:'error'
    }),
    DELETE_OK: (key,value)=>({
        message:`Resource with ${key} ${value} removed`,
        code:CODES.DELETE_OK,
        type:'info'
    }),
    NOT_DELETED: (key,value)=>({
        message:`No resource found with the ${key} ${value}. Nothing removed`,
        code:CODES.NOT_DELETED,
        type:'error'
    })
};

module.exports = {CODES, MESSAGES};

