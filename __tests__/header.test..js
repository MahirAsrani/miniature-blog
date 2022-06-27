import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { ContextWrapper } from '../context/state';

describe('Header', () => {
  it('renders header unchanged', () => {
    const { container } = render(
      <ContextWrapper>
        <Header />
      </ContextWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
