import React, { useContext, Fragment, useEffect } from 'react';
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthContext from "../context/auth/AuthContext"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AuthNavbar(props) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout, role } = authContext;
  const classes = useStyles();



  const onLogout = () => {
    logout();
  }

  const adminLink = (
    <Link to="/dashboard">
      Dashboard
      </Link>
  )

  const userLink = (
    <Fragment>
      <Link to="/blogs">
        Blogs
      </Link>
      <Link to="/myblogs">
        My Blogs
      </Link>
    </Fragment>
  )

  const guestLinks = (
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        <Link to="/">
          Blog WebApp
            </Link>
      </Typography>
      <Link to="/login">
        Login
          </Link>
      <Link to="/register">
        Register
          </Link>
    </Toolbar>
  );

  const authLinks = (
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        <Link to="/">
          Blog WebApp
        </Link>

        {role === "Admin" ? adminLink : userLink}
      </Typography>
      <p className="nav-right">Welcome {user} </p>
      <a className="nav-right" onClick={onLogout}>
        Logout
          </a>
    </Toolbar>
  )



  return (
    <div className={classes.root}>
      <AppBar position="static" className="navbar">
        {isAuthenticated ? authLinks : guestLinks}
      </AppBar>
    </div>
  );
}
