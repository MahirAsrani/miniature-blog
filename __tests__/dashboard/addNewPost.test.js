import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextWrapper } from '../../context/state';
import AddNew from '../../pages/dashboard/post/new';

describe('Dashboard Add New Post', () => {
  const categ = [
    {
      _id: '001',
      name: 'Tech',
      slug: 'tech',
    },
    {
      _id: '002',
      name: 'Food',
      slug: 'food',
    },
  ];

  it('Should have Title field', () => {
    render(
      <ContextWrapper>
        <AddNew categ={categ} />
      </ContextWrapper>
    );
    expect(screen.getByTestId('title')).toBeTruthy();
  });

  it('Should have FeatureImage field', () => {
    render(
      <ContextWrapper>
        <AddNew categ={categ} />
      </ContextWrapper>
    );
    expect(screen.getByTestId('image')).toBeTruthy();
  });

  it('Should have Category dropdown', () => {
    render(
      <ContextWrapper>
        <AddNew categ={categ} />
      </ContextWrapper>
    );

    expect(screen.getByTestId('drop')).toBeTruthy();
  });

  it('Should have Description field', () => {
    render(
      <ContextWrapper>
        <AddNew categ={categ} />
      </ContextWrapper>
    );

    expect(screen.getByTestId('desc')).toBeTruthy();
  });

  it('Should have WYSIWYG Editor', () => {
    render(
      <ContextWrapper>
        <AddNew categ={categ} />
      </ContextWrapper>
    );
  });

  it('has a Post Submit button', () => {
    render(
      <ContextWrapper>
        <AddNew categ={categ} />
      </ContextWrapper>
    );

    expect(screen.getByTestId('submitbtn')).toBeTruthy();
  });
});
