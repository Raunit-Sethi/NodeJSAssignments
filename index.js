const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || "8080";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => {
    console.log("Listening to requests on http://localhost:${port}");
});
app.use(express.static(path.join(__dirname, "public")));

const model = require("./Working.js");
model.initRecords(model.readCSV());
app.get("/", (req, res) => {
    res.render("index", {
        title: "Programming Language Research Project",
        model,
        count: 1
    });
});
app.get("/reload", (req, res) => {
    model.initRecords(model.readCSV());
    res.redirect('/');
});
app.get("/create", (req, res) => {
    res.render("form", {
        formType: "/createN",
        model,
        ex: "Example: ",
        cf: "Create New Record",
        record: ""
    });
});
app.post("/createN", (req, res) => {
    model.createRecord(req.body.id,req.body.date,req.body.cases,req.body.deaths,req.body.fr,req.body.en);
    res.redirect('/');
});
var counter;
app.post("/edit", (req,res) => {
    counter = req.body.counter;
    res.render("form",{
        formType: "/editRecord",
        model,
        counter,
        record: model.records[counter-2],
        ex: "Example: ",
        cf: "Edit Record"
    });
});
app.post("/editRecord", (req,res) => {
    model.expressEdit(counter,req.body.id,req.body.date,req.body.cases,req.body.deaths,req.body.fr,req.body.en);
    res.redirect('/');
});
app.post("/delete", (req,res) =>{
    counter = req.body.counter;
    model.deleteRecord(counter-1);
    res.redirect('/');
});