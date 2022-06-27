import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { GET_AUTH, GET_CAT, GET_LOGOUT } from '../utils/constants';

export const AppContext = createContext();

export function ContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const Router = useRouter();

  async function fetchCategory() {
    try {
      const res = await axios.get(GET_CAT);
      res.data.success && setCategory(res.data.data);
    } catch (error) {
      setCategory([]);
    }
  }
  async function fetchUser() {
    try {
      const res = await axios.get(GET_AUTH, {
        withCredentials: true,
      });
      res.data.success && setUser(res.data.data);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  async function signOut() {
    await axios.get(GET_LOGOUT, {
      withCredentials: true,
    });

    setUser(null);
    Router.push('/');
  }

  let state = { user, signOut, fetchUser, loading, category };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
