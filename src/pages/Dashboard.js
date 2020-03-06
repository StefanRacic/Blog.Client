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
import AuthContext from "../context/auth/AuthContext";


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Dashboard = (props) => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const { users, getUsers, addUser } = userContext;
  const { isAuthenticated } = authContext;



  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: ""
  });

  const { email, username, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser(user);
    setUser({
      email: "",
      username: "",
      password: ""
    })
    setOpen(false);
    props.history.push("/dashboard")
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [users]);


  const openDialog = (

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add User please input Users: Email, Username, Password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            label="Email Address"
            type="email"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            label="Username"
            type="text"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            label="Password"
            type="password"
            fullWidth
            required
            autoComplete="current-password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onSubmit={onSubmit} color="primary" >
            Add User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )


  if (users !== null && users.length === 0) {
    return (
      <div className="center-text">
        <Button
          className="dashboard-btn"
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add User
        </Button>
        {openDialog}
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
          onClick={handleClickOpen}
        >
          Add User
        </Button>

        {openDialog}

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
