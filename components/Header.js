import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { AppContext } from '../context/state';

const Header = () => {
  const { user, signOut, category } = useContext(AppContext);
  const Router = useRouter();

  return (
    <div className="container mt-3">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <img
            src="https://i.imgur.com/hSDDP67.png"
            height="50px"
            width="50px"
            alt=""
            onClick={() => Router.push('/')}
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mx-4 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a
                    className={`nav-link ${
                      Router?.pathname === '/' && 'active'
                    }`}
                  >
                    <span className="home">Home</span>
                  </a>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {category.map((c) => (
                    <li key={c._id}>
                      <Link href={`/${c.slug}`}>
                        <a className="dropdown-item">{c.title}</a>
                      </Link>
                    </li>
                  ))}{' '}
                  {/* <li>
                    <hr className="dropdown-divider" />
                  </li> */}
                </ul>
              </li>

              {user && (
                <li className="nav-item ">
                  <Link href="/dashboard">
                    <a
                      className={`nav-link ${
                        Router?.pathname === '/dashboard' && 'active'
                      }`}
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
              )}
            </ul>
            {user ? (
              <div className="btn btn-dark" onClick={signOut}>
                Sign Out
              </div>
            ) : (
              <div
                className="btn btn-dark"
                onClick={() => Router.push('/login')}
              >
                Sign In
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
