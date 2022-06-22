import axios from 'axios';
import { useContext, useState } from 'react';
import PostBlock from '../components/PostBlock';
import { AppContext } from '../context/state';
import { GET_POSTS } from '../utils/constants';

const Index = ({ posts }) => {
  return (
    <div className="container py-5">
      <div className="row">
        {posts.map((p) => {
          return (
            <PostBlock
              key={p._id}
              id={p._id}
              title={p.title}
              featureImg={p.featureImage}
              content={p.description}
              author={p.author.name}
              postedDate={p.createdAt}
              category={p.category.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(GET_POSTS);
  const data = res.data.data;

  // Pass data to the page via props
  return { props: { posts: data } };
}

export default Index;
