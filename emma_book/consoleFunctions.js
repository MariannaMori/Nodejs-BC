'use strict';

function printResource(book) {
    let message = `${book.bookID}: ${book.name}, Author ${book.author}, type: ${book.type} publishing year: ${book.year}`;
    
    console.log(message);
   }

async function readData(){
    // same names here as are the fields
    const flowerId = await prompt('Input bookId: ');
    const name = await prompt('Input name: ');
    const site = await prompt('Input author: ');
    const unitPrice = await prompt('Input type: ');
    const stock = await prompt('Input year: ');
    
    return {
    bookId, 
    name, 
    author, 
    type, 
    year
    }
   }
    
   function prompt(promptText) {
       process.stdout.write(promptText);
       return new Promise(resolve => {
           ....
       })
   }
   module.exports = {printResource, readData}