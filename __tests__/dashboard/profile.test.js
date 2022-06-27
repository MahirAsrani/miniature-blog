import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import DashProfile from '../../pages/dashboard/profile';

describe('Dashboard Profile', () => {
  const profile = {
    _id: '001',
    name: 'John Doe',
    image: 'tech',
  };

  it('Should have a profile pic display', () => {
    render(<DashProfile profile={profile} />);
    expect(screen.getByTestId('profilepic')).toBeTruthy();
  });

  it('show default pic if no picture is there', () => {
    profile.image = undefined;
    render(<DashProfile profile={profile} />);
    expect(screen.getByTestId('profilepic')).toBeTruthy();
  });

  it('has a upload pic button', () => {
    render(<DashProfile profile={profile} />);
    expect(screen.getByTestId('upload')).toBeTruthy();
  });

  it('has a delete button', () => {
    render(<DashProfile profile={profile} />);
    expect(screen.getByTestId('reset')).toBeTruthy();
  });

  it('has a Name Text Field', () => {
    render(<DashProfile profile={profile} />);
    expect(screen.getByTestId('namefield')).toBeTruthy();
  });
  it('has a Submit button', () => {
    render(<DashProfile profile={profile} />);
    expect(screen.getByTestId('submitbtn')).toBeTruthy();
  });
});
