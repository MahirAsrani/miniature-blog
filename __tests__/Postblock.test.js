import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import PostBlock from '../components/PostBlock';

describe('PostBlock Component', () => {
  it('renders homepage unchanged', () => {
    const date = new Date();
    const postedDate = new Date(date).toDateString();

    render(
      <PostBlock
        id="1"
        title="Title"
        slug="title"
        featureImg={null}
        content="content"
        author={{
          image: null,
          name: 'Person',
        }}
        postedDate={date}
        category="Tech"
        categorySlug="tech"
      />
    );

    expect(screen.getByTestId('title')).toHaveTextContent('Title');
    expect(screen.getByTestId('content')).toHaveTextContent('content');
    expect(screen.getByTestId('date')).toHaveTextContent(postedDate);
    expect(screen.getByTestId('author-name')).toHaveTextContent('Person');
    expect(screen.getByTestId('author-img')).toBeInTheDocument();
  });

  it('renders unchanged', () => {
    const date = new Date();

    const { container } = render(
      <PostBlock
        id="1"
        title="Title"
        slug="title"
        featureImg={null}
        content="content"
        author={{
          image: null,
          name: 'Person',
        }}
        postedDate={date}
        category="Tech"
        categorySlug="tech"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
