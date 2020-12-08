/**
 * View file of the MVC Architecture
 * @author Raunit Sethi
 */

/**
 * Function to display the manu of options for the 
 * user on the command terminal
 */
function displayMenu(){
    console.log();
    console.log('What would you like to do?');
    console.log('1.Reload data from dataset');
    console.log('2.Save the data to a new file');
    console.log('3.Display specific record(s) from the data');
    console.log('4.Create a new record');
    console.log('5.Edit a record');
    console.log('6.Delete a record');
    console.log('7.Display the data structure')
    console.log('Enter \'X\' to exit');
    console.log();
}

/**
 * Function to display the name of the author on the command terminal
 */
function displayName(){
    console.log();
    console.log("Program Created by Raunit Sethi\n")
    console.log();
}

/**
 * Function to display a set of records on the command terminal
 * @param {*[]} records 
 */
function displayRecords(records){
    for( var i = 0; i< records.length; i++)
        console.log((i+1)+". "+records[i].toString());
}

/**
 * Function to display a single record on the command terminal
 * @param {*} record 
 */
function displayRecord(record){
    console.log(record.toString());
}

/**
 * Function to display a request to enter record number on the command terminal
 */
function requestRecordNumber(){
    console.log('Enter record number');
}

function recordDeleted(){
    console.log("Record Deletion Complete.");
    console.log();
}

function recordNotDeleted(){
    console.log("Record Deletion Failed.");
    console.log();
}
/**
 * Export module to export functions
 */
module.exports = {
    displayMenu, 
    displayName, 
    displayRecords,
    displayRecord,
    requestRecordNumber,
    recordDeleted,
    recordNotDeleted
};