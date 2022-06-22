import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { GET_AUTH, GET_LOGOUT } from '../utils/constants';

export const AppContext = createContext();

export function ContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

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
  }, []);

  async function signOut() {
    await axios.get(GET_LOGOUT, {
      withCredentials: true,
    });

    setUser(null);
    Router.push('/');
  }

  let state = { user, signOut, fetchUser, loading };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
