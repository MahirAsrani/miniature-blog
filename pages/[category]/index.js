import axios from 'axios';
import PostBlock from '../../components/PostBlock';
import { GET_POST_BY_CATEGORY } from '../../utils/constants';

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
              categorySlug={p.category.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${GET_POST_BY_CATEGORY}/${params.category}`);
  const data = res.data.data;

  return { props: { posts: data } };
}

export default Index;
