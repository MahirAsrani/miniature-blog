import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import DashCategory from '../../pages/dashboard/category';

describe('Dashboard Category', () => {
  const category = [
    {
      title: 'Technology',
      slug: 'tech',
      _id: '001',
    },
  ];

  it('shows a List', () => {
    render(<DashCategory category={category} />);

    expect(screen.getByTestId('list_item')).toBeTruthy();
    expect(screen.getByTestId('list_title')).toHaveTextContent(
      category[0].title
    );
  });

  it('has a edit button', () => {
    render(<DashCategory category={category} />);
    expect(screen.getByTestId('list_edit_btn')).toBeTruthy();
  });

  it('has a delete button', () => {
    render(<DashCategory category={category} />);
    expect(screen.getByTestId('list_delete_btn')).toBeTruthy();
  });

  it('has a Add Category Text field', () => {
    render(<DashCategory category={category} />);
    expect(screen.getByTestId('addcategory_field')).toBeTruthy();
  });
  it('has a Add Category button', () => {
    render(<DashCategory category={category} />);
    expect(screen.getByTestId('addCatBtn')).toBeTruthy();
  });

  describe('Editing an item', () => {
    it('Click on Edit button', () => {
      render(<DashCategory category={category} />);
      fireEvent.click(screen.getByTestId('list_edit_btn'));
    });
    it('Should have textField, update, cancel', () => {
      render(<DashCategory category={category} />);
      fireEvent.click(screen.getByTestId('list_edit_btn'));

      expect(screen.getByTestId('inputform')).toBeTruthy();
      expect(screen.getByTestId('updatebtn')).toBeTruthy();
      expect(screen.getByTestId('cancelbtn')).toBeTruthy();
    });

    it('default value in textField', () => {
      render(<DashCategory category={category} />);
      fireEvent.click(screen.getByTestId('list_edit_btn'));

      expect(screen.getByTestId('inputform')).toHaveValue(category[0].title);
    });
  });
});
