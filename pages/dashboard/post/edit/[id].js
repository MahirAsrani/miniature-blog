/* eslint-disable @next/next/no-img-element */
import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {
  GET_CAT,
  GET_POST_BY_ID,
  POST_POST,
} from '../../../../utils/constants';
import DashSidebar from '../../../../components/DashSidebar';
import Link from 'next/link';

const EditPost = ({ post, categ }) => {
  const [title, setTitle] = useState(post?.title);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(post?.category?._id);
  const [description, setDescription] = useState(post?.description);
  const [content, setContent] = useState(post?.content);

  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;

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

    const res = await axios.post(`${POST_POST}/${post._id}`, body, {
      withCredentials: true,
    });

    if (res.data.success) {
      alert('Updated');
    }
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
                  <h3 className="m-0 mx-2 me-5">Edit Post</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-12 my-3">
                  <img
                    src={post.featureImage}
                    className="img-fluid mx-auto d-flex mb-3"
                    width={'650px'}
                    alt="feature image"
                  />

                  <form onSubmit={handlePostSubmit}>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label">Post Title </label>
                        <input
                          type="text"
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
                            aria-label="Default select example"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value={post.category._id}>
                              {post.category.title}
                            </option>
                            {categ.map((c) => {
                              if (c._id === post.category._id) return null;
                              return (
                                <option key={c._id} value={c._id}>
                                  {c.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Short Description</label>

                        <textarea
                          type="text"
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
                          className="btn btn-lg btn-dark w-100 mt-4"
                          type="submit"
                        >
                          Update Post
                        </button>
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

export default EditPost;

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${GET_POST_BY_ID}?id=${params.id}`, {
    withCredentials: true,
  });

  const resCat = await axios.get(`${GET_CAT}`);

  const post = res.data.data;
  const categ = resCat.data.data;

  // Pass data to the page via props
  return { props: { post, categ } };
}
