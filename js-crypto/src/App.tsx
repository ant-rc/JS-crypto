import React, { useState } from 'react';
import PageCreation from './composants/page_creation';
import Liste from './composants/page_liste';
import Modifier from './composants/page_edit';


interface Note {
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const saveNote = (updatedContent: string) => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex].content = updatedContent;
      setNotes(updatedNotes);
      setSelectedNoteIndex(null);
    }
  };

  const deleteNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = notes.filter((_, index) => index !== selectedNoteIndex);
      setNotes(updatedNotes);
      setSelectedNoteIndex(null);
    }
  };

  return (
    <div>
      <PageCreation onAddNote={addNote} />
      <Liste notes={notes} onSelectNote={setSelectedNoteIndex} />
      {selectedNoteIndex !== null && (
        <Modifier note={notes[selectedNoteIndex]} onSave={saveNote} onDelete={deleteNote}/>
      )}
    </div>
  );
}

export default App;
