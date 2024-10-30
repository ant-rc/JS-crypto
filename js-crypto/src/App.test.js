import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Encrypte from './composants/encrypte';
import PageCreation from './composants/page_creation';
import Page_edit from './composants/page_edit';
import Page_liste from './composants/page_liste';


test('chiffre le message avec AES', () => {
  const note = 'Secret note';
  const { aesEncrypted } = Encrypte(note);

  expect(aesEncrypted).toBeDefined(); 
  expect(aesEncrypted).not.toBe(note); 
});


test('entrez message', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Content/i); 
  expect(input).toBeInTheDocument(); 
  
  const message = 'message'; 
  fireEvent.change(input, { target: { value: message } }); 
  
  expect(input.value).toBe(message); 
});


test('cryptage note', () => {
  render(<PageCreation onAddNote={() => {}} />);
  const button = screen.getByRole('button', { name: /Create Note/i }); 
  expect(button).toBeInTheDocument(); 
});


test('ajoute note cryptee à la liste', () => {
  const { container } = render(<App />);
  
  const titleInput = screen.getByPlaceholderText(/Title/i);
  const contentInput = screen.getByPlaceholderText(/Content/i);
  const createButton = screen.getByRole('button', { name: /Create Note/i });

  //simule ajout de note
  fireEvent.change(titleInput, { target: { value: 'Titre de Test' } });
  fireEvent.change(contentInput, { target: { value: 'Contenu de Test' } });
  fireEvent.click(createButton);

  //verif que la note soit dans la liste
  expect(screen.getByText(/Titre de Test/i)).toBeInTheDocument();
});


test('affiche btn modif quand la note est sélectionnée', async () => {
  render(<App />);

  //ajout note
  const titleInput = screen.getByPlaceholderText(/Title/i);
  const contentInput = screen.getByPlaceholderText(/Content/i);
  const createButton = screen.getByRole('button', { name: /Create Note/i });

  fireEvent.change(titleInput, { target: { value: 'Title Test' } });
  fireEvent.change(contentInput, { target: { value: 'Content Test' } });
  fireEvent.click(createButton);

  //slectionner note
  const noteItem = screen.getByText(/Title Test/i);
  fireEvent.click(noteItem);

  //mdp + verification
  const passwordInput = screen.getByLabelText(/Entrez le mot de passe/i);
  const verifyButton = screen.getByRole('button', { name: /Vérifier le mot de passe/i });

  fireEvent.change(passwordInput, { target: { value: 'motdepasse' } });
  fireEvent.click(verifyButton);

  //verif btn sauvegarde après verif du mdp
  const modifyButton = await screen.findByRole('button', { name: /Sauvegarder/i });
  expect(modifyButton).toBeInTheDocument();
});


test('modifie le contenu de la note', () => {
  render(<App />);

  //cree une note
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Title Test' } });
  fireEvent.change(screen.getByPlaceholderText(/Content/i), { target: { value: 'Content Test' } });
  fireEvent.click(screen.getByRole('button', { name: /Create Note/i }));

  //selectionne et la modifie
  fireEvent.click(screen.getByText(/Title Test/i));
  fireEvent.change(screen.getByLabelText(/Entrez le mot de passe/i), { target: { value: 'motdepasse' } });
  fireEvent.click(screen.getByRole('button', { name: /Vérifier le mot de passe/i }));
  fireEvent.change(screen.getByPlaceholderText(/Content/i), { target: { value: 'Nv Contenu Test' } });
  fireEvent.click(screen.getByRole('button', { name: /Sauvegarder/i }));

  //verifie le nv contenu
  expect(screen.getByText(/Nv Contenu Test/i)).toBeInTheDocument();
});


test("sauvegarder la note", () => {
  const note = { title: "Note Test", content: "Contenu initial" };
  let savedContent = ""; //var pour stocker le contenu sauvegarde

  //savedContent : var pour stocker le contenu apres sauvegarde / handleSave : met a jour `savedContent` pour tester la sauvegarde
  const handleSave = (updatedContent) => {
    savedContent = updatedContent;
  };

  render(<Page_edit note={note} onSave={handleSave} onDelete={() => {}} />);

  //verif mdp correct
  fireEvent.change(screen.getByLabelText(/Entrez le mot de passe/i), { target: { value: 'motdepasse' } });
  fireEvent.click(screen.getByRole('button', { name: /Vérifier le mot de passe/i }));

  //modif de la note
  fireEvent.change(screen.getByRole('textbox'), { target: { value: "Contenu modifié" } });
  
  //clic sut btn sauvegarde
  fireEvent.click(screen.getByRole('button', { name: /Sauvegarder/i }));

  //verifi que le contenu modifie est a jour
  expect(savedContent).toBe("Contenu modifié");
});


test('supprimer note', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Title Test' } });
  fireEvent.change(screen.getByPlaceholderText(/Content/i), { target: { value: 'Content Test' } });
  fireEvent.click(screen.getByRole('button', { name: /Create Note/i }));

  fireEvent.click(screen.getByText(/Title Test/i));

  //confirmer mdp 
  fireEvent.change(screen.getByLabelText(/Entrez le mot de passe/i), { target: { value: 'motdepasse' } });
  fireEvent.click(screen.getByRole('button', { name: /Vérifier le mot de passe/i }));
  
  //confirme la suppression
  window.confirm = jest.fn(() => true); // Simule la confirmation de la suppression
  fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));

  //verif que la note ne soit plus affichee
  expect(screen.queryByText(/Title Test/i)).not.toBeInTheDocument();
});


test("mdp incorrect", () => {
  const note = { title: "Test Note", content: "Contenu de la note" };

  render(<Page_edit note={note} onSave={() => {}} onDelete={() => {}} />);

  //mdp saisi incorrect
  fireEvent.change(screen.getByLabelText(/Entrez le mot de passe/i), { target: { value: 'mauvaismotdepasse' } });
  fireEvent.click(screen.getByRole('button', { name: /Vérifier le mot de passe/i }));

  //si le mdp est incorrect alors ces 2 btn ne s'affichent pas
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Sauvegarder/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Supprimer/i })).not.toBeInTheDocument();
});


test("mdp correct", () => {
  const note = { title: "Test Note", content: "Contenu de la note" };

  render(<Page_edit note={note} onSave={() => {}} onDelete={() => {}} />);

  //mdp entree correct
  fireEvent.change(screen.getByLabelText(/Entrez le mot de passe/i), { target: { value: 'motdepasse' } });
  fireEvent.click(screen.getByRole('button', { name: /Vérifier le mot de passe/i }));

  //si mdp correct alors afficher btns
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sauvegarder/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Supprimer/i })).toBeInTheDocument();
});


test("afficher liste", () => {
  const notes = [{ title: "Note 1" }, { title: "Note 2" }];

  render(<Page_liste notes={notes} onSelectNote={() => {}} />); 

  expect(screen.getByText("Note 1")).toBeInTheDocument();
  expect(screen.getByText("Note 2")).toBeInTheDocument();
});