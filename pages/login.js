import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AppContext } from '../context/state';
import { POST_AUTH } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('m@test.com');
  const [pass, setPass] = useState('123');
  const Router = useRouter();

  const { fetchUser } = useContext(AppContext);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await axios.post(POST_AUTH, { email, pass });
    if (res.data.success) {
      // const token = res.data.data;
      // localStorage.setItem('authKey', token);
      await fetchUser();
      Router.push('/');
    }
  }

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-6 my-5 p-5 text-center mx-auto border">
          <h1 className="mb-5">Login Page</h1>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-dark btn-lg mt-4 w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
