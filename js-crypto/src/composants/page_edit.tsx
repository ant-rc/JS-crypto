import React, { useState } from 'react';
// import Password from './Password'; // importation du composant password

interface Note {
  title: string;
  content: string;
}

function Modifier({ note, onSave }: { note: Note; onSave: (updatedContent: string) => void }) {
  const [content, setContent] = useState(note.content);
  
  // const [isPasswordVerified, setPasswordVerified] = useState(false); appelle de la const booléenne

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div>
      <h2>Modify Note</h2>
      
      {/* On vérifie le mot de passe */}
      {/* 
      {!isPasswordVerified ? (
        <Password onVerify={() => setPasswordVerified(true)} />
      ) : ( 
      */}
      
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
      
      {/* ajout de la confirmation du mot de passe */}
      {/* )} */}
    </div>
  );
}

export default Modifier;
