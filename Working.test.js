/**
 * Test file containing test cases which use Jest 
 * @author Raunit Sethi
 */
var { expect, test } = require('@jest/globals');
var ts= require('./Working.js');
var recToDelete;
var length;
/**
 * Test data created before running each test case
 */
beforeEach(()=> {
    ts.createRecord("1","2","3","4","5","6");
    recToDelete = ts.records[0];
    length = ts.records.length;
})

/**
 * Test case which checks the functioning of deleteRecord function 
 */
test('deleting from array',()=>{
    expect(ts.deleteRecord(1)).toBe(recToDelete);
})

/**
 * Test case which checks the functioning of createRecord function
 */
test('adding new record',()=>{
    expect(ts.createRecord("1","2","3","4","5","6")).toBe(length+1);
})