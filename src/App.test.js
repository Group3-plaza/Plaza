/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Router from './Router';

test('Loading circle on app start', () => {
    render(<Router />);
    const linkElement = screen.getByTestId('loading_circle');
    expect(linkElement).toBeInTheDocument();
});
