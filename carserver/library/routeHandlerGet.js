'use strict';

const path = require('path');
const url = require('url');

module.exports = (basedir,config) =>{
    const { read } = 
        require(path.join(  basedir, 
                            config.library.folder,
                            config.library.filehandler));
    const { 
        send, 
        sendJson, 
        sendError, 
        isIn, 
        redirectError
    } = require(path.join(  basedir, 
                            config.library.folder, 
                            config.library.requesthandler));
    
    const {getCars} = require(path.join(basedir, 
                              config.storage.folder,
                              config.storage.file))(basedir,config.storage);

    const menuPath=path.join(basedir,config.MENU);
    const errorPagePath=path.join(  basedir,
                                    config.webpages.folder,
                                    config.webpages.errorpage);

    return async (req,res) =>{
        const route = decodeURIComponent(url.parse(req.url,true).pathname);
        try{
            if(route==='/') {
                send(res, await read(menuPath));
            }
            else if(route==='/getAll') {
                sendJson(res, getCars());
            }
            else if(route==='/form') {
                //sen a form
            }
            else if (isIn(route, ...config.resourcePaths)) {
                send(res, await read(path.join(basedir,route)));
            }
            else if(route==='/error') {
                const message = url.parse(req.url,true).query.message;
                const result = await read(errorPagePath);
                result.fileData=result.fileData.replace('**MESSAGE**',message);
                send(res,result);
            }
        }
        catch(err) {
            console.log(err)
            res.end();
            //redirectError(res,'Not found');
        }
    }

}