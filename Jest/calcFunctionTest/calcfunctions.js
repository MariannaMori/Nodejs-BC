'use strict';

const onlySpaces=/^[ ]*$/g;

exports.sum = (a,b)=>{
    if(a==undefined || b==undefined){
        throw new Error('parameter missing');
    }

    if(onlySpaces.test(a) || onlySpaces.test(b)) {
        throw new Error('only numbers allowed');
    }
    
    if(Number.isNaN(Number(a)) || Number.isNaN(Number(b))){
        throw new Error('only numbers allowed');
    }

    return a+b; 
}
    