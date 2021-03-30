'use strict';

const functions = require('../calcfunctions');

describe('Test if functions are defined', ()=>{
    test('function sum is defined', ()=>{
        expect(functions.sum).toBeDefined();
    });
});

describe('Test sum with integers', ()=>{
    const testValues =[
        [1, 1, 2],
        [2, 3, 5],
        [-2, -4, -6],
        [-2, 4, 2],
        [2, -4, -2],
        [0, 0, 0],
        [0, 3, 3],
        [3, 0, 3],
        [0, -3, -3],
        [-3, 0, -3]
    ];

    test.each(testValues)('sum(%s, %s) = %s', (a,b,expected)=>{
        expect(functions.sum(a,b)).toBe(expected);
    });

});

describe('Test sum with floating point', ()=>{
    const testValues=[
        [10, 11.5, 21.5],
        [2.5, 3, 5.5],
        [-2.5, 3, 0.5],
        [3, -2.5, 0.5],
        [-3, -2.5, -5.5],
        [2.5, -2.5, 0],
        [2.4, -2.5, -0.1]
    ];

    test.each(testValues)('sum(%s, %s) = %s', (a,b,expected)=>{
        expect(functions.sum(a,b)).toBeCloseTo(expected);
    });
});

describe('Test the missing parameters', ()=>{
    const testValues= [
        [null, 'parameter missing'],
        [1, 'parameter missing'],
        ['x', 'parameter missing'],
        ['', 'parameter missing']
    ];

    test.each(testValues)('sum(%s) throws an exception %s',
        (value,expected)=>{
            expect(()=>functions.sum(value)).toThrow(expected);
    });
});

describe('Test parameters are not numbers', ()=>{
    const testValues= [
        ['x', 2, 'only numbers allowed'],
        [1, 'x', 'only numbers allowed'],
        ['a', 'b', 'only numbers allowed'],
        [' ', ' ','only numbers allowed'],
        [null, 1, 'parameter missing'],
        [undefined, 1, 'parameter missing']
    ];

    test.each(testValues)('sum(%s,%s) throws an exception %s',
        (a,b,expected)=>{
            expect(()=>functions.sum(a,b)).toThrow(expected);
        });
});

describe('Test substract with integers',()=>{
    const testValues=[
[1, 1, 0],
[2, 3, -1],
[-2, -4, 2],
[-2, 4, -6],
[2, -4, 6],
[0, 0, 0],
[0, 3, -3],
[3, 0, 3],
[0, -3, 3],
[-3, 0, -3]

    ];
    test.each(testValues)('subtract(%s , %s) = %s', (a,b,expected)=>{
        expect(functions.butract(a,b)).toBe(expected);
    });
});

describe('Test subtract with floats', ()=>{
    const testValues=[
[10, 11.5, -1.5],
[11.5, 10, 1.5],
[-2.3, 3, -5.3],
[-3, -2.5, -0.5],
[2.5, 2.5, 0],
[-2.5, -2.5, 0],
[0, 10.5, -10.5],
[10.5, 0, 10.5],
[0.0, 0.0, 0.0]
    ];
    test.each(testValues)('subtract(%s, %s)= %s', (a,b, expected)=>{
        expect(functions.subtract(a,b)).toBeCloseTo(expected);
    });

});

describe('Test the missing parameters', ()=>{
    const testValues= [
        [null, 'parameter missing'],
        [1, 'parameter missing'],
        ['x', 'parameter missing'],
        ['', 'parameter missing']
    ];
    test.each(testValues)('subtract(%s) throws an exception %s',
    (testvalue,expected)=>{
        expect(()=>functions.subtract(testvalue)).toThrow(expected);
    });

});

describe('Test parameters are not numbers', ()=>{
    const testValues = [
        ['x', 2, 'only numbers allowed'],
        [1, 'x', 'only numbers allowed'],
        ['a', 'b', 'only numbers allowed'],
        [' ', ' ','only numbers allowed'],
        [null, 1, 'parameter missing'],
        [undefined, 1, 'parameter missing']
    ];
    test.each(testValues)('subtract(%s, %s) throws an exception %s',
    (a,b,expected)=>{
        expect(()=>functions.subtract(a,b)).toThrow(expected);
    });

});