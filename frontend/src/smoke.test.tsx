import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('muestra el título del kiosko en la ruta /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Kiosko El Rápido/i)).toBeInTheDocument();
  });

  it('muestra la página 404 en una ruta inexistente', () => {
    render(
      <MemoryRouter initialEntries={['/no-existe']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Página no encontrada/i)).toBeInTheDocument();
  });
});
