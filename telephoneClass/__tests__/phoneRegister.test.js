'use strict';

const { TestScheduler } = require('jest');
const PhoneRegister = require('../phoneRegister');
const phones = require('../phones.json');

describe('Testing constructor', ()=>{

    test('Object created with json object as a parameter',()=>{
        const phoneRegister=new PhoneRegister(phones);
        expect(phoneRegister.register).toEqual(phones);
    });

    test('Object created with empty array as a parameter', () => {
        const phoneRegister = new PhoneRegister([]);
        expect(phoneRegister.register).toEqual([]);
    });

    test('Missing parameter throws an exception', ()=>{
        expect(() => new PhoneRegister()).toThrow('phone info missing');
    });
});

describe('Test with another phone data', ()=>{
    const data=[
        {
            "firstname": "Leila",
            "lastname": "Hökki",
            "phones": [
                { "type": "home", "number": "12345678" },
                { "type": "home", "number": "87654321" }
            ]
        }
    ];

    test('Object created with json object as a parameter', () => {
        const phoneRegister = new PhoneRegister(data);
        expect(phoneRegister.register).toEqual(data);
    });
});

describe('Tests the method getTypes', ()=>{
    let phoneRegister;

    test('get the types of default json', ()=>{
        phoneRegister = new PhoneRegister(phones);
        expect(phoneRegister.getTypes()).toEqual(["home", "work","mobile"])
    });

    test('get the types of default json', () => {
        phoneRegister = new PhoneRegister(phones);
        expect(phoneRegister.getTypes().sort())
            .toEqual(["home", "work", "mobile"].sort())
    });

    test('person have no phones (no types)',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": []
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];

        phoneRegister = new PhoneRegister(testData);
        expect(phoneRegister.getTypes()).toEqual([]);
    });

    test('no persons in phoneRegister',()=>{
        phoneRegister=new PhoneRegister([]);
        expect(phoneRegister.getTypes()).toEqual([]);
    });
});

describe('Testing the method getNumbersByType', ()=>{
    let phoneRegister;

    beforeEach(()=>{
        phoneRegister=new PhoneRegister(phones);
    });

    describe('Tests that return array of numbers', ()=>{
        test('home of Leila Hökki',()=>{
            expect(phoneRegister.getNumbersByType('Leila','Hökki','home'))
                .toEqual(["12345678"]);
        });

        test('work numbers of Matt River',()=>{
            expect(phoneRegister.getNumbersByType('Matt','River','work'))
                .toEqual(["32121367", "7635462"]);
        });
    });

    describe('Tests case firstname or lastname or type not found',()=>{
        const testValues=[
            ['Leila', 'Hökki', 'x'],
            ['Leila', 'x', 'home'],
            ['x', 'Hökki', 'home'],
            ['x', 'y', 'home'],
            ['x', 'Hökki', 'y'],
            ['Leila', 'x', 'y'],
            ['x', 'y', 'z']
        ];

        test.each(testValues)('getNumbersByType("%s","%s","%s") returns []',
            (firstname,lastname,type)=>{
                expect(phoneRegister.getNumbersByType(firstname,lastname,type))
                    .toEqual([]);
            }
        );


    });
    describe('Test if missing parameter throws an exception', ()=>{
        test("getNumbersByType('Leila','Hökki')", ()=>{
            expect( ()=> phoneRegister.getNumbersByType('Leila','Hökki'))
                .toThrow('missing parameter');
        });

        test("getNumbersByType('Leila')", ()=>{
            expect( ()=>phoneRegister.getNumbersByType('Leila'))
                .toThrow('missing parameter');
        });

        test("getNumbersByType()", ()=>{
            expect(() => phoneRegister.getNumbersByType())
                .toThrow('missing parameter')
        });
    });
});

describe('Testing the method getAllNumbersByType', ()=>{
    const phoneRegister = new PhoneRegister(phones);

    test('All home numbers', ()=>{
        const expectedValue = [
            { "firstname": "Leila", "lastname": "Hökki", "number": { "type": "home", "tel": "12345678" } },
            { "firstname": "Matt", "lastname": "River", "number": { "type": "home", "tel": "56834923" } }
        ];

        expect(phoneRegister.getAllNumbersByType('home')).toEqual(expectedValue);
    });

    test('All work numbers', ()=>{
        const expectedResult = [
            { "firstname": "Leila", "lastname": "Hökki", "number": { "type": "work", "tel": "87654321" } },
            { "firstname": "Matt", "lastname": "River", "number": { "type": "work", "tel": "32121367" } },
            { "firstname": "Matt", "lastname": "River", "number": { "type": "work", "tel": "7635462" } }
        ];

        expect(phoneRegister.getAllNumbersByType('work')).toEqual(expectedResult);
    });

    test('test: given type "x" not found', ()=>{
        expect(phoneRegister.getAllNumbersByType('x')).toEqual([]);
    });

    test('missing parameter throws an exception', ()=>{
        expect(() => phoneRegister.getAllNumbersByType()).toThrow('type missing');
    });
});

describe('Testing the method getAllNumbers', ()=>{
    test('get All numbers fron the default json', ()=>{
        const phoneRegister = new PhoneRegister(phones);
        expect(phoneRegister.getAllNumbers()).toEqual(phones);
    });

    test('some phones are missing',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "work", "number": "87654321" },
                    { "type": "mobile", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];

        const expectedResult = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "work", "number": "87654321" },
                    { "type": "mobile", "number": "05040302" }
                ]
            }
        ];

        const phoneRegister=new PhoneRegister(testData);
        expect(phoneRegister.getAllNumbers()).toEqual(expectedResult);
    });

    test('all phones are missing',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": []
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];

        const phoneRegister=new PhoneRegister(testData);
        expect(phoneRegister.getAllNumbers()).toEqual([]);
    });

    test('The json data is []', ()=>{
        const phoneRegister=new PhoneRegister([]);
        expect(phoneRegister.getAllNumbers()).toEqual([]);
    });
});

describe('Testing the method getName', ()=>{
    const phoneRegister = new PhoneRegister(phones);
    
    const testValues = [
        //testvalue        expectedResult
        ["87654321", { "firstname": "Leila", "lastname": "Hökki" }],
        ["05040302", { "firstname": "Leila", "lastname": "Hökki" }],
        ["56834923", { "firstname": "Matt", "lastname": "River" }],
        ["32121367", { "firstname": "Matt", "lastname": "River" }],
        ["7635462", { "firstname": "Matt", "lastname": "River" }]
    ];

    test('get the name of number "12345678"', ()=>{
        expect(phoneRegister.getName("12345678"))
            .toEqual({ "firstname": "Leila", "lastname": "Hökki" });
    });

    test('get the name of the wrong number', ()=>{
        expect(phoneRegister.getName("0000")).toBeNull();
    });

    test('missing parameter', () => {
        expect(phoneRegister.getName()).toBeNull();
    });

    test.each(testValues)('getName("%s") returns %s',(testValue,expectedResult)=>{
        expect(phoneRegister.getName(testValue)).toEqual(expectedResult);
    });
});