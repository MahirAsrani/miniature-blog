import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import DashPosts from '../../pages/dashboard/post/index';

describe('Dashboard Posts Management', () => {
  const posts = [
    {
      _id: '001',
      title: 'My Post',
      category: { title: 'Technology', slug: 'tech' },
      featureImage: undefined,
      createdAt: Date.now(),
    },
  ];

  it('Should have a add new Post button', () => {
    render(<DashPosts posts={posts} />);
    expect(screen.getByTestId('addnew')).toBeTruthy();
  });

  it('show default post pic if no picture is there', () => {
    render(<DashPosts posts={posts} />);
    expect(getComputedStyle(screen.getByTestId('image')).backgroundImage).toBe(
      'url(/uploads/No_Image.png)'
    );
  });

  it('Should have a Title', () => {
    render(<DashPosts posts={posts} />);
    expect(screen.getByTestId('maintitle')).toHaveTextContent(posts[0].title);
  });

  it('Should have a category', () => {
    render(<DashPosts posts={posts} />);
    expect(screen.getByTestId('titleCategory')).toHaveTextContent(
      posts[0].category.title
    );
  });

  it('Should have a Edit Post', () => {
    render(<DashPosts posts={posts} />);
    expect(screen.getByTestId('editlink')).toBeTruthy();
  });

  it('Should have a date', () => {
    render(<DashPosts posts={posts} />);
    expect(screen.getByTestId('date')).toBeTruthy();
  });
});
