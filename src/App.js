import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../src/assets/style.css';
import AuthNavbar from './components/AuthNavbar';
import Home from '../src/pages/Home';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import AuthState from '../src/context/auth/AuthState';
import BlogForm from '../src/components/blog/BlogForm';
import AdminRoute from './components/routing/AdminRoute';
import Dashboard from '../src/pages/Dashboard';
import UserRoute from './components/routing/UserRoute';
import BlogState from './context/blog/blogState';
import UserState from './context/user/userState';
import Main from './Main';
import MyBlogs from '../src/components/blog/MyBlogs';
import Blogs from '../src/components/blog/Blogs';

function App() {
  return (
    <AuthState>
      <BlogState>
        <UserState>
          <Main className="App">
            <Router>
              <Fragment>
                <AuthNavbar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <UserRoute exact path="/blogs" component={Blogs}></UserRoute>
                  <UserRoute
                    exact
                    path="/myBlogs"
                    component={MyBlogs}
                  ></UserRoute>
                  <UserRoute
                    exact
                    path="/addblog"
                    component={BlogForm}
                  ></UserRoute>
                  <AdminRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                  ></AdminRoute>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </Fragment>
            </Router>
          </Main>
        </UserState>
      </BlogState>
    </AuthState>
  );
}

export default App;
