'use strict';

const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1
};

const MESSAGES = {
    PROGRAM_ERROR: ()=>({
        message: 'Sorry! Error in the program.',
        code: CODES.PROGRAM_ERROR,
        type:'error'

    }),
    NOT_FOUND: id => ({
        message: `No resource found with ID ${id}`,
        code: CODES.NOT_FOUND,
        type: 'error'
    })
};

module.exports = {CODES, MESSAGES};