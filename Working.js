/**
 * Model file of the MVC Architecture
 * @author Raunit Sethi
 */

/** 
 * @type {object}
 * @description container for the loaded File System module 
*/
var fs = require("fs");

/** 
 * @type {String[]}
 * @description array containing rows of the dataset as String with no "\n" escape sequences 
 */
var records = []

/** Data object used to store different column values of each row 
 * @author Raunit Sethi
*/
class Record {
    /**
     * Create a Record and assign values of different columns of the dataset
     * @param {string} line 
     */
    constructor(line){
        var sepa = line.split(",");
        this.id = sepa[0];
        this.date = sepa[1];
        this.cases = sepa[2];
        this.deaths = sepa[3];
        this.nameFR = sepa[4];
        this.nameEN = sepa[5];
    }
    /**
     * Put the different column values together as a single String
     * @returns {string} Row of the dataset for output
     */
    toString(){
        return "".concat(this.id , "," , this.date , "," ,this.cases , "," , this.deaths + "," , this.nameFR, "," ,this.nameEN);
    }
}

/**
 * Function to initialize the records array using the data read in from the CSV
 * @param {string[]} data 
 */
function initRecords(data){
    records.splice(0,records.length);
    for(var i = 0; i<= 100; i++){
        if(i != 0)
            records[i-1] = new Record(data[i]);
    }
}

/**
 * Function to read from a CSV file and return it in a string array
 * @returns {string[]} data
 */
function readCSV(){
    var data;
    try{
        data = fs.readFileSync('./InternationalCovid19Cases.csv').toString().split("\n");
        return data;
    }
    catch (err){
        if(err.code === "ENOENT"){
            console.log('Dataset file not found');
            process.exit();
        }
        throw err;
    }
}

/**
 * Function to use FileIO and create a new CSV file using an array
 * @param {string} name 
 */
function writeCSV(name){
    var comma="";
    for(var i=0; i< records.length;i++){
        comma+=records[i].toString();
    }
    fs.writeFileSync('./Customs/'+name+'.csv', comma);
}

/**
 * Function to create a new Record object and add it to the records array
 * @param {string} id 
 * @param {string} date 
 * @param {string} cases 
 * @param {string} deaths 
 * @param {string} nameFR 
 * @param {string} nameEN 
 */
function createRecord(id,date,cases,deaths,nameFR,nameEN){
    var record = new Record(""+id+","+date+","+cases+","+deaths+","+nameFR+","+nameEN);
    return records.push(record);
}

/**
 * Function to edit a specific record in the records array
 * @param {Number} number 
 */
function editRecord(number){
    var prompt = require('prompt-sync')();
    if(prompt("Change ID?(Y or N) ").toLowerCase()=='y')
        records[number-1].id = prompt("Enter new ID: ");
    if(prompt("Change Date?(Y or N) ").toLowerCase()=='y')
        records[number-1].date = prompt("Enter new Date: ");
    if(prompt("Change Number of Cases?(Y or N) ").toLowerCase()=='y')
        records[number-1].cases = prompt("Enter new number of Cases: ");
    if(prompt("Change Number of deaths?(Y or N) ").toLowerCase()=='y')
        records[number-1].deaths = prompt("Enter new number of Deaths: ");
    if(prompt("Change name in French?(Y or N) ").toLowerCase()=='y')
        records[number-1].nameFR = prompt("Enter new name in French: ");
    if(prompt("Change name in English?(Y or N) ").toLowerCase()=='y')
        records[number-1].nameEN = prompt("Enter new name in English: ");
    console.log("Record Updation Process Complete.");
    console.log();
}

/**
 * Function to delete a record from the records array
 * @param {Number} number 
 * @returns {String} Deleted Record's toString
 */
function deleteRecord(number){
    try{
        var record = records.splice(number-1,1);
        console.log("Record Deletion Complete.");
        console.log();
        return record[0].toString();
    }
    catch(err){
        if(err) throw err;
    }
}

function expressEdit(row,id,date,cases,deaths,fr,en){
    records[row-2].id = id;
    records[row-2].date = date;
    records[row-2].cases = cases;
    records[row-2].deaths = deaths;
    records[row-2].nameFR = fr;
    records[row-2].nameEN = en;
}

function initAllRecords(data){
    records.splice(0,records.length);
    for(var i = 0; i< data.length; i++){
        if(i != 0)
            records[i-1] = new Record(data[i]);
    }
}

/**
 * Export module to export functiosns
 */
module.exports = {
    initRecords, 
    initAllRecords,
    readCSV, 
    writeCSV, 
    createRecord, 
    editRecord,
    deleteRecord,
    expressEdit,
    records
};