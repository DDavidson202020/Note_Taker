// require all the modules and packages needed
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API Get route
app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json",  "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});
// API Post route
app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const jsonFile = JSON.parse(data)
        const newNotes = req.body;

        jsonFile.push(newNotes);
        console.log(jsonFile)
        fs.writeFile(jsonFile)
    });

    
    

    
});
// Sending the notes.html page back for the get request (HTML route)
app.get("/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "public/notes.html"));
});
// Sending the index.html back (HTML route)
app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "public/index.html"));
});
// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});