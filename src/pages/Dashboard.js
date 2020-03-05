import React, { useContext, useEffect } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UserItem from '../components/admin/UserItem';
import UserContext from '../context/user/UserContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const { users } = userContext;

  useEffect(() => {
    userContext.getUsers();
    // eslint-disable-next-line
  }, []);

  if (users !== null && users.length === 0) {
    return (
      <div className="center-text">
        <Button
          className="dashboard-btn"
          type="submit"
          variant="contained"
          color="primary"
        >
          Add User
        </Button>
        <h1>No Users to show</h1>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <CssBaseline />
      <Container maxWidth="sm">
        <Button
          className="dashboard-btn"
          type="submit"
          variant="contained"
          color="primary"
        >
          Add User
        </Button>
        <List component="nav" aria-label="mailbox folders">
          {users !== null ? (
            <div>
              {users.map(user => (
                <UserItem user={user} key={user.id} />
              ))}
            </div>
          ) : (
            <div className="center-text">
              <CircularProgress />
            </div>
          )}
        </List>
      </Container>
    </div>
  );
};

export default Dashboard;
