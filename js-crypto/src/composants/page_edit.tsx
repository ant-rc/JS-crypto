import React, { useState } from 'react';
// import Password from './Password'; // importation du composant password

interface Note {
  title: string;
  content: string;
}

function Modifier({ note, onSave, onDelete }: { note: Note; onSave: (updatedContent: string) => void; onDelete: () => void }) {
  const [content, setContent] = useState(note.content);
  const [isPasswordVerified, setPasswordVerified] = useState(false); //verifie si le mdp est valide
  const [password, setPassword] = useState(''); // stocke le mdp saisi

  //fonction vérification du mdp
  const handlePasswordVerify = () => {
    // Remplace 'motdepasse' par le mot de passe correct
    if (password === 'motdepasse') {
      setPasswordVerified(true); //valide si le mdp est correct
    } else {
      alert('Mot de passe incorrect'); //si le mdp est incorrect
    }
  }

  const handleSave = () => {
    onSave(content);
  };

  const handleDelete = () => {
    if (window.confirm("Suppression définitive de cette note ?")) {
      onDelete();
    }
  };

  return (
    <div>
      <h2>Modifier la Note</h2>
    
      {!isPasswordVerified ? (
        <div>
          <label htmlFor="password">Entrez le mot de passe : </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handlePasswordVerify}>Vérifier le mot de passe</button>
        </div>
      ) : (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // Met à jour le contenu de la note
          />
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
}

export default Modifier;