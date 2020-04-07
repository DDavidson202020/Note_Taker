// require all the modules and packages needed
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// Sending the notes.html page back for the get request (HTML route)
app.get("/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "public/notes.html"));
});
// Sending the index.html back (HTML route)
app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "public/index.html"));
});
// API Get route
app.get("/api/notes", (req, res) => {
    let jsonFile = fs.readFile("db/db.json",  "utf8", () => {
        if (err) throw err;
    });
    return res.json(jsonFile);
});
// API Post route
app.post("/api/notes", (req, res) => {
    let jsonFile = fs.readFile("db/db.json", "utf8", () => {
        if (err) throw err;
    });
    console.log(jsonFile);
    const newNotes = req.body;
    jsonFile.push(newNotes);

    
});
// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});