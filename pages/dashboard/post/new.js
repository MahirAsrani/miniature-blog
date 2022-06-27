import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/state';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { GET_CAT, POST_POST } from '../../../utils/constants';
import DashSidebar from '../../../components/DashSidebar';
import Link from 'next/link';

const Addnew = ({ categ }) => {
  const { user, loading } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(categ[0]._id);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const [alertMsg, setAlertMsg] = useState({});

  // const ReactQuill =
  //   typeof window === 'object' ? require('react-quill') : () => false;

  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  async function handlePostSubmit(e) {
    e.preventDefault();

    const body = new FormData();
    body.append('image', image);
    body.append('title', title);
    body.append('category', category);
    body.append('content', content);
    body.append('description', description);

    const { data } = await axios.post(POST_POST, body, {
      withCredentials: true,
    });

    const { success, message } = data;

    if (success) {
      setTitle('');
      setImage('');
      setDescription('');
      setContent('');
      setAlertMsg({ type: 'alert-primary', message: message });
    }

    !success && setAlertMsg({ type: 'alert-danger', message: message });
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <DashSidebar />
          <div className="col-lg-9">
            <div className="shadow p-3 my-3 bg-white rounded p-3">
              <div className="row">
                <div className="col-12 d-flex align-items-center">
                  <Link href={'/dashboard/post'}>
                    <div className="btn">
                      <i className="ri-arrow-left-line ri-2x"></i>
                    </div>
                  </Link>
                  <h3 className="m-0 mx-2 me-5">Add New Post</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-12 my-3">
                  <form onSubmit={handlePostSubmit}>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label">Post Title </label>
                        <input
                          type="text"
                          data-testid="title"
                          className="form-control"
                          placeholder="Enter post title"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Select Feature Image
                          </label>

                          <input
                            className="form-control"
                            data-testid="image"
                            type="file"
                            id="formFile"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select
                            className="form-select"
                            data-testid="drop"
                            aria-label="Default select example"
                            onChange={(e) => setCategory(e.target.value)}
                            defaultValue={categ[0]._id}
                          >
                            {categ.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Short Description</label>

                        <textarea
                          type="text"
                          data-testid="desc"
                          className="form-control"
                          placeholder="Enter short title"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          required
                          maxLength={200}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') e.preventDefault();
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Blog Content</label>

                        <ReactQuill
                          modules={modules}
                          formats={formats}
                          theme="snow"
                          onChange={setContent}
                          value={content}
                        />
                        <button
                          data-testid="submitbtn"
                          className="btn btn-lg btn-dark w-100 mt-4"
                          type="submit"
                        >
                          Publish
                        </button>

                        {alertMsg.message && (
                          <div
                            className={`alert ${alertMsg.type} mt-4`}
                            role="alert"
                          >
                            {alertMsg.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addnew;

export async function getServerSideProps({ params }) {
  const resCat = await axios.get(`${GET_CAT}`);

  const categ = resCat.data.data;

  // Pass data to the page via props
  return { props: { categ } };
}
