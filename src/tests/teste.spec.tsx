import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';

import Contact from '../components/Contact';
import theme from '../styles/theme';

const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

test('is it in the document', () => {
  const {getByText} = renderWithTheme(<Contact />)
  
  expect(getByText('Localização')).toBeInTheDocument();
})

test('has a class', () => {
  const {getByText} = renderWithTheme(<Contact />)
  
  expect(getByText('Localização')).toHaveAttribute('class', 'test');
})