import { useEffect, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  // Fetch all notes from backend
  async function getNotes() {
    const response = await fetch(`${API_URL}/notes`);
    const data = await response.json();
    setNotes(data);
  }

  // Load notes when page opens
  useEffect(() => {
    getNotes();
  }, []);

  // Add Note
  async function addNote() {
    if (title === "" || content === "") return;

    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle("");
    setContent("");

    getNotes();
  }

  // Delete Note
  async function deleteNote(id) {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });

    getNotes();
  }

  return (
    <div className="container">
      <h1>📝 MicroNotes</h1>

      <input
        type="text"
        placeholder="Enter Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button onClick={addNote}>Add Note</button>

      <div className="notes">
        {notes.length === 0 ? (
          <p>No Notes Available</p>
        ) : (
          notes.map((note) => (
            <div className="card" key={note.id}>
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <button onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;