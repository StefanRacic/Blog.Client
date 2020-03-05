import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import BlogItem from './BlogItem';
import AuthContext from '../../context/auth/AuthContext';
import BlogContext from '../../context/blog/BlogContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import MyBlogItem from './MyBlogItem';

const MyBlogs = () => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { loadUser } = authContext;
  const { loadMyBlogs, myBlogs } = blogContext;

  useEffect(() => {
    loadMyBlogs();
    // eslint-disable-next-line
  }, []);

  if (myBlogs !== null && myBlogs.length === 0) {
    return (
      <div className="center-text">
        <Link to="/addblog">
          <Button variant="contained" color="primary">
            Add Blog
          </Button>
        </Link>
        <h1>No Blogs to show</h1>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="myblogs-btn">
        <Link to="/addblog">
          <Button variant="contained" color="primary">
            Add Blog
          </Button>
        </Link>
      </div>
      <div className="myblogs">
        {myBlogs !== null ? (
          <>
            {myBlogs.map(blog => (
              <MyBlogItem blog={blog} key={blog.id} />
            ))}
          </>
        ) : (
          <div className="center-text">
            <CircularProgress />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MyBlogs;
