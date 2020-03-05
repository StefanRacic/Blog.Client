import React, { useContext, useEffect } from 'react';
import AuthContext from '../src/context/auth/AuthContext';
const Main = props => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  return <div>{props.children}</div>;
};

export default Main;
