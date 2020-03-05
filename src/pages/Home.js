import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="home">
      <Typography variant="h1">Welcome to Blog Web App</Typography>
    </div>
  );
};
export default Home;
