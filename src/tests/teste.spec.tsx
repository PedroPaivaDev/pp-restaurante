import { ThemeProvider } from 'styled-components';
import { render, RenderResult, screen } from '@testing-library/react';

import Contact from '../components/Contact';
import theme from '../styles/theme';

function renderWithTheme(children: React.ReactNode): RenderResult {
  return render(
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

describe('marmita button', () => {
  it('should be in the document', () => {
    renderWithTheme(<Contact />);
    const btnMarmita = screen.getByText('Pedir Marmita');
    expect(btnMarmita).toBeInTheDocument();
  })
});