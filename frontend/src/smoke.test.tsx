import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('muestra el título del kiosco', () => {
    render(<App />);
    expect(screen.getByText(/Kiosco El Rápido/i)).toBeInTheDocument();
  });
});
