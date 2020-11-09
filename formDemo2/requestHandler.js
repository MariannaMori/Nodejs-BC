'use strict';
const qs = require('querystring');
//something to do with formdemo task
const getUrlEncodedPostData = request => Promise((resolve, reject)=>{
    if(request.headers['content-type'] != 'application/x-www-form-urlencoded') {
        reject('Wrong Content-type');
    }
    else{
        const databuffer=[];
        request.on('data', messageFragment=>databuffer.push(messageFragment));
        request.on('end', ()=>resolve(qs.parse(Buffer.concat(databuffer).toString())));
        request.on('error', ()=>reject('Error during the data transfer'));
    }
});

module.exports={getUrlEncodedPostData}