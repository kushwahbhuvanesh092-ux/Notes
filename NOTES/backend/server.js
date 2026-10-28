const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let notes = [];

// Home Route
app.get("/", (req, res) => {
  res.send("MicroNotes Backend is Running");
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add a new note
app.post("/notes", (req, res) => {
  const note = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  notes.push(note);
  res.status(201).json(note);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter(note => note.id !== id);

  res.json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});