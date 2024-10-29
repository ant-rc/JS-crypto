import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   const buttons = screen.getByRole('button', {name: /learn react/i});
//   expect(buttons).toBeInTheDocument();
// });


test('entrez message', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/entrez votre message/i); //cherche l'input
  expect(input).toBeInTheDocument(); //trouve l'input
  const message = 'message'; //declare un msg
  fireEvent.change(input, { target: { value: 'message' } }); // simule l'evenement de changement
  expect(input.value).toBe(message); //on s'attend a trouver le msg declarer
})

test('cryptage note', () => {
  render(<App />);
  const buttons = screen.getByRole('button', {name: /Crypter la note/i});
  expect(buttons).toBeInTheDocument();
})

test('affiche msg crypte', () => {
  render(<App/>);
})