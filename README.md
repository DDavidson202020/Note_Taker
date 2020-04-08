# Note_Taker
## Description
An application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file. The app has the frontend and backend files, it's deployed on Heroku.
#### There are 2 HTML routes:
* GET /notes - Return the notes.html file.
* GET * - Return the index.html file
The application have a db.json file on the backend that will be used to store and retrieve notes using the fs module.
#### There are 3 api routes:
* GET /api/notes - Read the db.json file and return all saved notes as JSON.
* POST /api/notes - Receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
* DELETE /api/notes/:id - Receive a query parameter containing the id of a note to delete. Each note has a unique id when it's saved. In order to delete a note, we'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
