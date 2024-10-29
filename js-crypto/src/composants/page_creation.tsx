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
    // const encryptedContent = Encrypte(content);

    // `encryptedContent` pour faire l'appelle au composant encrypte 
    onAddNote({
      title,
      content /* Encryptage du contenu avec encryptedContent */,
    });

    setTitle("");
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
