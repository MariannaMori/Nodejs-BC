'use strict';

const Datastorage = require('./dataStorageLayer');

const db=new Datastorage();

const menuText=`
Choose:

1. Get All
2. Get One
3. Insert
4. Update
5. Remove
6. exit

Your choice (1,2,3,4,5 or 6): `;

menu();

async function menu(){
    let exited=false;

    do{
        const selectedValue=await prompt(menuText);

        switch(selectedValue){
            case '1':
                break;
                case '2':
                    break;
                    case '3':
                break;
                case '4':
                    break;
                    case '5':
                break;
                case '6': exited=true;
                    break;
                    default:
                        console.log('Only 1,2,3,4,5 or 6 are valid');
                    

        }

    }while(!exited);

}

function prompt(promptText){
    process.stdout.write(promptText);
    return new Promise(resolve=>{
        const input=process.stdin;
        input.resume();
        input.once('data', data=>{
            input.pause();
            resolve(data.toString().trim());
        });
    });
}
