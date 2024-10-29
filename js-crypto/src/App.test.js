import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
// import Encrypte from './encrypte';

test('chiffre le message avec AES', () => {
  const note = 'Secret note';
  const { aesEncrypted } = Encrypte(note);

  expect(aesEncrypted).toBeDefined(); // Vérifie que le message chiffré est défini
  expect(aesEncrypted).not.toBe(note); // Le message chiffré ne doit pas être le même que le message d'origine
});