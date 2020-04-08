// require all the modules and packages needed
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
var PORT = process.env.PORT || 8080;
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API Get route
app.get("/api/notes", (req, res) => {
    // Read the json file
    fs.readFile("db/db.json",  "utf8", (err, data) => {
        // Throw an error if there is any error
        if (err) throw err;
        // Response the data back 
        res.json(JSON.parse(data))
    });
});
// API Post route
app.post("/api/notes", (req, res) => {
    // Read the json file
    fs.readFile("db/db.json", "utf8", (err, data) => {
        // Throw an error if there is any error
        if (err) throw err;
        // Create a variable that stores the data after 
        let jsonFile = JSON.parse(data)
        const newNotes = req.body;
        req.body.id = jsonFile.length + 1;
        jsonFile.push(newNotes);
        console.log(jsonFile);

        jsonFile = JSON.stringify(jsonFile);
        fs.writeFile("db/db.json",jsonFile, "utf8", (err) => {
            if(err) throw err;
           
        })
        return res.json(data);
    });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err,data) => {
        if (err) throw err;
        let jsonFile = JSON.parse(data);
        
        jsonFile = jsonFile.filter(deleteNote => parseInt(req.params.id) !== deleteNote.id)
            
        
        jsonFile = JSON.stringify(jsonFile);
        fs.writeFile("db/db.json", jsonFile, "utf8", (err) => {
                if (err) throw err;
                
        

        })
        
        res.json(data);
    })
})

    
    


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