import React, { useState } from "react";
import Encrypte from './encrypte'; // Importation du composant encrypté

interface Note {
  title: string;
  content: string;
}

function PageCreation({ onAddNote }: { onAddNote: (note: Note) => void }) { 
  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState(""); 

  const handleCreate = () => { 
      const { aesEncrypted } = Encrypte(content); //utilise seulement aesEncrypted
      onAddNote({ 
          title, 
          content: aesEncrypted, //contenu chiffré
      }); 

      setTitle(""); //reinitialise le titre et en bas le contenu
      setContent(""); 
  };

  return (
    <div>
      <h2>Create Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreate}>Create Note</button>
    </div>
  );
}

export default PageCreation;
