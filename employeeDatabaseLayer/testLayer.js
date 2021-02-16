'use strict';

const DataLayer = require('./datastorageLayer');

const db=new DataLayer();

//db.getAll().then(console.log).catch(console.log);

(async ()=>{
    try{
        for(let emp of await db.getAll()){
            console.log(emp);
        }

        console.log('###### get(1) #######');
        let emp = await db.get(1);
        console.log(emp)
        console.log('###### get(12) #######');
        emp = await db.get(12);
        console.log(emp)
        console.log('###### insert ####');
        let employee={
            employeeId:123,
            firstname:'Vera',
            lastname:'River',
            department:'ict',
            salary:5000
        };

        console.log(await db.insert(employee));
        console.log(await db.get(123));
        employee = {
            employeeId: 123,
            firstname: 'Verax',
            lastname: 'Riverx',
            department: 'ictx',
            salary: 9000
        };
        console.log(await db.update(employee));
        console.log(await db.get(123));

       
        console.log(await db.remove(13));
        console.log(await db.remove(123));
        console.log(await db.remove(14));
        
    }
    catch(err){
        console.log(err);
    }


})();