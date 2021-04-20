/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import App from './App';

test('Loading circle on app start', () => {
    render(<App />);
    const linkElement = screen.getByTestId('loading_circle');
    expect(linkElement).toBeInTheDocument();
});
