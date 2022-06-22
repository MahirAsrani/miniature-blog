import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import style from '../styles/DashSidebar.module.css';

const DashSidebar = () => {
  const router = useRouter();
  return (
    <div className="col-lg-3">
      <Link href={'/dashboard/category'}>
        <div className="col-lg-12">
          <div
            className={`${style.navSide} ${
              router.pathname.includes('category') && style.navSideActive
            } shadow p-3 my-3 bg-white rounded`}
          >
            <div className="row">
              <div className="col-2 m-auto text-center">
                <i className="ri-list-settings-line ri-2x m-auto"></i>
              </div>
              <div className="col-10">
                <h4 className="m-0">Category</h4>
                <p className="m-0">Add / manage new category</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link href={'/dashboard/post'}>
        <div className="col-lg-12">
          <div
            className={`${style.navSide} ${
              router.pathname.includes('post') && style.navSideActive
            } shadow p-3 my-3 bg-white rounded`}
          >
            <div className="row">
              <div className="col-2 m-auto text-center">
                <i className="ri-file-line ri-2x m-auto"></i>
              </div>
              <div className="col-10">
                <h4 className="m-0">Posts</h4>
                <p className="m-0">manage or add new posts</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link href={'/dashboard/profile'}>
        <div className="col-lg-12">
          <div
            className={`${style.navSide} ${
              router.pathname.includes('profile') && style.navSideActive
            } shadow p-3 my-3 bg-white rounded`}
          >
            <div className="row">
              <div className="col-2 m-auto text-center">
                <i className="ri-admin-line ri-2x m-auto"></i>
              </div>
              <div className="col-10">
                <h4 className="m-0">Profile</h4>
                <p className="m-0">Edit your profile</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashSidebar;
