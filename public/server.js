const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db.json'));
});


app.post("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "/db.json"), function(err, res) {
      if (err) {
          console.log(err);
      }
      const notes = JSON.parse(res);
      const noteRequest = req.body;
      const newNoteId = notes.length + 1;
      const newNote = {
          id: newNoteId,
          title: noteRequest.title,
          text: noteRequest.text
          
      };
      notes.push(newNote);
      res.json(newNote);
      console.log(newNote);
      fs.writeFile(path.join(__dirname, "/db.json"), JSON.stringify(notes, null, 2), function(err) {
          if (err) throw err;
      });
  });
});



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  