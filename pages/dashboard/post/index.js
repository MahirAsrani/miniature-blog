import axios from 'axios';
import Link from 'next/link';
import DashSidebar from '../../../components/DashSidebar';
import { GET_MY_POSTS } from '../../../utils/constants';

const index = ({ posts }) => {
  return (
    <div className="container">
      <div className="row mt-4">
        <DashSidebar />
        <div className="col-lg-9">
          <div className="shadow p-3 my-3 bg-white rounded p-3">
            <div className="row">
              <div className="col-12 d-flex align-items-center">
                <h3 className="m-0 mx-2 me-5">My Posts</h3>
                <Link href={'/dashboard/post/new'}>
                  <div className="btn btn-primary" data-testid="addnew">
                    Add New
                  </div>
                </Link>
              </div>
            </div>
            <div className="row mt-3">
              {posts.map((p) => (
                <div className="col-md-4 my-2" key={p._id} data-testid="post">
                  <div className="post-card card mb-3">
                    <div
                      data-testid="image"
                      className="card-img-top"
                      style={{
                        backgroundImage: `url(${
                          p.featureImage || '/uploads/No_Image.png'
                        })`,
                      }}
                    ></div>
                    <div className="card-body">
                      <span
                        className="badge bg-warning text-dark mb-3"
                        data-testid="titleCategory"
                      >
                        {p.category.title}
                      </span>

                      <h5 className="card-title" data-testid="maintitle">
                        {p.title}
                      </h5>

                      <Link href={`/dashboard/post/edit/${p._id}`}>
                        <a data-testid="editlink">Edit Post</a>
                      </Link>

                      <p className="card-text">
                        <small className="text-muted" data-testid="date">
                          {new Date(p.createdAt).toDateString()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps({ req }) {
  const res = await axios.get(GET_MY_POSTS, {
    headers: {
      Cookie: req.headers.cookie,
    },
    withCredentials: true,
  });
  const data = res.data.data;

  // Pass data to the page via props
  return { props: { posts: data } };
}
