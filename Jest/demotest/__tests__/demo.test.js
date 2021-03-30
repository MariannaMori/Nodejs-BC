'use strict';


//this demo shows the order in which tests are run. 
//Tests actually tests nothing
//but only prints about to the console what is run 

beforeAll(()=>{
    console.log('beforeAll','init before all tests'.toUpperCase());
});

afterAll(()=>{
    console.log('afterAll', 'cleaning after all tests'.toUpperCase());
});

test('This is not in test suite', ()=>{
    console.log('Test','just some test');
});

// test.only('Only this test is executed', () => {
//     console.log('Only', 'just some test');
// });

it('This in another test. Not in suite', ()=>{
    console.log('it','just another test');
});

describe('This is a test suite 1', ()=>{
    beforeEach(()=>{
        console.log('beforeEach','init test in suite 1 before every test');
    });

    afterEach(()=>{
        console.log('after each','cleaning after every test in suite 1');
    });

    test('run test A of the first suite', ()=>{
        console.log('testA');
    });

    test('run test B of the first suite', ()=>{
        console.log('test B');
    });

    test('run test C of the first suite', ()=>{
        console.log('test C');
    });
});

describe('This is suite 2', ()=>{
    beforeAll(()=>{
        console.log('beforeAll2', 'init before all in suite 2');
    });

    afterAll(()=>{
        console.log('afterAll2','cleaning after in suite2');
    });

    describe('this is first subsuite of suite 2', ()=>{
        test('test D of the first subsuite of suite 2',()=>{
            console.log('test D');
        });

        test('Test E of the first subsuite of suite 2', ()=>{
            console.log('test E');
        });
    });

    describe('This is the second subsuite of suite 2', ()=>{
        beforeEach(()=>{
            console.log('beforeEach 2.2','init test in subsuite 2 of suite 2');
        });

        test('Test F of the second subsuite of suite 2', ()=>{
            console.log('Test F');
        });

        test('test G of the secons subsuite of suite 2',()=>{
            console.log('Test G');
        });
    });
});

describe('This tests for an exception', ()=>{
    function testFunction() {
        throw new Error('This is an exception');
    }

    test('tests if function throws an exception', ()=>{
        expect(() => testFunction()).toThrow('This is an exception');
    });

});

describe('Testing asynchronous functions', ()=>{
    test('Test promise resolve', ()=>{
        return expect(Promise.resolve('resolved')).resolves.toBe('resolved');
    });
    test('Test promise reject', ()=>{
        return expect(Promise.reject('rejected')).rejects.toBe('rejected');
    });
});

describe('Test with an array of test values', ()=>{
    const testValues= [
        //inputA,  inputB, expectedValue
        ['first','second','firstsecond'], //one testcase
        ['je','st','jest'], //another testcase
        [1,2,3]
    ];

    const concat = (partA,partB) =>partA+partB;

    test.each(testValues)('%s and %s = %s', (inputA,inputB,expectedValue)=>{
        expect(concat(inputA,inputB)).toBe(expectedValue);
    });
});

describe('Test individually', ()=>{
    const concat = (partA, partB) => partA + partB;

    test('first and second = firstsecond', ()=>{
        expect(concat('first','second')).toBe('firstsecond');
    });

    test('je and st = jest', ()=>{
        expect(concat('je','st')).toBe('jest');
    });

    test('1 and 2 = 3',()=>{
        expect(concat(1,2)).toBe(3);
    });
});
