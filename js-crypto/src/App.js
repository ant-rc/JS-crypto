import React, { useState } from 'react';
import AES from 'crypto-js/aes'; 
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

const App = () => {
    const [message, setMessage] = useState(''); // Message que l'utilisateur entre 
    const [encryptedMessage, setEncryptedMessage] = useState(''); // Stocke le message crypté et l'update si modifié
    const privateKey = 'MaCleSecret1234'; 

    const encryptMessage = () => {
        const aesEncrypted = AES.encrypt(message, privateKey).toString(); // Chiffre le message et le transforme en caractères

        const hashDigest = sha256(message).toString(); // Si le message change alors le hashage change complètement 

        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey)); // Vérifie l'authentification du message via la privateKey

        setEncryptedMessage(`AES Encrypted: ${aesEncrypted}, HMAC: ${hmacDigest}`); // Montre le message chiffré
    };

    return ( 
        <div>
            <h1>Note</h1>
            <input type="text" placeholder="Entrez votre message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={encryptMessage}>Crypter la note</button>
            {encryptedMessage && <p>{encryptedMessage}</p>} 

            <a href='liste'>Liste des notes</a>
            {/* <button>learn react</button>
            <p>learn react</p> */}
        </div>
    ); // && : Si la valeur1 est vraie alors exécuter la valeur2
}

export default App;
