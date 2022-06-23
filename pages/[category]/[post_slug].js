/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import { GET_POSTS } from '../../utils/constants';

const singlePost = ({ post }) => {
  const date = new Date(post?.createdAt).toDateString();
  if (!post) return <></>;
  return (
    <div className="container my-5">
      <div className="row">
        <img
          src={post.featureImage}
          alt="feature image"
          className="img-fluid rounded mb-5"
        />
        <div className="col-12">
          <ul className="nav align-items-center d-flex">
            <li className="nav-item">
              <div className="nav-link ps-0">
                <div className="d-flex align-items-center position-relative">
                  <div>
                    <img
                      className="avatar-img rounded-circle"
                      src="https://blogzine.webestica.com/assets/images/avatar/03.jpg"
                      width={'45px'}
                      alt="avatar"
                    />
                  </div>
                  <h5 className="ms-2 my-0">
                    <Link
                      href="#"
                      className="stretched-link text-reset btn-link"
                    >
                      <>by {post.author.name}</>
                    </Link>
                  </h5>
                </div>
              </div>
            </li>
            <li className="nav-item mx-2">
              <h5 className="m-0">{date}</h5>
            </li>
            <li className="nav-item mx-2">
              <h5 className="badge bg-warning text-dark fs-6 mt-1">
                {post.category.title}
              </h5>
            </li>
          </ul>
          <h1>{post.title}</h1>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default singlePost;

export async function getStaticPaths() {
  const res = await axios.get(GET_POSTS);
  const data = res.data.data;

  return {
    paths: data.map((post) => ({
      params: { category: post.category.slug, post_slug: post.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { post_slug } = params;

  const res = await axios.get(`${GET_POSTS}/${post_slug}`);
  const data = res.data.data;

  // Pass data to the page via props
  return { props: { post: data }, revalidate: 60 };
}
