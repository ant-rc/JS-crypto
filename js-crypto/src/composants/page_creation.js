import React, { useState } from "react";
import "./index.css";

/**
 * @typedef {Object} Note
 * @property {string} title
 * @property {string} content
 */

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function createNote() {
    if (!title || !content) return;

    const note = { title, content };
    setNotes((prevNotes) => [...prevNotes, note]);

    setTitle("");
    setContent("");
  }

  function startEditing(index) {
    setEditingIndex(index);
    setTitle(notes[index].title);
    setContent(notes[index].content);
  }

  function saveNote() {
    if (editingIndex === null) return;

    const updatedNotes = [...notes];
    updatedNotes[editingIndex] = { title, content };
    setNotes(updatedNotes);

    setEditingIndex(null);
    setTitle("");
    setContent("");
  }

  return (
    <div>
      <h1>My Notes</h1>
      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {editingIndex === null ? (
        <button onClick={createNote}>Add Note</button>
      ) : (
        <button onClick={saveNote}>Save Note</button>
      )}

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => startEditing(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteApp;
