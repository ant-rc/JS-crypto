import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Encrypte from './composants/encrypte';
import PageCreation from './composants/page_creation';
import Page_edit from './composants/page_edit';
import Page_liste from './composants/page_liste';

test('chiffre le message avec AES', () => {
  const note = 'Secret note';
  const { aesEncrypted } = Encrypte(note);

  expect(aesEncrypted).toBeDefined(); // Vérifie que le message chiffré est défini
  expect(aesEncrypted).not.toBe(note); // Le message chiffré ne doit pas être le même que le message d'origine
});

test('entrez message', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Content/i); // Modifie pour utiliser "Content" comme placeholder
  expect(input).toBeInTheDocument(); // Vérifie que l'input existe
  
  const message = 'message'; // Déclare un message
  fireEvent.change(input, { target: { value: message } }); // Simule l'événement de changement
  
  expect(input.value).toBe(message); // Vérifie que le message entré est bien dans l'input
});

test('cryptage note', () => {
  render(<PageCreation onAddNote={() => {}} />);
  const button = screen.getByRole('button', { name: /Create Note/i }); // Cherche le bouton de création de note
  expect(button).toBeInTheDocument(); // Vérifie que le bouton existe
});