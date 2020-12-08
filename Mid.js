/**
 * Controller file of the MVC Architecture
 * @author Raunit Sethi
 */

var prompt = require('prompt-sync')();
var model = require("./Working.js");
var view = require("./Console.js");
const { recordDeleted, recordNotDeleted } = require('./Console.js');
var choice="";
model.initRecords(model.readCSV());
while(choice!='X' && choice!='x'){
    view.displayName();
    view.displayMenu();
    choice = prompt();
    switch(choice){
        case '1':
            model.initRecords(model.readCSV());
            console.log("Data has been reloaded")
            break;
        case '2':
            model.writeCSV(prompt("Please enter a name for the file: "));
            break;
        case '3':
            view.requestRecordNumber();
            var number = prompt();
            view.displayRecord(model.records[number-1]);
            break;
        case '4':
            var id = prompt("Enter ID: "),
                date = prompt("Enter Date: "),
                cases = prompt("Enter number of cases: "),
                deaths = prompt("Enter number of deaths: "),
                nameFR = prompt("Enter name in French: "),
                nameEN = prompt("Enter name in English: ");
            model.createRecord(id,date,cases,deaths,nameFR,nameEN);
            console.log();
            console.log("New Record has been Created")
            break;
        case '5':
            view.requestRecordNumber();
            var number = prompt();
            model.editRecord(number);
            break;
        case '6':
            view.requestRecordNumber();
            var number = prompt();
            if(model.deleteRecord(number)!=undefined)
                recordDeleted();
            else
                recordNotDeleted();
            break;
        case '7':
            view.displayName();
            view.displayRecords(model.records);
        case 'x':
            break;
        case '8':
            model.tester();
            break;
        default:
            console.log("Wrong input; Try again");
            break;
    }
}