import React from "react"; 
import AES from 'crypto-js/aes'; 
import sha256 from 'crypto-js/sha256'; 
import hmacSHA512 from 'crypto-js/hmac-sha512'; 
import Base64 from 'crypto-js/enc-base64'; 

const Encrypte = (note: string): { aesEncrypted: string; hmacDigest: string } => {   
    const privateKey = 'MaCleSecret1234'; 

    const aesEncrypted = AES.encrypt(note, privateKey).toString(); // Chiffre le message et le transforme en caractères

    const hashDigest = sha256(note).toString(); // Hachage du message

    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey)); // HMAC

    return { aesEncrypted, hmacDigest }; // Retourne les résultats
};

export default Encrypte;
