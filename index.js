const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || "8080";

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");

app.get("/", (req,res) => {
    res.render("index", {title: "Programming Language Research Project"});
});

app.listen(port, () => {
    console.log("Listening to requests on http://localhost:${port}");
});

app.use(express.static(path.join(__dirname,"public")));