import React from 'react';

interface Note {
  title: string;
}

function Liste({ notes, onSelectNote }: { notes: Note[]; onSelectNote: (index: number) => void }) {
  return (
    <ul>
      {notes.map((note, index) => (
        <li key={index} onClick={() => onSelectNote(index)}>
          {note.title}
        </li>
      ))}
    </ul>
  );
}

export default Liste;
