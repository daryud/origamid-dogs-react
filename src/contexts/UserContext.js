import { getSuggestedQuery } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TOKEN_POST,
  TOKEN_VALIDATE_POST,
  USER_GET,
} from '../helpers/api-fetch';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const userLogout = React.useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.sessionStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: usuário e/ou senha inválidos`);
      const { token } = await response.json();

      window.sessionStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        data,
        userLogout,
        error,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
